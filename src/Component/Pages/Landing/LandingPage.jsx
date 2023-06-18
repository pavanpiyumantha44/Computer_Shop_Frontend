import React, { useState } from 'react'
import './LandingPage.css';
import NavBar from './NavBar';
import Typewriter from 'typewriter-effect';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [state,setState] = useState({
    title:"PC",
    titleTwo:"SOLUTIONS",
    titleThree:"",
    image:"../images/bg.jpeg",

  })
  const navigate = useNavigate();
  const handleNavigation = ()=>{
      navigate('/login');
  }
  return (
    <>
      <NavBar />
        <section className="home">
          <div className="home">
            <div className="home-intro">
              <h2>
                <div className="title">{state.title}</div>
                <div className="titleTwo">{state.titleTwo}</div>
                <div className="titleThree">{state.titleThree}</div>
              </h2>
              <div className="text">
                <Typewriter
                  options={{
                    autoStart: true,
                    loop: true,
                    delay: 40,
                    strings: [
                      "Computer Builds",
                      "Computer Repair",
                      "Computer Selling",
                    ],
                  }}
                />
              </div>
              <div className='contact-me'>
                <button className='button fw-bold' onClick={()=>handleNavigation()}>Get Started</button>
              </div>
            </div>
            <div className="image">
              <img src="./images/bg.jpeg" alt="bg"/>
            </div>
          </div>
        </section>
      <Footer/>
    </>
  );
}

export default LandingPage