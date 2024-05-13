
// import React, { useState,useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// import { Link } from 'react-router-dom'; // Import Link from react-router-dom
// import { testApi } from "../apis/Api";
import service1 from "../assets/Images/service1.png";
import service2 from "../assets/Images/service2.png";
import service3 from "../assets/Images/service3.png";
import service4 from "../assets/Images/service4.png";
import hero1 from "../assets/Images/register1.png";
// import { getAllRestaurants } from "../apis/Api";
import "../style/service.css";


const Service = () => {


  return (
  
        <>
        <Navbar/>
        <section className="services">
      <h1>Our Services</h1>
      <div className="services-container">
        <div className="service-item">
          <img src={service1} alt="Choose location" />
          
        </div>
        
        
      </div>
    </section>
      
    
    <section className="packages">
      <p>Handle with care</p>
      <h1>Our Packages</h1>
      <div className="packages-container">
        <div className="package-item">
          <img src={service2} alt="Customer orders" />
          <div className="package-content">
            <h2>Customer orders</h2>
            <p>Have a question? Contact EventRentify support at any time with your problems...</p>
           
          </div>
        </div>
        <div className="package-item">
        <div style={{marginRight:'7%',marginLeft:'0%'
    }} className="package-content">
            <h2>Weekly Subscription</h2>
            <p>Have a question? Contact EventRentify support at any time with your problems...</p>
            
          </div>
          <img style={{marginLeft:'-3%',marginRight:'0%'}} src={service3} alt="Weekly Subscription" />
          
        </div>
        <div className="package-item">
          <img src={service4} alt="Special Events" />
          <div className="package-content">
            <h2>Special Events</h2>
            <p>Have a question? Contact EventRentify support at any time with your problems...</p>
            
          </div>
        </div>
      </div>
    </section>
    <div className="event-season">
      <div className="hero-section">
        <div className="hero-text">
          <h1>It's event Season</h1>
          <p>Time to book your product</p>
          <button>Rent row</button>
        </div>
        <img src={hero1} alt="Event" className="hero-image" />
      </div>
      <div className="book-section">
        <h1>Rent or book for 
          <br />your Event now</h1>
          
        <div className="book-options">
          <div className="book-option" style={{backgroundColor:'#E3C4C9'}}>
            <h3>Rent now</h3>
            <p>Lorem ipsum dolor sit amet...
any time when you have problem. Have a question? Contact Rentcars support
any time when you have problem. Have a question? Contact Rentcars suppany time when you have prHave a 
</p>
            <button className="rent-button"><a className="rent-service" href={"/contact"}>Rent now</a></button>
          </div>
          <div className="book-option">
            <h3>Reserve now</h3>
            <p>Lorem ipsum dolor sit amet...
any time when you have problem. Have a question? Contact Rentcars support
any time when you have problem. Have a question? Contact Rentcars suppany time when you have prHave a 
</p>
            <button className="reserve-button"><a className="rent-service" href={"/viewCategories"}>Reserve now</a></button>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
       </>
  )
}


export default Service;