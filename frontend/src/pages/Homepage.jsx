
import React, { useEffect, useState,useRef } from "react";
import Navbar from "../components/Navbar";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom"; 
import {  FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { FaMapMarkerAlt, FaCalendarAlt, FaBoxOpen } from 'react-icons/fa';
import { motion } from 'framer-motion';
import home from "../assets/Images/homeBottom.jpg";
import team from "../assets/Images/team.jpg";
import team1 from "../assets/Images/team1.jpg";
import team2 from "../assets/Images/team2.jpg";


import { FaDollarSign,  FaClock, FaLifeRing } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import { getAllCategories,searchItemsByName } from "../apis/Api";

import "../style/homestyle.css";
import { FaMessage } from "react-icons/fa6";

const Homepage = () => {
  const [itemName, setItemName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [sortOption, setSortOption] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const listItemsRef = useRef([]);
  useEffect(() => {
    // Fetch only 3 categories from the API
    getAllCategories()
      .then((res) => {
        const fetchedCategories = res.data.categories.slice(0, 4);
        setCategories(fetchedCategories);
      })
      .catch((error) => {
        console.error("Error fetching featured categories: ", error);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const navigate = useNavigate();

   useEffect(() => {
    listItemsRef.current.forEach((item, index) => {
      setTimeout(() => {
        if (item) {
          item.classList.add('list-item-visible');
        }
      }, index * 200); // stagger the transition
    });
  }, [categories]);
   
  
 
  const { ref, inView } = useInView({
    triggerOnce: false, // Allow trigger each time element enters viewport
    rootMargin: '-50px 0px', // Adjust root margin to start animation earlier
  });

  useEffect(() => {
    if (inView) {
      // Optionally trigger animation or other actions when in view
    }
  }, [inView]);

  const handleSearchClick = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      toast.error("Please log in first");
      navigate("/login");
    } else {
      navigate("/viewCategories");
    }
  };

 
  return (
    <>
    <Navbar />
   
   
     <div className="wrapper-home">
 
  <div>
      <div className="container-fluid col-xxl-8 px-4 py-5 home-container">
 
        <div className="row flex-lg-row align-items-center g-5 home-row">
          <div className="col-lg-6 py-5 home-text">
            <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-0 t1">
   
              <span style={{fontSize:'35px',fontWeight:'normal'}}>     Elevate your event with </span>
              <br />
              <span  style={{fontWeight:'normal'}}> Top-Quality Rentals</span>
            </h1>
            <div className="d-flex align-items-center my-4 t2" style={{marginTop:'0'}}>
              <p>
                
                We're always nearby with everything you need for a perfect event!
              </p>
           
            </div>
            <button onClick={handleSearchClick} className="btn-details-home" >Search Now</button>
          </div>
         
        </div>
        </div>
     

      <div className="bottom-body">
        {/* Left-aligned text */}
        

      
      
        <div className="container-bottomhome">
      <section className="top-section-home">

        <div className="content-home">
          <div style={{width:'40%'}}>         
              <img src={home} alt="Event setup" className="image-home-bottom" />
              </div>

          <div className="info-home">
            <button className="title-home-button" ><a className="home-href" href={"/aboutUs"}>Why choose us</a></button>
          <h2 className="title-home">We offer the best experience <br/>with our rental deals</h2>
        <div className="info-item-home">
          <FaDollarSign className="info-icon-home" />
          <div>
            <h3>Best price guaranteed</h3>
            <p>Our Best Price Guarantee ensures you get the most competitive rates.</p>
          </div>
        </div>
        <div className="info-item-home">
          <FaMessage className="info-icon-home" />
          <div>
            <h3>Rent your product</h3>
            <p>Send us a request, and our team will handle everything.</p>
          </div>
        </div>
        <div className="info-item-home">
          <FaClock className="info-icon-home" />
          <div>
            <h3>24 hour supplies delivery</h3>
            <p>Book anytime, and we'll deliver directly to your event location, ensuring everything arrives on time.</p>
          </div>
        </div>
        <div className="info-item-home">
          <FaLifeRing className="info-icon-home" />
          <div>
            <h3>24/7 technical support</h3>
            <p>Have a question? Check out our FAQs below for quick answers to common queries</p>
          </div>
        </div>
          </div>
        </div>
      </section>
      
      <section className="how-it-works">
      <button className="title-works-button"><a className="home-href" href={"/service"}>How it work </a></button>
        <h2 className="how-it-works-title">Rent with following 3 working steps</h2>
        <div className="steps-home" ref={ref}>
      <motion.div
        className="step-home"
        initial={{ y: 50, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ delay: 0.4 }}
      >
        <FaMapMarkerAlt size={50} style={{ backgroundColor: '#f8f8f8', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '7px', color: '#9A5865' }} />
        <h4 style={{ marginTop: '7%', color: '#9A5865' }}>Choose location</h4>
        <p style={{ marginTop: '3%', color: 'white' }}>Choose and find<br /> your best event supplies</p>
      </motion.div>
      <motion.div
        className="step-home"
        initial={{ y: 50, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ delay: 0.7}}
      >
        <FaCalendarAlt size={50} style={{ backgroundColor: '#f8f8f8', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '7px', color: '#9A5865' }} />
        <h4 style={{ marginTop: '7%', color: '#9A5865' }}>Pick-up date</h4>
        <p style={{ marginTop: '3%', color: 'white' }}>Select your pick-up date and<br /> time to book your product</p>
      </motion.div>
      <motion.div
        className="step-home"
        initial={{ y: 50, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ delay: 1.0}}
      >
        <FaBoxOpen size={50} style={{ backgroundColor: '#f8f8f8', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '7px', color: '#9A5865' }} />
        <h4 style={{ marginTop: '7%', color: '#9A5865' }}>Book your product</h4>
        <p style={{ marginTop: '3%', color: 'white' }}>Book your supplies and we will deliver<br /> it directly to you</p>
      </motion.div>
    </div>
  
      </section>
    
      <div className="promo-home">
        <div>
        <h3>We Serve Better And Faster, so order away!</h3>
        <p>
        Discover, reserve, and rent event supplies effortlessly
        </p>
        </div>
       
        <button className="title-promo-button"><a className="home-href" href={"/contact"} style={{textDecoration:'none'}}> Rent now</a></button>
      </div>
      

        {/* <span className="span-em">
          <em></em>
        </span> */}

     
       </div>

     

    
      
<div className="category-home">
      <div className="list_home">
        
      <button className="title-category-button"><a  className='home-href' href={"/viewCategories"} style={{textDecoration:'none'}}>Show all products</a>
        </button> 
      <h2 className="how-it-works-title" style={{marginBottom:'3%'}}>Most popular event supplies rental deals</h2>
      <ul className="list-home-ul">
        {categories.map((category, index) => (
          <li
            key={category._id}
            className="list-item"
            ref={el => listItemsRef.current[index] = el}
          >
            <div className="content-wrapper">

              <div className="image-wrapper">
                <img
                  className="listImage"
                  src={category.categoryImageUrl}
                  alt={category.categoryName}
                />
                <div className="rating">
                <h3 className="category-name">{category.categoryName}</h3>
                </div>
              </div>
              <a className="overlay-link" href={`/viewItem/${category._id}/item`}>
                <button type="button" className="btn view-button">
                  Reserve Now →
                </button>
              </a>
            </div>
          </li>
        ))}
      </ul>
      </div>
      <section>
    <div class="customer-reviews-section">
    <a href={"/aboutUs"} style={{textDecoration:'none'}}>
    <button className="title-category-button" style={{width:'200px'}}>See more</button>
    <h2 className="how-it-works-title" style={{marginBottom:'2%'}}>The People Who Drive Our Succes</h2>
    </a>
 
  <div class="reviews-container">
    <div class="review">
      <div class="review-content">
        <div class="review-icon">
          <img src={team1} alt="User Icon" />
        </div>
        <p>Ravina is a logistics expert who coordinates everything from deliveries to setups.</p>
        <p class="reviewer-name">Ravina Tandan</p>
      </div>
    </div>
    <div class="review-images">
      <img src={team} alt="Review Image"     width={"300"}
                  height={"300"} />
    </div>
    <div class="review">
      <div class="review-content">
        <div class="review-icon">
          <img src={team2} alt="User Icon" />
        </div>
        <p>Natasha is an experienced event planner with over 10 years in the industry</p>
        <p class="reviewer-name">Natasha Wagle</p>
      </div>
    </div>
  </div>
</div>
</section>
    </div>


       
     </div>
     </div>
 
 
</div>
{/* <Footer/> */}
<footer class="footer"className="footer" style={{marginTop:'54%'}}>
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
};

export default Homepage;
