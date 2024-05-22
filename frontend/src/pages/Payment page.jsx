
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { createOrderApi, getCartByUserIDApi } from '../apis/Api';
import { toast } from 'react-toastify';

const Payment = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();  // Ensure this is used correctly if needed
    const user = JSON.parse(localStorage.getItem('user'));
    const userid = user?._id;  // Add optional chaining to prevent errors if `user` is null

    const [cart, setCart] = useState([]);
    const [totalPayment, setTotalPayment] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('');

    // Get shippingInfo from the state passed via navigate
    const shippingInfo = location.state?.shippingInfo;

    useEffect(() => {
        if (!userid) {
            toast.error("User not found in localStorage");
            return;
        }

        const fetchCart = async () => {
            try {
                const cartResponse = await getCartByUserIDApi(userid);
                if (cartResponse.data.cart && Array.isArray(cartResponse.data.cart)) {
                    setCart(cartResponse.data.cart);
                    const total = cartResponse.data.cart.reduce((acc, item) => acc + item.totalPrice, 0);
                    setTotalPayment(total);
                } else {
                    console.error('Invalid cart data format:', cartResponse.data);
                }
            } catch (error) {
                toast.error('Server Error');
                console.error('Error fetching cart data:', error.message);
            }
        };

        fetchCart();
    }, [userid]);

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
            toast.error('Server Error');
            console.error('Error placing order:', err.message);
        }
    };
    const calculateSubtotal = () => {
        return cart.reduce((acc, item) => acc + parseFloat(item.totalPrice), 0);
    };

    const calculateSecurityDeposit = () => {
        return cart.reduce((acc, item) => acc + (parseFloat(item.itemID.itemSecurityDeposit) * item.cartQuantity), 0);
    };
    const calculateDeliveryCharge = () => {
        const uniqueOwners = new Set(cart.map(item => item.itemID.owner)).size;
        return uniqueOwners * 150;
    };
    return (
        <div className="max-w-2xl mx-auto p-4 mt-8" style={{backgroundColor:'#9a586592'}}>
            {/* Process board */}
            {/* <div className="text-center mb-6 bg-gray-200 p-4">
                <h2 className="text-2xl font-semibold">PLACE YOUR RENT</h2>
                <div className="flex justify-center mt-4 text-xs items-center">
                    <div className="flex flex-col items-center space-y-2">
                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-300 text-gray-500">1</div>
                        <span className="ml-2 pt-1.5">ADDRESS</span>
                    </div>
                    <div className="w-24 h-1 bg-gray-300 mx-4"></div>
                    <div className="flex flex-col items-center space-y-2">
                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-300 text-gray-500">2</div>
                        <span className="ml-2">REVIEW</span>
                    </div>
                    <div className="w-24 h-1 bg-gray-300 mx-4"></div>
                    <div className="flex flex-col items-center space-y-2">
                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-500 text-white">3</div>
                        <span className="ml-2">PAYMENT</span>
                    </div>
                </div>
            </div> */}

            {/* Display Cart Items */}
            {/* <div className="mb-4">
                <h2 className="text-xl font-semibold text-blue-500 mb-4">Cart Items</h2>
                <ul>
                    {cart.map((item) => (
                        <li key={item._id} className="mb-2 p-2 border border-gray-200 rounded">
                            <p><strong>Item Name:</strong> {item.itemID.itemName}</p>
                            <p><strong>Total Price:</strong> ${item.totalPrice}</p>
                        </li>
                    ))}
                </ul>
                <h3 className="text-lg font-semibold mt-4">Total Payment: ${totalPayment}</h3>
            </div> */}

            {/* Display Shipping Info */}
            {/* <div className="mb-4">
                <h2 className="text-xl font-semibold text-blue-500 mb-4">Shipping Info</h2>
                {shippingInfo ? (
                    <div className="space-y-2">
                        <p><strong>First Name:</strong> {shippingInfo.firstName}</p>
                        <p><strong>Last Name:</strong> {shippingInfo.lastName}</p>
                        <p><strong>Contact Number:</strong> {shippingInfo.contactNumber}</p>
                        <p><strong>City:</strong> {shippingInfo.city}</p>
                        <p><strong>Address:</strong> {shippingInfo.address}</p>
                        <p><strong>Pick Up Date:</strong> {shippingInfo.pickUpDate}</p>
                        <p><strong>Return Date:</strong> {shippingInfo.returnDate}</p>
                        <p><strong>Specific Requirements:</strong> {shippingInfo.specificRequirements}</p>
                    </div>
                ) : (
                    <p>No shipping information available</p>
                )}
            </div> */}
                    {/* <div className="cart-container">
  <div className="cart-items">
        {cart.length > 0 ? cart.map((item) => (
        <div key={item._id} className="cart-item" style={{ marginBottom: '2rem' }}>
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
                    
                {/* </div>
               

            </div>
        </div>
    )) : <div>No items in cart</div>}
        </div>
   <div className='right-shipping-summary'>
        <div className="review-shipping-summary">
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
    
        <div className="review-cart-summary" style={{ maxWidth: '600px', width: '100%', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)', marginRight:'5%',marginBottom:'15%',marginTop:'2%' }}>
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
    
   

</div>
</div>
</div>  */}
        <div className="max-w-6xl mx-auto p-2 mt-24 " style={{display:'flex',justifyContent:'center'}} >
<div style={{display:'flex',width:'90%',marginBottom:'2%',marginTop:'3%',backgroundColor:'white'}} >
        <div className="cart-items" style={{marginLeft:'4%'}}>
        {cart.length > 0 ? cart.map((item) => (
        <div key={item._id} className="cart-item" style={{ marginBottom: '2rem' }}>
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
             

            </div>
        </div>
    )) : <div>No items in cart</div>}
        </div>
        
        <div style={{flex:'1.7', margin:'0',gap:'20px'}}>
   <div className='right-shipping-summary'>
        <div className="review-shipping-summary"style={{width:'550px',marginTop:'7%'}}>
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
   
   
    <a href="/viewCategories" className="continue-shopping-btn" style={{ display: 'block', width: '80%', color: '#ffffff', padding: '0.75rem', borderRadius: '0.25rem', marginTop: '1.5rem', textAlign: 'center', textDecoration: 'none',marginLeft:'10%', fontWeight: 'bold' }}>CONTINUE SHOPPING</a>
</div>
</div>
</div>
</div>
    </div>
            {/* Payment form */}
            <div style={{width:'90%',marginLeft:'5%'}}>
                <div className="bg-white shadow-md rounded-lg ">
                    <h2 className="text-xl font-semibold text-blue-500 mb-4 "style={{marginTop:'2%'}}>Payment Method</h2>
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
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
                            Place Order
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Payment;
