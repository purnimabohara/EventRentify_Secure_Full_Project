import React, { useEffect, useState } from 'react';
import { Link, useNavigate,useParams, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';
import { getCartByUserIDApi, getSingleShippingInfoApi, getShippingInfoByUserIDApi ,removeFromCartApi,createOrderApi } from '../apis/Api';
import "../style/addToCart.css";

import Navbar from "../components/Navbar";
import { CgEnter } from 'react-icons/cg';


const ReviewPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();  // Ensure this is used correctly if needed
    const user = JSON.parse(localStorage.getItem("user"));
    const userid = user?._id; 
    const [cart, setCart] = useState([]);
    const [shippingInfo, setShippingInfo] = useState(null);
    const [totalPayment, setTotalPayment] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('');
    // Get newShippingInfoId from the state passed via navigate
    const newShippingInfoId = location.state?.newShippingInfoId;

    useEffect(() => {
        const fetchCart = async () => {
            try {
                if (user && user._id) {
                    // Fetch cart items
                    const cartResponse = await getCartByUserIDApi(user._id);
                    console.log("Cart API Response:", cartResponse.data);
                    setCart(cartResponse.data.cart);
                } else {
                    toast.error("User not found in localStorage");
                }
            } catch (error) {
                toast.error("Server Error");
                console.error("Error fetching data:", error.message);
            }
        };

        fetchCart();
    }, [user._id]);

    useEffect(() => {
        const calculateTotalPayment = () => {
            const subtotal = calculateSubtotal();
            const securityDeposit = calculateSecurityDeposit();
            const deliveryCharge = calculateDeliveryCharge();
            return subtotal + securityDeposit + deliveryCharge;
        };
    
        setTotalPayment(calculateTotalPayment().toFixed(2));
    }, [cart]);

    useEffect(() => {
        const fetchShippingInfo = async () => {
            try {
                if (newShippingInfoId) {
                    // Fetch the new shipping information by ID
                    const shippingInfoResponse = await getSingleShippingInfoApi(newShippingInfoId);
                    console.log("Shipping Info API Response:", shippingInfoResponse.data);
                    if (shippingInfoResponse.data && shippingInfoResponse.data.shippingInfo) {
                        setShippingInfo(shippingInfoResponse.data.shippingInfo);
                    } else {
                        toast.error("Shipping info not found");
                    }
                } else if (user && user._id) {
                    // Fetch the shipping information specific to the user
                    const shippingInfoResponse = await getShippingInfoByUserIDApi(user._id);
                    console.log("Shipping Info API Response:", shippingInfoResponse.data);
                    if (shippingInfoResponse.data && shippingInfoResponse.data.shippingInfo && shippingInfoResponse.data.shippingInfo.length > 0) {
                        setShippingInfo(shippingInfoResponse.data.shippingInfo[0]);
                    } else {
                        setShippingInfo(null);  // Clear shipping info if not available
                    }
                } else {
                    toast.error("User not found in localStorage");
                }
            } catch (error) {
                toast.error("Server Error");
                console.error("Error fetching data:", error.message);
            }
        };

        fetchShippingInfo();
    }, [newShippingInfoId, user._id]);

    const handlePlaceOrder = async (e) => {
        e.preventDefault();

        if (!shippingInfo) {
            toast.error('No shipping information available');
            return;
        }

        const currentTime = new Date().toISOString();
        const cartItemList = cart.map(item => ({ cartID: item._id }));

        const orderData = {
            userID: userid,
            cartItems: cartItemList,
            shippingID: shippingInfo._id,  // Ensure this ID is correct
            totalPayment,
            paymentMethod,
            orderStatus: 'pending',
            createdAt: currentTime,
        };

        try {
            const response = await createOrderApi(orderData);
            if (response.data.success === false) {
                toast.error(response.data.message);
            } else {
                toast.success(response.data.message);
                navigate('/success');
            }
        } catch (err) {
            toast.error('Error Placing Order');
          
        }
    };
    const calculateSubtotal = () => {
        return cart.reduce((acc, item) => acc + parseFloat(item.totalPrice), 0);
    };
    const handlePrint = () => {
        window.print();
      };

    const calculateSecurityDeposit = () => {
        return cart.reduce((acc, item) => acc + (parseFloat(item.itemID.itemSecurityDeposit) * item.cartQuantity), 0);
    };
    const handleDelete = (id) => {
        const confirmDialog = window.confirm('Are you sure you want to remove this item from the cart?');
        if (!confirmDialog) {
            return;
        } else {
            removeFromCartApi(id).then((res) => {
                if (res.data.success) {
                    setCart(cart.filter(item => item._id !== id));
                    toast.success(res.data.message);
                } else {
                    toast.error(res.data.message);
                }
            }).catch(err => {
                toast.error("Server Error");
                console.log('Error removing cart item:', err);
            });
        }
    };
    const calculateDeliveryCharge = () => {
        const uniqueOwners = new Set(cart.map(item => item.itemID.owner)).size;
        return uniqueOwners * 150;
    };

    // const handleProceedToPayment = () => {
    //     if (shippingInfo) {
    //         navigate('/payment', { state: { shippingInfo } });  // Pass shippingInfo to Payment page
    //     } else {
    //         toast.error("No shipping information available");
    //     }
    // };

    return (
        <>
        <Navbar/>
        <div className="max-w-6xl mx-auto p-2 mt-24 " style={{display:'flex',justifyContent:'center',backgroundColor:'#f9ecee'}} >

<div style={{display:'flex',width:'90%',marginBottom:'2%',marginTop:'3%',backgroundColor:'white',  boxShadow: '0 0 10px rgba(0, 0, 0, 0.305)' }} >
    <div style={{flex:'2',marginLeft:'3%'}}>
        <div className="cart-items" style={{marginLeft:'4%',marginTop:'5%'}}>
        {cart.length > 0 ? cart.map((item) => (
        <div key={item._id} className="cart-item" style={{ marginBottom: '2rem',height:'100px' }}>
            <img src={item.itemID.itemImage} alt={item.itemID.itemName} className="cart-item-image" />

            <div className="cart-item-details" style={{ marginLeft: '2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span className="cart-item-name">{item.itemID.itemName}</span>
                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '0.5rem' }}>
                        <span className="cart-item-owner"><strong>Quantity: </strong>{item.cartQuantity}</span>
          
                        <span className="cart-item-owner"><strong>Vendor: </strong>{item.itemID.owner}</span>
                    </div>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', marginTop: '1rem' }}>
                    <span  className="total-price" style={{fontSize:'23px'}}>Rs. {item.totalPrice} </span>
                    {/* <a style={{ color: 'grey', marginTop: '0.5rem', fontSize: '0.875rem' }} href={`/itemdetails/${item.itemID._id}`} className="inline-block font-medium text-xs">View details</a> */}
                    
                </div>
                <button onClick={() => handleDelete(item._id)} style={{ marginTop: '0.5rem',width:'40px',border:'none',background:'none' ,color:'#b93853'}}>
                <FaTrash
                        size={22}
                        style={{marginTop:'1rem' }}
            
                      />
                    </button>

            </div>
        </div>
    )) : <div>No items in cart</div>}
        </div>
        <div style={{width:'90%',marginLeft:'5%',marginTop:'5%'}}>
                <div className="bg-white shadow-md rounded-lg ">
                    <h2 className="text-xl  text-blue-500 mb-4 "style={{marginTop:'2%',fontWeight:'normal'}}>Payment Method</h2>
                    <form onSubmit={handlePlaceOrder}>
                        <div className="mb-4">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    className="form-radio text-blue-500"
                                    name="payment"
                                    value="cod"
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                <span className="ml-2">Cash on Delivery</span>
                            </label>
                        </div>
                        <div className="mb-4">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    className="form-radio text-blue-500"
                                    name="payment"
                                    value="khalti"
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                <span className="ml-2">Khalti</span>
                            </label>
                        </div>
                        
                    </form>
                </div>            
                  <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "10px",
                }}
              >
                <button type="submit">Print </button>
                <button type="button" onClick={handlePrint}>
                  <i className="fas fa-print"></i>
                </button>
              </div>

            </div>
        </div>
        <div style={{backgroundColor:'white',flex:'1.6', margin:'0',gap:'20px'}}>
   <div className='right-shipping-summary'>
        <div className="review-shipping-summary"style={{width:'550px',marginTop:'9%'}}>
            <h2 style={{ fontWeight: 'normal', marginBottom: '10%' }} className="cart-title">Shipping Information</h2>
            {shippingInfo ? (
                <div className="summary-details">
                    <p style={{ marginBottom: '1.5rem' ,fontSize:'20px'}} ><strong style={{ marginRight: '1rem',color:'#9A5865'}} >Name:</strong> {shippingInfo.firstName} {shippingInfo.lastName}</p>
                    <p style={{ marginBottom: '1.5rem' ,fontSize:'20px' }}><strong style={{ marginRight: '1rem',color:'#9A5865'}} >Address:</strong> {shippingInfo.address}</p>
                    <p style={{ marginBottom: '1.5rem',fontSize:'20px' }}><strong style={{ marginRight: '1rem',color:'#9A5865'}} >Contact Number:</strong> {shippingInfo.contactNumber}</p>
                    <p style={{ marginBottom: '1.5rem',fontSize:'20px' }}><strong style={{ marginRight: '1rem',color:'#9A5865'}} >Pick-Up Date:</strong> {shippingInfo.pickUpDate}</p>
                    <p style={{ marginBottom: '1.5rem',fontSize:'20px' }}><strong style={{ marginRight: '1rem',color:'#9A5865'}} >Return Date:</strong> {shippingInfo.returnDate}</p>
                    <p style={{ marginBottom: '1.5rem',fontSize:'20px' }}><strong style={{ marginRight: '1rem',color:'#9A5865'}} >Specific Requirements:</strong> {shippingInfo.specificRequirements}</p>
                </div>
            ) : (
                <p>No shipping information available</p>
            )}
        </div>
    
        <div className="review-cart-summary" style={{width:'550px',  padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)', marginRight:'5%',marginBottom:'15%',marginTop:'2%' }}>
    <h2 style={{ fontWeight: 'normal', marginBottom: '10%' }} className="cart-title">Order Summary</h2>
    <div className="summary-details">
        <div style={{ marginBottom: '1.5rem' }}>
            <span style={{ marginRight: '1.3rem',fontSize:'18px' }}>Subtotal ({cart.length} items):</span>
            <span style={{marginLeft:'24%', fontSize:'20px' }}>Rs. {calculateSubtotal().toFixed(2)}</span>
        </div>
        <div style={{ marginBottom: '1rem' }}>
            <span style={{ marginRight: '1.3rem',fontSize:'18px' }}>Security Deposit:</span>
            <span span style={{ marginLeft:'26%',fontSize:'20px' }}>Rs. {calculateSecurityDeposit().toFixed(2)}</span>
        </div>
        <div style={{ marginBottom: '1rem' }}>
            <span style={{ marginRight: '1rem',fontSize:'18px' }}>Delivery Charges:</span>
            <span span style={{ marginLeft:'26%',fontSize:'20px' }}>Rs. {calculateDeliveryCharge().toFixed(2)}</span>
        </div>
        <div style={{ marginBottom: '2rem',marginTop:'2rem',borderTop:'solid 2px #9A5865 ',marginRight: '1rem' }}>
            <span style={{ marginRight: '1rem', fontWeight: 'bold', fontSize: '1.5rem' }}>Total:</span>
            <span style={{ fontWeight: 'bold',marginLeft:'44%', fontSize: '1.5rem' }}>Rs. {(calculateSubtotal() + calculateSecurityDeposit() + calculateDeliveryCharge()).toFixed(2)}</span>
        </div>
    </div>
    <button className="checkout-btn" 
    style={{ display: 'block', width: '80%', padding: '0.75rem', borderRadius: '0.25rem', marginTop: '1rem', textAlign: 'center', textDecoration: 'none', fontWeight: 'bold',border:'none' ,marginLeft:'10%'}}
     onClick={handlePlaceOrder}>
    PLACE AN ORDER ({cart.length})
    </button>
   
   

</div>
</div>
</div>
    </div>

    </div>
    

    </>
    
    );
};

export default ReviewPage;


