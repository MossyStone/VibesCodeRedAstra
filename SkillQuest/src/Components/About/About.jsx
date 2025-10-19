import React from 'react'
import './About.css'
import about from '../../assets/about.jpg'

export const About = () => {
  return (
    <div className='about' id='about'>
        <div className='about-left'>
            <img src={about} alt="An image of laptops from above" className='about-img' ></img>
        </div>
        <div className='about-right'>
          <h4>About Project</h4>
          <h3>A CodeRed Astra Project</h3>
          <p>Team Vibes, consisting of four members (Madison Reynolds, Wyatt Rios, Payam Vakili, and Ayodeji Agboola) work
            together to establish this project. The goal is a gameifaction of learn through the power of AI.
          </p>
        </div>
    </div>
  )
}
