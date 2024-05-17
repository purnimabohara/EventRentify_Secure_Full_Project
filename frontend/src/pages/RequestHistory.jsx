import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { getRequestsByUserId } from "../apis/Api"; // Import the API function to fetch user bookings
import "../style/requestHistory.css";

const RequestHistory = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Fetch user's bookings when the component mounts
    fetchUserRequests();
  }, []);

  const fetchUserRequests = async () => {
    try {
      const loggedInUserId = JSON.parse(localStorage.getItem("user"))._id;
      const response = await getRequestsByUserId(loggedInUserId); // Pass the user's ID to the API function
      if (response.data.success) {
        setRequests(response.data.requests);
      } else {
        console.error("Error fetching user requests: ", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching user requests: ", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="request-history">
        <h2 className="headerr">Request History</h2>
        <div className="table-container">
          {requests.length === 0 ? (
          
            <div className="no-items-container">
           
            <div className="center-message" style={{ backgroundColor: 'white', width: '40%', padding: '50px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.805)', height: '250px', marginTop: '7%', marginLeft: '30%' }}>
              <h2 style={{ textAlign: 'center', color: '#9A5865' }}>Search No Result</h2>
              <h5 style={{ textAlign: 'center', marginTop: '4%', color: '#9A5865' }}>
             Nothing in your history. Looks like you have requested yet.
              </h5>
            </div>
          </div>
          ) : (
            <table className="request-table">
              <thead>
                <tr>
                  <th>Product Image</th>
                  <th>Product name</th>
                  <th>Quantity</th>
                  <th>Estimated Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <tr key={request._id} className="request-row">
                    <td>
                      <img
                        src={request.productImageUrl}
                        width={"60"}
                        height={"60"}
                        alt=""
                      />
                    </td>
                    <td>{request.productName}</td>
                    <td>{request.quantity}</td>
                    <td>Rs.{request.price}</td>
                    <td>
                      {request.requestStatus === "Approved" && (
                        <div className="status-approved">
                          <p style={{ marginTop: "10%" }}>Approved</p>
                        </div>
                      )}
                      {request.requestStatus === "Not Approved" && (
                        <div className="statusOn-progress">
                          <p style={{ marginTop: "10%" }}>On Pending</p>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default RequestHistory;
