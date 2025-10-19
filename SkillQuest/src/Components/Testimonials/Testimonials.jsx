import React, { useRef } from 'react'
import './Testimonials.css'
import leftArrow from '../../assets/back-icon.png'
import rightArrow from '../../assets/next-icon.png'
import user from '../../assets/user.png'

export const Testimonials = () => {
  const testimonials = [
    {
      name: "Ayodeji Agboola",
      title: "A UH Student",
      text: "Established the ElevenLabs API"
    },
    {
      name: "Madison Reynolds",
      title: "A UHCL Student",
      text: "Created the webpage"
    },
    {
      name: "Wyatt Rios",
      title: "A UHCL Student",
      text: "Established the Gemini API and connections"
    },
    {
      name: "Payam Vakili",
      title: "A UH Student",
      text: "Developed the backend and connected Gemini to the backend."
    }
  ];

  return (
    <div className='test' id='testimonials'>
        <h4>About Developers</h4>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className='slide'>
              <div className='userinfo'>
                <img src={user} alt="Generic User Icon"></img>
                <div>
                  <h3>{testimonial.name}</h3>
                  <span>{testimonial.title}</span>
                </div>
              </div>
              <p>{testimonial.text}</p>
            </div>
          ))}
        </div>
    </div>
  )
}
