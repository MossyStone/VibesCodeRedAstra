import React from 'react'
import './index.css'
import { NavBar } from './Components/NavBar/NavBar'
import { Hero } from './Components/Hero/Hero'
import { Demo } from './Components/Demo/Demo'
import { About } from './Components/About/About'
import { Testimonials } from './Components/Testimonials/Testimonials'
import { Footer } from './Components/Footer/Footer'

const App = () => {
  return(
    <div>
     <NavBar/>
     <Hero/>
     <About/>
     <Testimonials/>
     <Demo/>
     <Footer/>
      
    </div>
  )
}

export default App