import React from 'react'
import './index.css'
import { NavBar } from './Components/NavBar/NavBar'
import { Hero } from './Components/Hero/Hero'
import { Demo } from './Components/Demo/Demo'
import { About } from './Components/About/About'
import { Testimonials } from './Components/Testimonials/Testimonials'

const App = () => {
  return(
    <div>
     <NavBar/>
     <Hero/>
     <About/>
     <Demo/>
     <Testimonials/>
      
    </div>
  )
}

export default App