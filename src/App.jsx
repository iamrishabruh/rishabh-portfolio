import Starfield from './components/Starfield'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Research from './components/Research'
import Projects from './components/Projects'
import PhotoReel from './components/PhotoReel'
import MusicReel from './components/MusicReel'
import Education from './components/Education'
import Recognition from './components/Recognition'
import Skills from './components/Skills'
import Documents from './components/Documents'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Starfield />
      <Nav />
      <main className="page">
        <Hero />
        <About />
        <Experience />
        <Research />
        <Projects />
        <PhotoReel />
        <MusicReel />
        <Education />
        <Recognition />
        <Skills />
        <Documents />
        <Footer />
      </main>
    </>
  )
}
