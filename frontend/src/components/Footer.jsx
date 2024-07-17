import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";
import "../style/footer.css";

import { getCartByUserIDApi } from '../apis/Api';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';


const Footer = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  


  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/login");
  };

 return(
    <>
    <footer class="footer">
  <div class="footer-top">
    <div class="footer-logo">
      <img src="path-to-logo.png" alt="Eventique Logo" />
      <div class="footer-contact">
        <div class="contact-item">
          <FaMapMarkerAlt /> New Baneshwor,Kathmandu
        </div>
        <div class="contact-item">
          <FaPhoneAlt /> +977-1-2345678
        </div>
        <div class="contact-item">
          <FaEnvelope /> info@Eventique.com
        </div>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <div class="footer-column">
      <h4>Our Products</h4>
      <ul>
        <li>Event Supplies</li>
        <li>Party Rentals</li>
        <li>Wedding Essentials</li>
        <li>Corporate Event Gear</li>
      </ul>
    </div>
    <div class="footer-column">
      <h4>Resources</h4>
      <ul>
      <li> <a className="footer-href" href={"/terms"}>Terms</a></li>
      <li> <a className="footer-href" href={"/policy"}> Policies</a></li>
        
      </ul>
    </div>
    <div class="footer-column">
      <h4>About Eventique</h4>
      <ul>
        <li> <a className="footer-href" href={"/aboutUs"}>About Us</a></li>
        <li> <a className="footer-href" href={"/aboutUs"}> Our Team</a></li>
        
      </ul>
    </div>
  </div>
</footer>
    </>
 );
}

export default Footer;





