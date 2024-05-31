import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { getSingleItem } from "../apis/Api";
import Navbar from "../components/Navbar";
import "../style/filterItem.css";

const FilteredItemsPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const filteredItems = location.state?.filteredItems || [];
  const [item, setItem] = useState(null);
  const [sortedItems, setSortedItems] = useState(filteredItems);
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    const fetchItemDetails = async (itemId) => {
      try {
        const res = await getSingleItem(itemId);
        if (res.data.success) {
          setItem(res.data.item);
        } else {
          console.error("Error fetching item details: ", res.data.message);
        }
      } catch (error) {
        console.error("Error fetching item details: ", error);
      }
    };

    // Fetch details for each item in filteredItems
    filteredItems.forEach((item) => {
      fetchItemDetails(item.itemId);
    });
  }, [filteredItems]);

  useEffect(() => {
    setSortedItems(filteredItems);
  }, [filteredItems]);

  const handleSort = (order) => {
    const sorted = [...filteredItems].sort((a, b) => {
      if (order === "high-to-low") {
        return b.itemPrice - a.itemPrice;
      } else if (order === "low-to-high") {
        return a.itemPrice - b.itemPrice;
      } else {
        return 0;
      }
    });
    setSortedItems(sorted);
    setSortOrder(order);
  };

  return (
    <>
      <Navbar />
      
      <div>
        {filteredItems.length === 0 ? (
          <div className="no-items-container">
            <div className="left-message">
              <p style={{ fontSize: '26px', marginLeft: '5%', marginTop: '4%', color: '#9A5865' }}>
                0 items found.
              </p>
            </div>
            <div className="center-message" style={{ backgroundColor: 'white', width: '40%', padding: '50px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.805)', height: '250px', marginTop: '7%', marginLeft: '30%' }}>
              <h2 style={{ textAlign: 'center', color: '#9A5865' }}>Search No Result</h2>
              <h5 style={{ textAlign: 'center', marginTop: '4%', color: '#9A5865' }}>
                We're sorry. We cannot find any matches for your search term.
              </h5>
            </div>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px' }}>
              <h5 style={{ fontSize: '26px', marginLeft: '4%', marginTop: '2%', color: '#9A5865' }}>{filteredItems.length} items found.</h5>
              <div className="dropdownn" style={{marginRight:'20%',marginTop: '1%',}}>
              <button style={{width:'121%',fontSize:'20px'}}
                    className="btn dropdown-toggle "
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Sort by
                  </button>
                <ul className="dropdown-menu">
                  <li>
                    <button className="dropdown-item" onClick={() => handleSort("high-to-low")}>
                      Price: High to Low
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={() => handleSort("low-to-high")}>
                      Price: Low to High
                    </button>
                  </li>
                </ul>
              </div>
            </div> 
            <div className="grid-container-item">
      {sortedItems.map((item) => (
        <div key={item.itemId} className="menus-item cardd">
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
            <Link to={`/itemdetails/${item._id}`} className="btn btn-details-item">
              View details
            </Link>
          </div>
        </div>
      ))}
    </div>
            
          </>
        )}
      </div>
    </>
  );
};

export default FilteredItemsPage;
