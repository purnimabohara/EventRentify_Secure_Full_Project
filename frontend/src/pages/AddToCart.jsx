
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { getCartByUserIDApi, removeFromCartApi, updateCartApi } from '../apis/Api';
// import { toast } from 'react-toastify';

// const AddToCart = () => {
//     const { id } = useParams();
//     const user = JSON.parse(localStorage.getItem("user"));
//     const [cart, setCart] = useState([]);

//     useEffect(() => {
//         if (user && user._id) {
//             getCartByUserIDApi(user._id)
//                 .then((res) => {
//                     console.log('Cart Response:', res);
//                     setCart(res.data.cart);
//                 })
//                 .catch(err => {
//                     toast.error("Server Error");
//                     console.log('Error fetching cart data:', err); // Log the full error object
//                 });
//         } else {
//             toast.error("User not found in localStorage");
//         }
//     }, [user && user._id]); // Ensure the effect runs only when user._id changes

//     const handleQuantityChange = (itemId, newQuantity) => {
//         const updatedCart = cart.map(item => {
//             if (item._id === itemId) {
//                 const rentalPrice = item.itemID.itemPrice;
//                 const securityDeposit = item.itemID.itemSecurityDeposit;

//                 const newTotalPrice = (parseFloat(rentalPrice)  * newQuantity);

//                 updateCartApi(itemId, { ...item, cartQuantity: newQuantity, totalPrice: newTotalPrice.toFixed(2) })
//                     .then((res) => {
//                         if (res.data.success) {
//                             toast.success("Quantity updated successfully");
//                         } else {
//                             toast.error(res.data.message);
//                         }
//                     })
//                     .catch(err => {
//                         toast.error("Server Error");
//                         console.log('Error updating cart data:', err);
//                     });

//                 return { ...item, cartQuantity: newQuantity, totalPrice: newTotalPrice.toFixed(2) };
//             }
//             return item;
//         });

//         setCart(updatedCart);
//     };

//     const handleDelete = (id) => {
//         const confirmDialog = window.confirm('Are you sure you want to remove this item from the cart?');
//         if (!confirmDialog) {
//             return;
//         } else {
//             removeFromCartApi(id).then((res) => {
//                 if (res.data.success) {
//                     setCart(cart.filter(item => item._id !== id));
//                     toast.success(res.data.message);
//                 } else {
//                     toast.error(res.data.message);
//                 }
//             }).catch(err => {
//                 toast.error("Server Error");
//                 console.log('Error removing cart item:', err);
//             });
//         }
//     };

//     const calculateSubtotal = () => {
//         return cart.reduce((acc, item) => acc + parseFloat(item.totalPrice), 0);
//     };

//     const calculateSecurityDeposit = () => {
//         return cart.reduce((acc, item) => acc + (parseFloat(item.itemID.itemSecurityDeposit) * item.cartQuantity), 0);
//     };

//     const calculateDeliveryCharge = () => {
//         const uniqueOwners = new Set(cart.map(item => item.itemID.owner)).size;
//         return uniqueOwners * 150;
//     };

//     return (
//         <div>
//             <div className="max-w-6xl mx-auto p-2 mt-24 font-poppins">
//                 <div className="space-y-2">
//                     {cart.length > 0 ? cart.map((item) => (
//                         <div key={item._id} className="bg-white p-4 flex border-2 border-color: inherit rounded-lg h-auto">
//                             <img src={item.itemID.itemImage} alt={item.itemID.itemName} className="w-1/6 h-55 object-cover" />
//                             <div className="flex-1 flex justify-between gap-4">
//                                 <div className='flex flex-col items-start gap-4 pl-4'>
//                                     <h2 className="text-xl font-semibold">{item.itemID.itemName}</h2>
//                                     <h2 className="text-xl font-semibold">{item.itemID.owner}</h2>

//                                     <div className='flex flex-row items-start gap-4'>
//                                         <div className="flex-1 w-2/5 p-4 space-y-2">
//                                             <p className="text-customGray font-medium text-sm">
//                                                 Rental Price <span className="font-bold text-gray-800">NPR. {item.itemID.itemPrice}</span> for a week
//                                             </p>
//                                             <p className="text-gray-600 font-light text-xs">Security Deposit Rs. {item.itemID.itemSecurityDeposit}</p>
//                                         </div>
//                                         <div>
//                                             <p className="text-sm">
//                                                 Rental Date:<br />{new Date(item.deliveryDate).toLocaleDateString()}</p>
//                                         </div>
//                                         <div>
//                                             <p className="text-sm">Return Date: <br /> {new Date(item.returnDate).toLocaleDateString()}</p>
//                                         </div>
//                                         <div>
//                                             <p className="text-sm font-semibold">Total Price:<br /> NPR. {item.totalPrice}</p>
//                                         </div>
//                                     </div>

//                                     <div className="flex items-center space-x-2">
//                                         <button onClick={() => handleQuantityChange(item._id, Math.max(1, item.cartQuantity - 1))} className="addQuantity">-</button>
//                                         <span>{item.cartQuantity}</span>
//                                         <button onClick={() => handleQuantityChange(item._id, item.cartQuantity + 1)} className="subQuantity">+</button>
//                                     </div>

//                                     <a href={`/itemdetails/${item.itemID._id}`} className="text-blue-500 mt-2 inline-block font-medium text-xs">View details</a>
//                                 </div>
//                                 <div className="flex flex-col items-center justify-center space-y-2 gap-4">
//                                     <button
//                                         onClick={() => handleDelete(item._id)}
//                                         className="flex items-center justify-center w-full p-2 rounded"
//                                         style={{ backgroundColor: "#F7FAFC", border: "1.5px solid #DEE2E7" }}>
//                                         {/* <TrashIcon className="w-4 h-4 text-red-500" /> */}
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     )) : (
//                         <p>Your cart is empty.</p>
//                     )}
//                 </div>
//             </div>
//             <div className="max-w-xs mx-auto justify-content: flex-end bg-white p-6 rounded-lg shadow-md font-poppins">
//                 <h2 className="text-center text-xl font-semibold mb-4">TOTALS</h2>
//                 <div className="space-y-2">
//                     <div className="flex justify-between">
//                         <span>SUBTOTAL</span>
//                         <span>Rs. {calculateSubtotal()}</span>
//                     </div>
//                     <div className="flex justify-between">
//                         <span>SECURITY DEPOSIT</span>
//                         <span>Rs. {calculateSecurityDeposit()}</span>
//                     </div>
//                     <div className="flex justify-between">
//                         <span>DELIVERY CHARGE</span>
//                         <span>Rs. {calculateDeliveryCharge()}</span>
//                     </div>
//                     <hr />
//                     <div className="flex justify-between font-bold">
//                         <span>TOTAL</span>
//                         <span>Rs. {calculateSubtotal() + calculateSecurityDeposit() + calculateDeliveryCharge()}</span>
//                     </div>
//                     <button className="w-full bg-blue-500 text-white py-2 rounded mt-4"><a href='/shippingForm'>Proceed to reservation form</a></button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AddToCart;
import Navbar from "../components/Navbar";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCartByUserIDApi, removeFromCartApi, updateCartApi } from '../apis/Api';
import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';
import "../style/addToCart.css";
import { BiDirections } from "react-icons/bi";

const AddToCart = () => {
    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem("user"));
    const [cart, setCart] = useState([]);

    useEffect(() => {
        if (user && user._id) {
            getCartByUserIDApi(user._id)
                .then((res) => {
                    console.log('Cart Response:', res);
                    setCart(res.data.cart);
                })
                .catch(err => {
                    toast.error("Server Error");
                    console.log('Error fetching cart data:', err);
                });
        } else {
            toast.error("User not found in localStorage");
        }
    }, [user && user._id]);

    const handleQuantityChange = (itemId, newQuantity) => {
        const updatedCart = cart.map(item => {
            if (item._id === itemId) {
                const rentalPrice = item.itemID.itemPrice;
               

                const newTotalPrice = (parseFloat(rentalPrice) * newQuantity);

                updateCartApi(itemId, { ...item, cartQuantity: newQuantity, totalPrice: newTotalPrice.toFixed(2) })
                    .then((res) => {
                        if (res.data.success) {
                            // toast.success("Quantity updated successfully");
                        } else {
                            toast.error(res.data.message);
                        }
                    })
                    .catch(err => {
                        toast.error("Server Error");
                        console.log('Error updating cart data:', err);
                    });

                return { ...item, cartQuantity: newQuantity, totalPrice: newTotalPrice.toFixed(2) };
            }
            return item;
        });

        setCart(updatedCart);
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
    const calculateTotal = () => {
        const subtotal = calculateSubtotal();
        const securityDeposit = calculateSecurityDeposit();
        const deliveryCharge = calculateDeliveryCharge();
        return subtotal + securityDeposit + deliveryCharge;
    };
    return (
        <>
      
        <Navbar/>
        <div className="add-cart">
        <h1 className="cart-title">Cart</h1>
        <div className="cart-container">
       
        <div className="cart-items">
    {cart.length > 0 ? cart.map((item) => (
        <div key={item._id} className="cart-item" style={{ marginBottom: '1rem' }}>
            <img src={item.itemID.itemImage} alt={item.itemID.itemName} className="cart-item-image" />

            <div className="cart-item-details" style={{ marginLeft: '2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span className="cart-item-name">{item.itemID.itemName}</span>
                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '0.5rem' }}>
                        <span className="cart-item-owner">Item Price: Rs.{item.itemID.itemPrice}</span>
                        <span className="cart-item-owner">Security Deposit: Rs.{item.itemID.itemSecurityDeposit}</span>
                        <span className="cart-item-owner">{item.itemID.owner}</span>
                    </div>
                </div>

                <div className="cart-item-price" style={{ display: 'flex', flexDirection: 'column', marginTop: '1rem' }}>
                    <div>
                        <button onClick={() => handleQuantityChange(item._id, Math.max(1, item.cartQuantity - 1))} className="uantity-btn quantity-btn-large">-</button>
                        <span className="cart-item-quantity">{item.cartQuantity}</span>
                        <button onClick={() => handleQuantityChange(item._id, item.cartQuantity + 1)} className="uantity-btn quantity-btn-large">+</button>
                    </div>
                    <button onClick={() => handleDelete(item._id)} style={{ marginTop: '0.5rem',width:'40px',border:'none',background:'none' ,color:'#b93853'}}>
                <FaTrash
                        size={22}
                        style={{marginTop:'1rem' }}
            
                      />
                    </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', marginTop: '1rem' }}>
                    <span className="total-price">Rs. {item.totalPrice}</span>
                    <a style={{ color: 'grey', marginTop: '0.5rem', fontSize: '0.875rem' }} href={`/itemdetails/${item.itemID._id}`} className="inline-block font-medium text-xs">View details</a>
                </div>
            </div>
        </div>
    )) : <div></div>}
</div>
{cart.length === 0 ?(
     <div className="no-items-container">
     
     <div className="center-message" style={{ backgroundColor: 'white', width: '40%', padding: '50px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.805)', height: '250px', marginTop: '7%', marginLeft: '30%' }}>
       <h2 style={{ textAlign: 'center', color: '#9A5865' }}>No items Found</h2>
       <h5 style={{ textAlign: 'center', marginTop: '4%', color: '#9A5865' }}>
         We're sorry. We cannot find anything in cart.
       </h5>
     </div>
   </div>
):(
            <div className="cart-summary" style={{ maxWidth: '600px', width: '100%', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)', marginRight:'5%',marginBottom:'15%',marginTop:'2%' }}>
    <h2 style={{ fontWeight: 'normal', marginBottom: '10%' }} className="cart-title">Order Summary</h2>
    <div className="summary-details" style={{marginLeft:'5%'}}>
        <div style={{ marginBottom: '1.5rem' }}>
            <span style={{ marginRight: '1rem' }}>Subtotal ({cart.length} items):</span>
            <span style={{marginLeft:'31%', fontSize:'20px' }}>Rs. {calculateSubtotal().toFixed(2)}</span>
        </div>
        <div style={{ marginBottom: '1rem' }}>
            <span style={{ marginRight: '1.3rem' }}>Security Deposit:</span>
            <span span style={{ marginLeft:'35%',fontSize:'20px' }}>Rs. {calculateSecurityDeposit().toFixed(2)}</span>
        </div>
        <div style={{ marginBottom: '1rem' }}>
            <span style={{ marginRight: '1rem' }}>Delivery Charges:</span>
            <span span style={{ marginLeft:'35%',fontSize:'20px' }}>Rs. {calculateDeliveryCharge().toFixed(2)}</span>
        </div>
        <div style={{ marginBottom: '2rem',marginTop:'2rem' }}>
            <span style={{ marginRight: '1rem', fontWeight: 'bold', fontSize: '1.25rem' }}>Total:</span>
            <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>Rs. {calculateTotal().toFixed(2)}</span>
        </div>
    </div>
    <a href="/shippingForm" className="checkout-btn" style={{ display: 'block',marginLeft:'10%', width: '80%', background: '#ff5722', color: '#ffffff', padding: '0.75rem', borderRadius: '0.25rem', marginTop: '1rem', textAlign: 'center', textDecoration: 'none', fontWeight: 'bold' }}>PROCEED TO CHECKOUT ({cart.length})</a>
    <a href="/viewCategories" className="continue-shopping-btn" style={{ display: 'block',marginLeft:'10%', width: '80%', background: '#4299e1', color: '#ffffff', padding: '0.75rem', borderRadius: '0.25rem', marginTop: '1.5rem', textAlign: 'center', textDecoration: 'none', fontWeight: 'bold' }}>CONTINUE SHOPPING</a>
</div>
 )}

        </div>
        </div>
    </>
    );
};

export default AddToCart;
