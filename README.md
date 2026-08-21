# Ankan Ghosh — 3D Portfolio

Personal 3D portfolio for Ankan Ghosh, a Computer Science Engineering student
at Lovely Professional University building AI, data, backend, and full-stack
systems. The site is built with React, TypeScript, Vite, Three.js, React Three
Fiber, and GSAP.

## Profile

- AI, data, and software engineer focused on production-grade systems.
- B.Tech Computer Science and Engineering, Lovely Professional University,
  2023-2027, CGPA 8.0.
- IT Analyst Intern at Eastern Coalfields Limited, Government of India.
- GitHub: [github.com/ankan00V](https://github.com/ankan00V)
- LinkedIn: [linkedin.com/in/ghoshankan](https://www.linkedin.com/in/ghoshankan)
- Email: [ghoshankan005@gmail.com](mailto:ghoshankan005@gmail.com)

## Featured Work

- **VidyaVerse**: opportunity intelligence platform using FastAPI, Next.js,
  MongoDB, Redis, Playwright, NLP, vector search, RAG, ranking metrics, and A/B
  testing. Processed 15K+ interaction events, improved CTR by 58%, and lifted
  apply-rate by 153%.
- **LPU Smart Campus**: campus platform with FastAPI, PostgreSQL, MongoDB,
  Redis, Docker, OpenCV, RBAC, CI/CD, observability, 200+ APIs, 14 modules, and
  50+ test suites.
- **Verdikt**: AI Investment Research Agent using LangGraph, Next.js, and Llama 3.3
  with structured state/action spaces, dense reward shaping, deterministic
  incident scenarios, and trajectory-based evaluation.
- **Public Policy Analytics**: analysis of 14K+ government welfare records with
  Python, Pandas, NumPy, Excel, Power BI, KPI tracking, correlation analysis, and
  time-series insights.

## Tech Stack

- Frontend: React, Next.js, TypeScript, JavaScript, Vite
- Backend: Python, FastAPI, Django, Node.js
- Databases and cache: PostgreSQL, MongoDB, MySQL, Redis
- AI and ML: Scikit-learn, TensorFlow, PyTorch, Hugging Face
- Data and BI: Power BI, Tableau
- Infrastructure and tools: Docker, Kubernetes, Git
- 3D and motion: Three.js, React Three Fiber, Drei, Rapier, GSAP

## Local Development

```bash
npm install
npm run dev
```

## Bob Assistant

Bob is wired through the server-side `/api/bob` endpoint so NVIDIA credentials
are never exposed in the browser bundle.

```bash
cp .env.example .env
# set NVIDIA_API_KEY in .env
```

Use `vercel dev` or deploy on Vercel to run the API route. Plain `npm run dev`
also runs a local `/api/bob` middleware. Bob uses
`mistralai/mistral-large-3-675b-instruct-2512` by default, with a short timeout
and local verified-portfolio fallback so the assistant stays responsive.

## Production Check

```bash
npm run build
npm run preview
```

The production build outputs static assets to `dist/`, suitable for Netlify,
Vercel, Cloudflare Pages, or any static hosting provider.
