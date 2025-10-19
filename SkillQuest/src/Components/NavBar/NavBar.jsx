import React, { useEffect, useState } from 'react'
import { Link } from 'react-scroll'
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
        <Link to='home' smooth={true} offset={0} duration={500}><img src={logo} alt="SkillQuest Logo" className='logo' ></img></Link>
        <ul>
            <li><Link to='home' smooth={true} offset={0} duration={500}>Home</Link></li>
            <li><Link to='about' smooth={true} offset={-200} duration={500}>About Project</Link></li>
            <li><Link to='testimonials' smooth={true} offset={-150} duration={500}>About Devs</Link></li>
            <li><Link to='demo' smooth={true} offset={-150} duration={500}>Demo</Link></li>
        </ul>
    </nav>
  )
}



