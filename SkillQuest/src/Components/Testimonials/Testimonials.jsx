import React, { useRef, useState, useEffect  } from 'react'
import './Testimonials.css'
import leftArrow from '../../assets/back-icon.png'
import rightArrow from '../../assets/next-icon.png'
import user from '../../assets/user.png'

export const Testimonials = () => {

    const slider = useRef();
    const [tx, setTx] = useState(0);

    useEffect(() => {
        slider.current.style.transform = `translateX(${tx}%)`;
    }, [tx]);

    const slideForward = ()=>{
        if(tx > -75){
            setTx(tx - 25);
        }
    }

    const slideBackward = ()=>{
        if(tx < 0){
            setTx(tx + 25);
        }
    }



  return (
    <div className='test'>
        <h4>About Project</h4>
        <img src={leftArrow} alt="A left arrow" className='back-btn' onClick={slideBackward}></img>
        <img src={rightArrow} alt="A right arrow" className='next-btn' onClick={slideForward}></img>
        <div className="slider">
            <ul ref={slider}>
                <li>
                    <div className='slide'>
                        <div className='userinfo'>
                            <img src={user} alt="Generic User Icon"></img>
                            <div>
                                <h3>Ayodeji Agboola</h3>
                                <span>A UH Student</span>
                            </div>
                        </div>
                        <p>Insert stuff did</p>
                    </div>
                </li>

                <li>
                    <div className='slide'>
                        <div className='userinfo'>
                            <img src={user} alt="Generic User Icon"></img>
                            <div>
                                <h3>Madison Reynolds</h3>
                                <span>A UHCL Student</span>
                            </div>
                        </div>
                        <p>Insert stuff did</p>
                    </div>
                </li>
                <li>
                    <div className='slide'>
                        <div className='userinfo'>
                            <img src={user} alt="Generic User Icon"></img>
                            <div>
                                <h3>Wyatt Rios</h3>
                                <span>A UHCL Student</span>
                            </div>
                        </div>
                        <p>Insert stuff did</p>
                    </div>
                </li>
                <li>
                    <div className='slide'>
                        <div className='userinfo'>
                            <img src={user} alt="Generic User Icon"></img>
                            <div>
                                <h3>Payam Vakili</h3>
                                <span>A UH Student</span>
                            </div>
                        </div>
                        <p>Insert stuff did</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
  )
}
