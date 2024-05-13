
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from 'react-toastify';
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { getAllCategories } from "../apis/Api";
import "../style/viewItem.css";
import { useNavigate } from "react-router-dom"; 
const ViewItem = () => {
  const [items, setItems] = useState([]);
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem('token'); // Assuming you store a token in localStorage
  });

  const navigate = useNavigate();
  useEffect(() => {
    getAllCategories()
      .then((res) => {
        const foundCategory = res.data.categories.find(
          (category) => category._id === categoryId
        );
        if (foundCategory) {
          setItems(foundCategory.items);
          setCategory(foundCategory);
          console.log("foundCategory", foundCategory);
        } else {
          console.error("Category not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching categories: ", error);
      });
  }, [categoryId]);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  const handleViewDetailsClick = (itemId) => {
    if (!isLoggedIn) {
      toast.error("Please log in first");
      navigate("/login");
    } else {
      navigate(`/itemdetails/${itemId}`);
    }
  };

  return (
    
    
    <>
  <Navbar />
 
   
  {/* Container for candle holders */}
  
  <div className="candle-holders-container">
  <div className="left-aligned-textt" style={{marginTop: 2%'2%'}}>
  {category && (
    
    <h2 className="candlee">{category.categoryName}</h2>

  )}
  </div>
  
    {/* Grid container */}
    <div className="grid-container-item">
      {items.map((item) => (
        <div key={item._id} className="menus-item cardd">
          <img src={item.itemImage} alt={item.itemName} className="card-item-img" />
          <div className="card-body-item">
            <h3 className="card-title-item">{item.itemName}</h3>
            <div className="card-rating">
              <span className="rating-star">★</span>
              <span className="rating-value">4.5</span>
              <span className="rating-count">(3200 reviews)</span>
            </div>
            <div className="price-container">
              <span className="card-price-label">Price</span>
              <span className="card-price-value">
                <span className="price-bold">Rs.{item.itemPrice}</span>
                <span className="price-dim">/week</span>
              </span>
            </div>
            <button
                  className="btn btn-details-item"
                  onClick={() => handleViewDetailsClick(item._id)}
                >
                  View details
                </button>
          </div>
        </div>
      ))}
    </div>
  </div>
  
</>

    
  );
};

export default ViewItem;