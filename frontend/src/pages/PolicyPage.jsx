

// import React, { useState,useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// import { Link } from 'react-router-dom'; // Import Link from react-router-dom
// import { testApi } from "../apis/Api";

// import { getAllRestaurants } from "../apis/Api";



const PolicyPage = () => {


  return (
  
        <>
        <Navbar/>
        <section className="services">
      
     
  
      
    <div className='modal-booking'>
<div className='modal-content'>
  <h3 className='modal-header'>Cancellation Policy Agreement</h3>
  <ul className='policy-list'>
    <li>
      <strong style={{color:'#9A5865'}}>1. Cancellation Time-frames and Fees:</strong>
      <ul>
        <li>30+ days before event: Full refund, minus $50 processing fee.</li>
        <li>15-29 days before event: 50% refund.</li>
        <li>1-14 days before event: No refund.</li>
        <li>Same day of event: No refund.</li>
      </ul>
    </li>
    <li>
      <strong style={{color:'#9A5865'}}>2. Non-Refundable Items:</strong>
      <ul>
        <li>Custom orders, special request items, and delivery/setup fees are non-refundable.</li>
      </ul>
    </li>
    <li>
      <strong style={{color:'#9A5865'}}>3. Refund Process:</strong>
      <ul>
        <li>Refunds processed within 14 business days to the original payment method.</li>
      </ul>
    </li>
    <li>
      <strong style={{color:'#9A5865'}}>4. Changes to Orders:</strong>
      <ul>
        <li>Changes must be requested at least 14 days before the event. Additional charges may apply.</li>
      </ul>
    </li>
    <li>
      <strong style={{color:'#9A5865',marginTop:'10%'}}>5. Force Majeure:</strong>
      <ul>
        <li>
          Cancellations due to unforeseen circumstances will be assessed individually. Possible full/partial refund or future credit.
        </li>
      </ul>
    </li>
  </ul>
  
 
</div>
</div>
</section>
 
    <Footer/>
       </>
  )
}


export default PolicyPage;