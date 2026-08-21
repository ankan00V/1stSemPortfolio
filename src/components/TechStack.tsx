import * as THREE from "three";
import { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Html, useTexture } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import "./styles/TechStack.css";

// Module-level constants to avoid per-frame allocations
const ZERO_VEC = new THREE.Vector3(0, 0, 0);
const CAMERA_TARGET = new THREE.Vector3(0, 0, 20);

const techStack = [
  { name: "Python", logo: "/images/tech/python.svg" },
  { name: "C++", logo: "/images/tech/cplusplus.svg" },
  { name: "MySQL", logo: "/images/tech/mysql.svg" },
  { name: "FastAPI", logo: "/images/tech/fastapi.svg" },
  { name: "Django", logo: "/images/tech/django.svg" },
  { name: "PostgreSQL", logo: "/images/tech/postgresql.svg" },
  { name: "MongoDB", logo: "/images/tech/mongodb.svg" },
  { name: "Redis", logo: "/images/tech/redis.svg" },
  { name: "Docker", logo: "/images/tech/docker.svg" },
  { name: "Kubernetes", logo: "/images/tech/kubernetes.svg" },
  { name: "Scikit-learn", logo: "/images/tech/scikitlearn.svg" },
  { name: "TensorFlow", logo: "/images/tech/tensorflow.svg" },
  { name: "PyTorch", logo: "/images/tech/pytorch.svg" },
  { name: "Hugging Face", logo: "/images/tech/huggingface.svg" },
  { name: "Power BI", logo: "/images/tech/powerbi.svg" },
  { name: "Tableau", logo: "/images/tech/tableau.svg" },
  { name: "Git", logo: "/images/tech/git.svg" },
  { name: "React", logo: "/images/tech/react.svg" },
  { name: "Next.js", logo: "/images/tech/nextjs.svg" },
  { name: "Node.js", logo: "/images/tech/nodejs.svg" },
  { name: "TypeScript", logo: "/images/tech/typescript.svg" },
  { name: "JavaScript", logo: "/images/tech/javascript.svg" },
];

techStack.forEach((tech) => {
  useTexture.preload(tech.logo);
});

const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);
const sphereScales = [0.7, 1, 0.8, 1, 1];

/* Grid layout: 5-6-6-5 for landscape, 3-4-4-4-4-3 for portrait */
function calculateGridPositions(aspect: number): THREE.Vector3[] {
  const positions: THREE.Vector3[] = [];
  const isPortrait = aspect < 1;
  const rows = isPortrait ? [3, 4, 4, 4, 4, 3] : [5, 6, 6, 5];
  const hSpacing = isPortrait ? 1.6 : 2.0;
  const vSpacing = isPortrait ? 1.8 : 2.2;

  const totalRows = rows.length;
  const totalHeight = (totalRows - 1) * vSpacing;
  const startY = totalHeight / 2;

  for (let row = 0; row < totalRows; row++) {
    const cols = rows[row];
    const totalWidth = (cols - 1) * hSpacing;
    const startX = -totalWidth / 2;
    const y = startY - row * vSpacing;

    for (let col = 0; col < cols; col++) {
      positions.push(new THREE.Vector3(startX + col * hSpacing, y, 0));
    }
  }
  return positions;
}

/* Fibonacci sphere layout for Globe mode */
function calculateGlobePositions(count: number, radius: number): THREE.Vector3[] {
  const positions: THREE.Vector3[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
    const radiusAtY = Math.sqrt(1 - y * y); // radius at y

    const theta = phi * i; // golden angle increment

    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;

    positions.push(new THREE.Vector3(x * radius, y * radius, z * radius));
  }
  return positions;
}

type GlobeSphereProps = {
  scale: number;
  material: THREE.Material;
  expanded: boolean;
  showLabels: boolean;
  gridPosition: THREE.Vector3;
  globePosition: THREE.Vector3;
  name: string;
};

function GlobeSphereGeo({
  scale,
  material,
  expanded,
  showLabels,
  gridPosition,
  globePosition,
  name,
}: GlobeSphereProps) {
  const meshRef = useRef<THREE.Group>(null);
  // Reusable temp objects — allocated once, reused every frame
  const dummyRef = useRef(new THREE.Object3D());
  const eulerRef = useRef(new THREE.Euler());
  const tempVecRef = useRef(new THREE.Vector3());
  
  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    // Cap delta for smooth lerping
    const safeDelta = Math.min(0.05, delta);
    const lerpSpeed = 5;
    const t = 1 - Math.exp(-lerpSpeed * safeDelta);

    // Calculate billboard rotation towards camera (reuse dummy)
    const dummy = dummyRef.current;
    meshRef.current.getWorldPosition(dummy.position);
    dummy.lookAt(state.camera.position);

    if (expanded) {
      // Lerp to grid position
      meshRef.current.position.lerp(gridPosition, t);
      
      meshRef.current.quaternion.slerp(dummy.quaternion, t);
      
      // Lerp scale to uniform grid size
      const currentScale = meshRef.current.scale.x;
      meshRef.current.scale.setScalar(THREE.MathUtils.lerp(currentScale, 0.65, t));
    } else {
      // Rotate the individual position to mimic the globe spinning (reuse euler + vec)
      const time = state.clock.elapsedTime;
      const euler = eulerRef.current;
      euler.set(time * 0.1, time * 0.2, 0, 'XYZ');
      const currentGlobePos = tempVecRef.current.copy(globePosition).applyEuler(euler);

      // Lerp to spinning globe position
      meshRef.current.position.lerp(currentGlobePos, t);
      
      // Billboard to face camera perfectly
      meshRef.current.quaternion.slerp(dummy.quaternion, t);
      
      // Lerp scale back to original size
      const currentScale = meshRef.current.scale.x;
      meshRef.current.scale.setScalar(THREE.MathUtils.lerp(currentScale, scale, t));
    }
  });

  // Initial setup
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.position.copy(globePosition);
      
      const dummy = dummyRef.current;
      dummy.position.copy(globePosition);
      dummy.lookAt(CAMERA_TARGET);
      meshRef.current.quaternion.copy(dummy.quaternion);
      
      meshRef.current.scale.setScalar(scale);
    }
  }, [scale, globePosition]);

  return (
    <group ref={meshRef}>
      <mesh
        castShadow
        receiveShadow
        geometry={sphereGeometry}
        material={material}
      />
      {showLabels && (
        <Html position={[0, -1.2, 0]} center className="skill-label-anchor">
          <span className="skill-label">{name}</span>
        </Html>
      )}
    </group>
  );
}

function Scene({
  expanded,
  showLabels,
}: {
  expanded: boolean;
  showLabels: boolean;
}) {
  const { size } = useThree();

  // Memoize strictly on width to prevent mobile address bar hiding (height change) from shifting the grid
  const gridPositions = useMemo(() => {
    const aspect = size.width / size.height;
    return calculateGridPositions(aspect);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size.width]);

  // Static globe positions (radius shrinks on mobile to fit screen)
  const globePositions = useMemo(() => {
    const isPortrait = size.width / size.height < 1;
    const radius = isPortrait ? 2.8 : 4.5;
    return calculateGlobePositions(techStack.length, radius);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size.width]);

  // Load all logo textures via suspense
  const logoTextures = useTexture(techStack.map(t => t.logo));

  const materials = useMemo(() => {
    return logoTextures.map((logoTex) => {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 512;
      const context = canvas.getContext("2d");
      
      if (context) {
        context.fillStyle = "#f8f8f8";
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        const logoSize = 200;
        const x = (canvas.width / 4) - (logoSize / 2);
        const y = (canvas.height - logoSize) / 2;
        context.drawImage(logoTex.image, x, y, logoSize, logoSize);
      }
      
      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 8;
      
      return new THREE.MeshPhysicalMaterial({
        map: texture,
        emissive: "#ffffff",
        emissiveMap: texture,
        emissiveIntensity: 0.3,
        metalness: 0.5,
        roughness: 1,
        clearcoat: 0.1,
      });
    });
  }, [logoTextures]);

  // Globe rotation and parallax
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const safeDelta = Math.min(0.05, delta);

    if (expanded) {
      // Lerp group rotation back to 0 so the grid faces the camera perfectly
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0, safeDelta * 5);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, 0, safeDelta * 5);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, 0, safeDelta * 5);
    }

    // Always keep the globe perfectly centered (reuse module-level constant)
    groupRef.current.position.lerp(ZERO_VEC, safeDelta * 5);
  });

  return (
    <>
      <ambientLight intensity={1} />
      <spotLight
        position={[0, 0, 25]}
        penumbra={1}
        angle={0.2}
        color="white"
        castShadow
        shadow-mapSize={[512, 512]}
      />
      <directionalLight position={[0, 5, -4]} intensity={2} />
      
      <group ref={groupRef}>
        {techStack.map((tech, i) => (
          <GlobeSphereGeo
            key={i}
            scale={sphereScales[i % sphereScales.length]}
            material={materials[i % materials.length]}
            expanded={expanded}
            showLabels={showLabels}
            gridPosition={gridPositions[i]}
            globePosition={globePositions[i]}
            name={tech.name}
          />
        ))}
      </group>

      <Environment
        files="/models/char_enviorment.hdr"
        environmentIntensity={0.5}
        environmentRotation={[0, 4, 2]}
      />
      <EffectComposer enableNormalPass={false}>
        <N8AO color="#0f002c" aoRadius={2} intensity={1.15} />
      </EffectComposer>
    </>
  );
}

const TechStack = () => {
  const [expanded, setExpanded] = useState(false);
  const [showLabels, setShowLabels] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (expanded) {
      const timer = setTimeout(() => setShowLabels(true), 500);
      return () => clearTimeout(timer);
    } else {
      setShowLabels(false);
    }
  }, [expanded]);

  // Pause the entire 3D render loop when off-screen
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "200px" } // start rendering slightly before visible
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`techstack${expanded ? " techstack-expanded" : ""}`}
      onClick={() => setExpanded((prev) => !prev)}
    >
      <h2> My Techstack</h2>
      <p className={`techstack-hint${expanded ? " hint-hidden" : ""}`}>
        Click to explore
      </p>

      <Canvas
        shadows
        gl={{ alpha: true, stencil: false, depth: true, antialias: true }}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
        onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
        className="tech-canvas"
        frameloop={isVisible ? "always" : "demand"}
      >
        <Suspense fallback={null}>
          <Scene
            expanded={expanded}
            showLabels={showLabels}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default TechStack;
