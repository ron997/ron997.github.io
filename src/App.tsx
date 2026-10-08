import { Footer } from './components/Footer'
import { SmoothScroll } from './components/motion/SmoothScroll'
import { Nav } from './components/Nav'
import { Contact } from './components/sections/Contact'
import { Education } from './components/sections/Education'
import { Experience } from './components/sections/Experience'
import { Hero } from './components/sections/Hero'
import { Projects } from './components/sections/Projects'
import { Results } from './components/sections/Results'
import { Skills } from './components/sections/Skills'
import { Summary } from './components/sections/Summary'

export default function App() {
  return (
    <>
      <SmoothScroll />
      <a className="skip" href="#main">Skip to content</a>
      <Nav />
      <main id="main">
        <Hero />
        <Summary />
        <Results />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
