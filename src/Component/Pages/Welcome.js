import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import '../Pages/style.css'
const Welcome = () => {
  return (
    <>
        <Navbar/>
        {/* Carousel */}
        <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
                    <div>
        <div className="carousel-inner">
            <div className="carousel-item active">
            <img src="../images/welcom1.jpg" className="d-block w-100" alt="welcome1" />
            </div>
            <div className="carousel-item">
            <img src="../images/welcome2.jpg" className="d-block w-100" alt="welcome2" />
            </div>
            <div className="carousel-item">
            <img src="../images/welcom1.jpg" className="d-block w-100" alt="ewlcome3" />
            </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
        </button>
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default Welcome