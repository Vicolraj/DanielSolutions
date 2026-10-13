import './App.css'
import Nav from './components/atom/Nav'
import HeroSection from './components/ui/HeroSection'
import Marquee from './components/atom/Marquee'
import Work from './components/atom/Work'
// import ScrollVideoSection from './components/atom/ScrollVideoSection'
import TechStack from './components/atom/TechStack'
import Contact from './components/atom/Contact'
import Footer from './components/atom/Footer'
import { useCustomCursor } from './hooks/useCustomCursor'
import { useScrollReveal } from './hooks/useScrollReveal'
import { useRef } from 'react'
import {motion} from  "framer-motion"


function App() {
  useCustomCursor();
  useScrollReveal();
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <motion.section initial = {{opacity: 0}} animate = {{opacity:1 }} ref={containerRef}>
      <Nav />
      <HeroSection />
      {/* <ScrollVideoSection sectionRef={containerRef} /> */}
      <Marquee />
      <Work />
      <TechStack />
      <Contact />
      <Footer />
       {/* This is a comment  */}
    </motion.section>
  )
}

export default App
