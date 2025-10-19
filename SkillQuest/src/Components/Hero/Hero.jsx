import React from 'react'
import { Link } from 'react-scroll'
import './Hero.css'

export const Hero = () => {
  return (
    <div className="hero container" id='home'>
      <div className="hero-text">
        <h1>Skill Quest: </h1>
        <p>An AI-powered learning journey that adapts to you — discover, play, and grow through personalized tech quests.</p>

        <Link to='demo' smooth={true} offset={-150} duration={500}><button className="btn">Try Now!</button></Link>
      </div>
    </div>
  )
}
