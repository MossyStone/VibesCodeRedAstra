import React from 'react'
import './NavBar.css'
import logo from '../../assets/logo.png'

export const NavBar = () => {
  return (
    <nav className='container'>
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
