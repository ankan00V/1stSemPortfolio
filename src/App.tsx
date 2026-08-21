import { lazy, Suspense, useEffect, useState } from "react";
import "./App.css";
import ProjectDocumentation from "./components/ProjectDocumentation";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
import { LoadingProvider } from "./context/LoadingProvider";

function getProjectDocSlug() {
  const prefix = "#/project-docs/";

  if (!window.location.hash.startsWith(prefix)) return "";
  return window.location.hash.slice(prefix.length);
}

const App = () => {
  const [projectDocSlug, setProjectDocSlug] = useState(getProjectDocSlug);

  useEffect(() => {
    const handleHashChange = () => setProjectDocSlug(getProjectDocSlug());

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  if (projectDocSlug) {
    return <ProjectDocumentation slug={projectDocSlug} />;
  }

  return (
    <>
      <LoadingProvider>
        <Suspense>
          <MainContainer>
            <Suspense>
              <CharacterModel />
            </Suspense>
          </MainContainer>
        </Suspense>
      </LoadingProvider>
    </>
  );
};

export default App;
