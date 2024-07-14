

import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify'
import { getAllRequests, deleteRequest, updateRequestStatus } from "../../apis/Api";
import Sidebar from '../../components/Sidebar';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RequestDash = () => {
    const [requests, setRequests] = useState([]);
    
    
    useEffect(() => {
        // Fetch all requests from the API
        getAllRequests()
          .then((res) => {
            console.log(res.data);
            setRequests(res.data.requests);
          })
          .catch((error) => {
            console.error("Error fetching requests: ", error);
          });
      }, []);
      const handleUpdateStatus = async (requestId, newStatus) => {
        try {
          const response = await updateRequestStatus (requestId, { requestStatus: newStatus });
          console.log(response.data); // Log the response data to check if it's successful
          setRequests(prevRequests =>
            prevRequests.map(request =>
              request._id === requestId ? { ...request, requestStatus: newStatus } : request
            )
          );
          toast.success('Request status updated successfully');
        } catch (error) {
          console.error('Error updating request status:', error);
          toast.error('Error updating request status');
        }
      };
      const handleDelete = (id) => {
        const confirmDialog = window.confirm('Are you sure you want to delete this category?')
        if (!confirmDialog) {
          return;
        } else {
          // Make API call to delete request
          deleteRequest(id)
            .then((res) => {
              if (res.data.success) {
                toast.success(res.data.message);
                // Remove the deleted request from the local state
                setRequests(requests.filter(request => request._id !== id));
              } else {
                toast.error(res.data.message);
              }
            })
            .catch((error) => {
              console.error("Error deleting request: ", error);
              toast.error("Server error");
            });
        }
      };

  return (
    <>
    <Sidebar/>
    <div className="main-content">
        <h2 className="main head"style={{ marginLeft: "5%",marginTop:'2%' }}>List of Requests</h2>
     
      <div className="m-4">
        <table className="table table-striped-dash">
          <thead className="head-dashboard">
            <tr>
            <th style={{ backgroundColor:'#9A5865', color: 'white',fontSize:'19px' }}>Product Image</th>
              <th style={{ backgroundColor:'#9A5865', color: 'white',fontSize:'19px' }}>Full Name</th>
              <th style={{ backgroundColor:'#9A5865', color: 'white',fontSize:'19px' }}>Product Name</th>
              <th style={{ backgroundColor:'#9A5865', color: 'white',fontSize:'19px' }}>Phone Number</th>
      
              <th style={{ backgroundColor:'#9A5865', color: 'white',fontSize:'19px' }}>Price</th>
              <th style={{ backgroundColor:'#9A5865', color: 'white',fontSize:'19px' }}> Delete</th>
              <th style={{ backgroundColor:'#9A5865', color: 'white',fontSize:'19px',marginLeft:'20px' }}>Action</th>
            </tr>
          </thead>
          <tbody className="tbod-dash">
  {requests && 
  requests.map((request) => (
    <tr key={request._id}>
      <td  className="dash-td">
                <img style={{marginLeft:'4%'}}
                  src={request.productImageUrl}
                  width={"50"}
                  height={"50"}
                  alt=""
                />
              </td>
      <td  className="dash-td">{request.userName}</td>
      <td  className="dash-td">{request.productName}</td>
      <td  className="dash-td">{request.phone}</td>
      
      <td  className="dash-td">{request.price}</td>
      <td  className="dash-td">
        <div className="btn-group">
          <button
            onClick={() => handleDelete(request._id)}
            className="btn btn-danger"
            style={{marginRight:'10px', width:'9px',height:'40px',verticalAlign:'middle',marginTop:'0'}}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </td>
      <td  className="dash-td">
      <div className="button-container-license">
              <button style={{backgroundColour:'green',marginTop:'0',marginRight:'20px',}}className="approve-button-license btn btn-success" onClick={() => handleUpdateStatus(request._id, "Approved")}>Approve</button>
              <button style={{backgroundColour:'blue'}} className="reject-button-license btn btn-danger" onClick={() => handleUpdateStatus(request._id, "Not Approved")}>Reject</button>
            </div>
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

export default RequestDash;
