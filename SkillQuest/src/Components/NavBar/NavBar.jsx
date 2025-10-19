import React, { useEffect, useState } from 'react'
import './NavBar.css'
import logo from '../../assets/logo.png'

export const NavBar = () => {
  const [sticky, setSticky] = useState(false);
  
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 50 ? setSticky(true) : setSticky(false)
    })
  }, [])
  
  return (
    <nav className={`container ${sticky ? 'darkNav' : ''}`}>
        <img src={logo} alt="SkillQuest Logo" className='logo' ></img>
        <ul>
            <li><button className='btn'>Home</button></li>
            <li><button className='btn'>Demo</button></li>
            <li><button className='btn'>About Us</button></li>
            <li><button className='btn'>Testimonials</button></li>
            <li><button className='btn'>Contact Us</button></li>
        </ul>
    </nav>
  )
}



