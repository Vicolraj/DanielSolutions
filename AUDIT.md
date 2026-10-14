# Repository Audit (Pre-migration)

## Original runtime and scripts
- Tooling: Vite + React + TypeScript
- Scripts:
  - `dev`: `vite`
  - `build`: `tsc -b && vite build`
  - `lint`: `eslint .`
  - `preview`: `vite preview`

## Original dependencies
- Runtime: react, react-dom, framer-motion, gsap, @gsap/react, three, @react-three/fiber, postprocessing, face-api.js, @rive-app/react-canvas
- Dev: typescript, vite, @vitejs/plugin-react, eslint stack

## Original page and section structure
- Single page app mounted from `src/main.tsx`
- Root composition in `src/App.tsx`:
  1. Navbar (`Nav`)
  2. Hero (`HeroSection`)
  3. Marquee (`Marquee`)
  4. Work grid (`Work`)
  5. Tech stack (`TechStack`)
  6. Contact (`Contact`)
  7. Footer (`Footer`)
- Optional section present but commented out: `ScrollVideoSection`

## Original components
- UI:
  - `src/components/ui/HeroSection.tsx`
- Atom sections:
  - `src/components/atom/Nav.tsx`
  - `src/components/atom/Marquee.tsx`
  - `src/components/atom/Work.tsx`
  - `src/components/atom/TechStack.tsx`
  - `src/components/atom/Contact.tsx`
  - `src/components/atom/Footer.tsx`
  - `src/components/atom/ScrollVideoSection.tsx`
- Animation utilities:
  - `src/components/animation/GridScan/GridScan.tsx`
  - `src/components/animation/SplitText/SplitText.tsx`
  - `src/components/animation/TextType/TextType.tsx`

## Original hooks
- `src/hooks/useCustomCursor.ts`
- `src/hooks/useScrollReveal.ts`

## Original CSS files
- Global/app styles:
  - `src/index.css`
  - `src/App.css`
- Section styles:
  - `src/components/atom/styles/nav.css`
  - `src/components/atom/styles/marquee.css`
  - `src/components/atom/styles/work.css`
  - `src/components/atom/styles/tech.css`
  - `src/components/atom/styles/contact.css`
  - `src/components/atom/styles/footer.css`
  - `src/components/atom/styles/scrollvideo.css`
- Hero styles:
  - `src/components/ui/styles/HeroSection.css`
- Animation styles:
  - `src/components/animation/GridScan/GridScan.css`
  - `src/components/animation/TextType/TextType.css`

## Original fonts and typography
- Google Fonts loaded in CSS:
  - Fraunces
  - Inter
  - DM Mono

## Original data source
- Static in `src/data.ts`:
  - Project list
  - Tech stack groups

## Original assets
- `src/assets/icons/*` (mirrored in `public/icons/*`)
- `src/assets/img/laptop.webp`
- `src/assets/img/mycodes.png`
- `src/assets/videos/o1.mp4`
- `public/favicon.png`
- `public/og-preview.jpg`
- `public/sitemap.xml`

## Design tokens and constraints carried forward
- CSS variables in `src/index.css` including:
  - color palette
  - brutal border/shadow tokens
  - typography tokens
  - spacing and transitions
- Existing class names and values were preserved in migrated styling where practical.
