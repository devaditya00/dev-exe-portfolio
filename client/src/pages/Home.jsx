import Hero from '../sections/Hero.jsx'
import About from '../sections/About.jsx'
import Stack from '../sections/Stack.jsx'
import Resume from '../sections/Resume.jsx'
import Projects from '../sections/Projects.jsx'
import Reviews from '../sections/Reviews.jsx'
import Comments from '../sections/Comments.jsx'
import Contact from '../sections/Contact.jsx'
import Footer from '../components/Footer.jsx'

const Home = () => {
  return (
      <main>
      <Hero />
      <About />
      <Stack />
      <Resume />
      <Projects />
      <Reviews />
      <Comments />
      <Contact />
      <Footer />
    </main>
  )
}

export default Home