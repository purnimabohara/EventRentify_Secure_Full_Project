


//2nd
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft} from 'react-icons/fa';
import Navbar from "../components/Navbar";
import { createShippingInfoApi } from '../apis/Api';
import "../style/shippingInfo.css";

import { toast } from 'react-toastify';

const ShippingInfo = () => {
    const [showModal, setShowModal] = useState(false);
    const [showReturnPolicyModal, setShowReturnPolicyModal] = useState(false);
    const [policy1Agreed, setPolicy1Agreed] = useState(false);
    const [policy2Agreed, setPolicy2Agreed] = useState(false);

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [pickUpDate, setPickUpDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [specificRequirements, setSpecificRequirements] = useState('');

    const changeFirstName = (e) => {
        setFirstName(e.target.value);
    };
    const changeLastName = (e) => {
        setLastName(e.target.value);
    };
    const changeContactNumber = (e) => {
        setContactNumber(e.target.value);
    };
    const changeCity = (e) => {
        setCity(e.target.value);
    };
    const changeAddress = (e) => {
        setAddress(e.target.value);
    };
    const changeSpecificRequirements = (e) => {
        setSpecificRequirements(e.target.value);
    };

  // Handle Checkout Function
const handleCheckout = (e) => {
    e.preventDefault();
    

    // Validate if all fields are filled
    if (!firstName || !lastName || !contactNumber || !city || !address || !pickUpDate || !returnDate) {
        toast.error('Please fill in all fields.');
        return;
    }

    // Check if both policy agreements are agreed upon
    if (!policy1Agreed || !policy2Agreed) {
        toast.warning('Please agree to both policies before proceeding to checkout.');
        return;
    }

    const formData = {
        userID: user._id,
        firstName,
        lastName,
        contactNumber,
        city,
        address,
        pickUpDate,
        returnDate,
        specificRequirements,
        policyAgreement1: policy1Agreed,
        policyAgreement2: policy2Agreed,
    };

    createShippingInfoApi(formData)
        .then((res) => {
            if (res.data.success === false) {
                toast.error(res.data.message);
            } else {
                toast.success('Shipping information saved successfully!');

                // Get the ID of the newly created shipping info
                const newShippingInfoId = res.data.data._id;

                // Save the new shipping info ID to local storage
                localStorage.setItem("newShippingInfoId", newShippingInfoId);

                // Redirect to the review page with the new shipping info ID
                setTimeout(() => {
                    navigate("/review", {
                        state: {
                            cart: JSON.parse(localStorage.getItem("cart")),  // Pass the cart data to the ReviewPage
                            subtotal: JSON.parse(localStorage.getItem("subtotal")),
                            securityDeposit: JSON.parse(localStorage.getItem("securityDeposit")),
                            deliveryCharge: JSON.parse(localStorage.getItem("deliveryCharge")),
                            total: JSON.parse(localStorage.getItem("total")),
                            newShippingInfoId: newShippingInfoId  // Pass the new shipping info ID to ReviewPage
                        }
                    });
                }, 1100); // Redirect to review page after successful submission
            }
        })
        .catch((err) => {
            toast.error('Server Error');
            console.log(err.message);
        });
};
    
    

    const handleModal = () => {
        setShowModal(!showModal);
    };

    const handleReturnPolicyModal = () => {
        setShowReturnPolicyModal(!showReturnPolicyModal);
    };

    // const handlePolicy1Agree = () => {
    //     setPolicy1Agreed(true);
    //     setShowModal(false);
    //     toast.info("Thank you for agreeing to the cancellation policy");
    // };

    // const handlePolicy2Agree = () => {
    //     setPolicy2Agreed(true);
    //     setShowReturnPolicyModal(false);
    //     toast.info("Thank you for agreeing to the return policy");
    // };
    const handlePolicy1Agree = () => {
        if (policy1Agreed) {
            setShowModal(false);
            toast.warning("You have already agreed to the cancellation policy.");
        } else {
            setPolicy1Agreed(true);
            setShowModal(false);
            toast.info("Thank you for agreeing to the cancellation policy");
        }
    };
    
    const handlePolicy2Agree = () => {
        if (policy2Agreed) {
            setShowReturnPolicyModal(false);
            toast.warning("You have already agreed to the return policy.");
        } else {
            setPolicy2Agreed(true);
            setShowReturnPolicyModal(false);
            toast.info("Thank you for agreeing to the return policy");
        }
    };

    const handlePickUpDateChange = (e) => {
        const selectedDate = new Date(e.target.value);
        const today = new Date().setHours(0, 0, 0, 0);

        if (selectedDate.getTime() >= today) {
            const returnDate = new Date(selectedDate);
            returnDate.setDate(selectedDate.getDate() + 7);

            setPickUpDate(selectedDate.toISOString().split('T')[0]);
            setReturnDate(returnDate.toISOString().split('T')[0]);
        } else {
            toast.error('Cannot select past dates.');
        }
    };

    return (
        
        <>
        <Navbar/>
        <div className='booking-item'>
      <div className='container-booking'>
        <div className='reservation-form'>
          <h2 style={{ marginBottom: '2%', paddingTop: '0', textAlign: 'center' }}>Complete Your Reservation</h2>
          <form className='form-booking'>
            <label className='label-booking'>Full Name</label>
            <input
              className='input-booking'
              type='text'
              placeholder='Your First Name'
              value={firstName}
              onChange={changeFirstName}
            />

            <label className='label-booking'>Last Name</label>
            <input
              className='input-booking'
              type='text'
              placeholder='Your Last Name'
              value={lastName}
              onChange={changeLastName}
            />

            <label className='label-booking'>Contact Number</label>
            <input
              className='input-booking'
              type='text'
              placeholder='Your Phone Number'
              value={contactNumber}
              onChange={changeContactNumber}
            />

            <label className='label-booking'>City</label>
            <select className='input-booking' value={city} onChange={changeCity}>
              <option style={{color:'#5c5b5b'}} value=''>Select City</option>
              <option value='Kathmandu'>Kathmandu</option>
              <option value='Lalitpur'>Lalitpur</option>
              <option value='Bhaktapur'>Bhaktapur</option>
            </select>

            <label className='label-booking'>Address</label>
            <input
              className='input-booking'
              type='text'
              placeholder='Your Address'
              value={address}
              onChange={changeAddress}
            />

            <label className='label-booking'>Pick-up Date</label>
            <input
              className='input-booking'
              type='date'
              value={pickUpDate}
              onChange={handlePickUpDateChange}
            />

            <label className='label-booking'>Return Date</label>
            <input
              className='input-booking'
              type='date'
              value={returnDate}
              readOnly
            />

            <label className='label-booking'>Specific Requirements</label>
            <input
              className='input-booking'
              type='text'
              placeholder='Your Preferences'
              value={specificRequirements}
              onChange={changeSpecificRequirements}
            />

            
            <div className='infos-policy'>
            <p style={{ fontWeight: 'bold', fontSize: '20px',marginBottom:'2%' }}>Information you need to know</p>
            <p className='infos-link' onClick={handleModal}>
            <FaArrowLeft
                        size={18}
                        style={{marginRight:'1%'}}
            
                      />Cancellation Policy
            </p>
            <p className='infos-link' onClick={handleReturnPolicyModal}>
            <FaArrowLeft
                        size={18}
            style={{ marginRight:'1%' ,fontWeight:'normal'}}
                      />Return Policy
            </p>
          </div>
          <div className='flex-checkout'>
              <button
                type='button'
                onClick={handleCheckout}
                className='checkout-button'
              >
                Checkout
              </button>
            </div>
          </form>

         
        </div>
      </div>

      {showModal && (
        <div className='modal-booking'>
        <div className='modal-content'>
          <h3 className='modal-header'>Cancellation Policy Agreement</h3>
          <ul className='policy-list'>
            <li>
              <strong style={{color:'#9A5865'}}>1. Cancellation Time-frames and Fees:</strong>
              <ul>
                <li>30+ days before event: Full refund, minus $50 processing fee.</li>
                <li>15-29 days before event: 50% refund.</li>
                <li>1-14 days before event: No refund.</li>
                <li>Same day of event: No refund.</li>
              </ul>
            </li>
            <li>
              <strong style={{color:'#9A5865'}}>2. Non-Refundable Items:</strong>
              <ul>
                <li>Custom orders, special request items, and delivery/setup fees are non-refundable.</li>
              </ul>
            </li>
            <li>
              <strong style={{color:'#9A5865'}}>3. Refund Process:</strong>
              <ul>
                <li>Refunds processed within 14 business days to the original payment method.</li>
              </ul>
            </li>
            <li>
              <strong style={{color:'#9A5865'}}>4. Changes to Orders:</strong>
              <ul>
                <li>Changes must be requested at least 14 days before the event. Additional charges may apply.</li>
              </ul>
            </li>
            <li>
              <strong style={{color:'#9A5865',marginTop:'10%'}}>5. Force Majeure:</strong>
              <ul>
                <li>
                  Cancellations due to unforeseen circumstances will be assessed individually. Possible full/partial refund or future credit.
                </li>
              </ul>
            </li>
          </ul>
          
          <button className='policy-button' onClick={handlePolicy1Agree}>Agreed</button>
        </div>
      </div>
      )}

      {showReturnPolicyModal && (
        <div className='modal-booking'>
          <div className='modal-content-return'>
            <h3 className='modal-header'>Return Policy Agreement</h3>
            <ul className='policy-list'>
              <li>
                <strong style={{color:'#9A5865'}}>1. Return Time-frames and Fees:</strong>
              <ul>
                <li>30+ days after purchase: Full refund, minus $20 processing fee.</li>
                <li>15-29 days after purchase: 50% refund.</li>
                <li>1-14 days after purchase: No refund.</li>
              </ul>
              </li>

              <li>
              <strong style={{color:'#9A5865'}}> 2. Condition of Returned Items:</strong>
              <ul>
                <li>Items must be in original condition and packaging.</li>
                <li>Damaged or used items may not be eligible for return.</li>
              </ul>
              </li>
              <li>
              <strong style={{color:'#9A5865'}}> 3. Refund Process:</strong>
              <ul>
                <li>Refunds processed within 14 business days to the original payment method.</li>
              </ul>
              </li>
              <li>
              <strong style={{color:'#9A5865'}}> 4.Damage:</strong>
              <ul>
                <li>Customers are responsible for any damage or loss of items.</li>
               <li> Repair or replacement costs will be charged to the customer.</li>
              </ul>
              </li>
            </ul>
            <button className='policy-return-button' onClick={handlePolicy2Agree}>Agreed</button>
          </div>
        </div>
      )}
    </div>
    </>
    );
};

export default ShippingInfo;
