import React from 'react'
import './index.css'
import { NavBar } from './Components/NavBar/NavBar'
import { Hero } from './Components/Hero/Hero'
import { Demo } from './Components/Demo/Demo'
import { About } from './Components/About/About'

const App = () => {
  return(
    <div>
     <NavBar/>
     <Hero/>
     <About/>
     <Demo/>
     
      
    </div>
  )
}

export default App