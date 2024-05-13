
// import React, { useState,useEffect } from "react";
import Navbar from "../components/Navbar";
// import { Link } from 'react-router-dom'; // Import Link from react-router-dom
// import { testApi } from "../apis/Api";
// import service1 from "../assets/Images/service1.png";
// import service2 from "../assets/Images/service2.png";
// import service3 from "../assets/Images/service3.png";
// import service4 from "../assets/Images/service4.png";
// import hero1 from "../assets/Images/register1.png";
// import { getAllRestaurants } from "../apis/Api";
import "../style/thankyou.css";


const Thankyou = () => {
 

  return (
  
        <>
        <Navbar/>
        <div class="thank-you-container">
        <div class="thank-you-card">
            <div class="thankyou-icon-container">
                <div class="icon-background-thankyou"></div>
                <div class="icon-checkmark-thankyou">&#10004;</div>
                <div className="particles-container">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="particle"></div>
            ))}
          </div>
            </div>
            <h1 className="thankyou-h1">Thank you for ordering!</h1>
            <p className="thankyou-p">Your order has been reserved successfully</p>
            <div class="buttons-container-thankyou">
                <button class="view-order-button-thankyou"><a style={{textDecoration:'none',color:'white'}} href="/orderHistory">View Order</a></button>
                <button class="continue-shopping-button-thankyou"><a style={{textDecoration:'none',color:'white'}} href="/viewCategories">Continue Shopping</a></button>
            </div>
        </div>
    </div>
      
    
  
  
       </>
  )
}

export default Thankyou;