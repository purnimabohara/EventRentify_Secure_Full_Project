import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { getOrderByUserIDApi } from "../apis/Api"; // Import the API function to fetch orders by user ID
import "../style/requestHistory.css";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch user's orders when the component mounts
    fetchUserOrders();
  }, []);

  const fetchUserOrders = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user._id) {
        throw new Error("User ID not found in localStorage");
      }

      const response = await getOrderByUserIDApi(user._id); // Pass the user's ID to the API function
      if (response.data.success) {
        setOrders(response.data.orders); // Set the orders state with the fetched data
      } else {
        console.error("Error fetching user orders: ", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching user orders: ", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date) ? "Invalid Date" : date.toLocaleDateString();
  };

  const getReturnDate = (pickUpDate) => {
    const pickUp = new Date(pickUpDate);
    const returnDate = new Date(pickUp.getTime() + 7 * 24 * 60 * 60 * 1000);
    return formatDate(returnDate);
  };

  return (
    <>
      <Navbar />
      <div className="request-history">
        <h2 className="headerr">Order History</h2>
        <div className="table-container" style={{ width: '90%' }}>
          <table className="request-table" style={{ width: '98%' }}>
            <thead>
              <tr>
                <th>Product Image</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Reserved Date</th>
                <th>Return Date</th>
                <th>Order Status</th>
                <th>Return Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="request-row">
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      {order.cartItems.map((item) => (
                        <img style={{marginBottom:'5%'}}
                          key={item._id}
                          src={item.cartID.itemID.itemImage || ""}
                          width={"60"}
                          height={"60"}
                          alt={item.cartID.itemID.itemName || ""}
                        />
                      ))}
                    </div>
                  </td>
                  <td>
                    <div>
                      {order.cartItems.map((item) => (
                        <p style={{ fontSize: '19px', marginBottom: '24%', marginTop: '9%' }} key={item._id}>{item.cartID.itemID.itemName || "N/A"}</p>
                      ))}
                    </div>
                  </td>
                  <td>
                    <div>
                      {order.cartItems.map((item) => (
                        <p style={{ fontSize: '19px', marginBottom: '39%', marginTop: '10%' }} key={item._id}>{item.cartID.cartQuantity || "N/A"}</p>
                      ))}
                    </div>
                  </td>
                  <td style={{ fontSize: '19px' }}>Rs.{order.totalPayment}</td>
                  <td>
                    {order.shippingID ? (
                      <div>
                        <p style={{ fontSize: '19px', marginTop: '8%' }}>{order.shippingID.pickUpDate ? formatDate(order.shippingID.pickUpDate) : "N/A"}</p>
                      </div>
                    ) : (
                        "No Shipping Info"
                      )}
                  </td>
                  <td>
                    {order.shippingID ? (
                      <div>
                        <p style={{ fontSize: '19px', marginTop: '8%' }}>{order.shippingID.pickUpDate ? getReturnDate(order.shippingID.pickUpDate) : "N/A"}</p>
                      </div>
                    ) : (
                        "No Shipping Info"
                      )}
                  </td>
                  <td>
                    {order.orderStatus === "In Process" && (
                      <div className="statusOn-progress">
                        <p>On Progress</p>
                      </div>
                    )}
                    {order.orderStatus === "Delivered" && (
                      <div className="status-approved">
                        <p style={{ marginTop: '10%' }}>Delivered</p>
                      </div>
                    )}
                    {order.orderStatus === "Canceled" && (
                      <div className="status-canceled">
                        <p style={{ marginTop: '10%' }}>Cancelled</p>
                      </div>
                    )}
                    {order.orderStatus === "Pending" && (
                      <div className="status-pending">
                        <p style={{ marginTop: '10%' }}>Pending</p>
                      </div>
                    )}
                  </td>
                  <td>
                    {order.returnStatus === "Returned" && (
                      <div className="status-approved" > {/* Adjust width as needed */}
                        <p style={{ marginTop: '10%' }}>Returned</p>
                      </div>
                    )}
                    {order.returnStatus === "Not Returned" && (
                      <div className="statusOn-progress" > {/* Adjust width as needed */}
                        <p style={{ marginTop: '10%' }}>Not Returned</p>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default OrderHistory;
