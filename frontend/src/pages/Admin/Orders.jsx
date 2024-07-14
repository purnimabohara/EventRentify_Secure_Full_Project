
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getAllOrdersApi,
  updateOrderStatusApi,
  updateReturnStatus,
  cancelOrderApi,
} from "../../apis/Api";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Sidebar from "../../components/Sidebar";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    getAllOrdersApi()
      .then((res) => {
        setOrders(res.data.orders);
        console.log("Fetched Orders:", res.data.orders);
      })
      .catch((err) => {
        toast.error("Server Error");
        console.log(err.message);
      });
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatusApi(orderId, { orderStatus: newStatus })
      .then((res) => {
        toast.success("Order status updated successfully");
        setOrders((prevOrders) => {
          const updatedOrders = prevOrders.map((order) => {
            if (order._id === orderId) {
              return { ...order, orderStatus: newStatus };
            }
            return order;
          });
          return updatedOrders;
        });
      })
      .catch((err) => {
        toast.error("Failed to update order status");
        console.log(err.message);
      });
  };

  const handleReturnStatusChange = (orderId, newStatus) => {
    updateReturnStatus(orderId, { returnStatus: newStatus })
      .then((res) => {
        toast.success("Return status updated successfully");
        setOrders((prevOrders) => {
          const updatedOrders = prevOrders.map((order) => {
            if (order._id === orderId) {
              return { ...order, returnStatus: newStatus };
            }
            return order;
          });
          return updatedOrders;
        });
      })
      .catch((err) => {
        toast.error("Failed to update return status");
        console.log(err.message);
      });
  };

  const handleCancelOrder = (orderId) => {
    cancelOrderApi(orderId)
      .then((res) => {
        toast.success("Order canceled successfully");
        setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
      })
      .catch((err) => {
        toast.error("Failed to cancel order");
        console.log(err.message);
      });
  };

  const formatDated = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date) ? "Invalid Date" : date.toLocaleDateString();
  };

  const getReturnDate = (pickUpDate) => {
    const pickUp = new Date(pickUpDate);
    const returnDate = new Date(pickUp.getTime() + 7 * 24 * 60 * 60 * 1000);
    return formatDated(returnDate);
  };

  const handleSearch = () => {
    // Triggered when you click the Search button
    getAllOrdersApi()
      .then((res) => {
        const filteredOrders = res.data.orders.filter((order) =>
          order.cartItems.some((item) =>
            item.cartID.itemID.itemName
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          )
        );
        setOrders(filteredOrders);
      })
      .catch((err) => {
        toast.error("Server Error");
        console.log(err.message);
      });
  };


  return (
    <>
    <style>
        {`
        .flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.space-y-2 > * + * {
  margin-top: 0.5rem;
}

.mr-2 {
  margin-right: 0.5rem;
}

.text-center {
  text-align: center;
}

.mb-1 {
  margin-bottom: 0.25rem;
}

.p-1 {
  padding: 0.25rem;
}

        `}
    </style>
      <Sidebar />
      <div className="main-content">
        <h2 className="main head" style={{ marginLeft: "5%",marginTop:'2%' }}>List of Orders</h2>
        <div className="search-containerr d-flex justify-content-between align-items-center">
  {/* Search bar */}
  <div className="search-barr d-flex align-items-center">
    <input
      type="text"
      className="form-control me-3"
      style={{ width: "400px",height:'50px',marginLeft:'100%' }}
      placeholder="Search order"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
    <button
      type="button"
      className="btn btn-success search-button1" style={{ width: "100px",height:'50px',color:'white',backgroundColor:'green',border:'none',marginTop:'0' }}
      onClick={handleSearch}
    >
      Search
    </button>
  </div>


</div>
        <div className="m-4">
          <table className="table table-striped-dash">
            <thead className="head-dashboard">
              <tr>
                <th style={{ backgroundColor:'#9A5865', color: 'white',fontSize:'17px' }}>
                  Product Image
                </th>
                <th style={{ backgroundColor:'#9A5865', color: 'white',fontSize:'17px' }}>
                  Product Name
                </th>
                <th style={{ backgroundColor:'#9A5865', color: 'white',fontSize:'17px' }}>
                  Quantity
                </th>
                <th style={{ backgroundColor:'#9A5865', color: 'white',fontSize:'17px' }}>
                  Order Date
                </th>
                <th style={{ backgroundColor:'#9A5865', color: 'white',fontSize:'1p7x' }}>
                  Total Price
                </th>
                <th style={{ backgroundColor:'#9A5865', color: 'white',fontSize:'17px' }}>
                  Shipping Info
                </th>
                <th style={{ backgroundColor:'#9A5865', color: 'white',fontSize:'17px' }}>
                  Dates (Pickup / Return)
                </th>
                <th style={{ backgroundColor:'#9A5865', color: 'white',fontSize:'17px' }}>
                  Actions
                </th>
                <th style={{ backgroundColor:'#9A5865', color: 'white',fontSize:'17px' }}>
                  Order Status
                </th>
                <th style={{ backgroundColor:'#9A5865', color: 'white',fontSize:'17px' }}>
                  Return Status
                </th>
              </tr>
            </thead>
            <tbody className="tbod-dash">
              {orders && orders.length > 0 ? (
                orders
                  .sort((a, b) => {
                    if (sortOrder === "asc") {
                      return new Date(a.createdAt) - new Date(b.createdAt);
                    } else {
                      return new Date(b.createdAt) - new Date(a.createdAt);
                    }
                  })
                  .map((order, index) => (
                    <tr key={index}>
                         <td className="dash-td">
                      <div className="flex flex-col space-y-2">
                          {order.cartItems.map((item) => (
                            <img style={{marginLeft:'4%'}}
                              key={item._id}
                              src={item.cartID.itemID.itemImage || ""}
                              width={"40"}
                              height={"40"}
                              alt={item.cartID.itemID.itemName || ""}
                              className="mb-1"
                            />
                          ))}
                        </div>
                      </td>
                      <td className="dash-td">
                        <div className="flex flex-col space-y-2">
                          {order.cartItems.map((item) => (
                            <p key={item._id} className="text-center">
                              {item.cartID.itemID.itemName || "N/A"}
                            </p>
                          ))}
                        </div>
                      </td>
                      <td className="dash-td">
                        <div className="flex flex-col space-y-2">
                          {order.cartItems.map((item) => (
                            <p key={item._id} className="text-center">
                              {item.cartID.cartQuantity || "N/A"}
                            </p>
                          ))}
                        </div>
                      </td>
                      <td className="dash-td">{formatDated(order.createdAt)}</td>
                      <td className="dash-td">Rs.{order.totalPayment}</td>
                      <td className="dash-td">
                        <div className="flex flex-col">
                          {order.shippingID ? (
                            <>
                              <p><strong>Name:</strong> {order.shippingID.firstName} {order.shippingID.lastName}</p>
                              <p><strong>Contact:</strong> {order.shippingID.contactNumber || "N/A"}</p>
                              <p><strong>Address:</strong> {order.shippingID.address || "N/A"}</p>
                              <p><strong>Requirements:</strong> {order.shippingID.specificRequirements || "N/A"}</p>
                            </>
                          ) : (
                            "No Shipping Info"
                          )}
                        </div>
                      </td>
                      <td >
                       
                      <div className="flex flex-col">
                          {order.shippingID ? (
                            <>
                              <p><strong>Pick-up Date:</strong> {order.shippingID.pickUpDate ? formatDated(order.shippingID.pickUpDate) : "N/A"}</p>
                              <p><strong>Return Date:</strong>{order.shippingID.pickUpDate ? getReturnDate(order.shippingID.pickUpDate) : "N/A"}</p>
                            </>
                          ) : (
                            "No Shipping Info"
                          )}
                        </div>
                         
                      </td>
                      <td>
                        <button
                          onClick={() => handleCancelOrder(order._id)}
                          className="btn btn-danger"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                      <td>
                        <select
                          value={order.orderStatus}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Process">On Progress</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Canceled">Cancelled</option>
                        </select>
                      </td>
                      <td>
                        <select
                          value={order.returnStatus}
                          onChange={(e) => handleReturnStatusChange(order._id, e.target.value)}
                        >
                          <option value="Not Returned">Not Returned</option>
                          <option value="Returned">Returned</option>
                        </select>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="10">No orders found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Orders;
