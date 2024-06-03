import React, { useState } from 'react';
import { toast } from 'react-toastify';
// import { changePasswordApi } from "../apis/Api";
import "../style/bookingForm.css";
import Navbar from '../components/Navbar';
const BookingForm = () => {
  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
    <Navbar />

    <div className='booking-item'>
   
    <div className="container-booking">
      
   
    <div className="reservation-form">
    <h2 style={{marginBottom:'0',paddingTop:'3%',textAlign:'center'}}>Complete Your Reservation</h2>
      <form className="form-booking">
        <label className="label-booking">Full Name</label>
        <input className="input-booking" type="text" placeholder="Your First Name" />
       
        <label className="label-booking">Address</label>
        <input className="input-booking"  type="text" placeholder="Your address" />
        <label className="label-booking">Contact number</label>
        <input className="input-booking"  type="text" placeholder="Your phone number" />
        <label className="label-booking">Pick-up date</label>
        <input className="input-booking"  type="date" />
        <label className="label-booking">Return date</label>
        <input className="input-booking"  type="date" />
        <label className="label-booking">Specific requirements</label>
        <input className="input-booking"  type="text" placeholder="Your preferences" />
      </form>
      <div className="infos">
        <p style={{fontWeight:'bold',fontSize:'19px'}}>Information you need to know</p>
        <p className="infos-link" onClick={handleModal}>Cancellation Policy</p>
        <p className="infos-link">Return Policy</p>
      </div>
    </div>

    <div className="summary">
      <div className="item-booking">
        <img src="rose-garland.jpg" alt="img" />
        <h5>Rose garland</h5>
        <p>Rs.560</p>
      </div>
      <div className="item-booking">
        <img src="candle-stands.jpg" alt="img" />
        <h5>Candle stands</h5>
        <p>Rs.340</p>
      </div>
      <div className="item-booking">
        <img src="table-pieces.jpg" alt="img" />
        <h5>Table pieces</h5>
        <p>Rs.700</p>
      </div>
      <div className="total">
        <p>Total</p>
        <p>Rs.1600</p>
      </div>
      <button className="submit-booking">Submit</button>
    </div>

    {showModal && (
      <div className="modal-booking">
        <div className="modal-content">
          <h3>Cancellation Policy Agreement</h3>
          <ul>
            <li>1. Cancellation Time-frames and Fees:</li>
            <ul>
              <li>30+ days before event: Full refund, minus $50 processing fee.</li>
              <li>15-29 days before event: 50% refund.</li>
              <li>1-14 days before event: No refund.</li>
              <li>Same day of event: No refund.</li>
            </ul>
            <li>2. Non-Refundable Items:</li>
            <ul>
              <li>Custom orders, special request items, and delivery/setup fees are non-refundable.</li>
            </ul>
            <li>3. Refund Process:</li>
            <ul>
              <li>Refunds processed within 14 business days to the original payment method.</li>
            </ul>
            <li>4. Changes to Orders:</li>
            <ul>
              <li>Changes must be requested at least 14 days before the event. Additional charges may apply.</li>
            </ul>
            <li>5. Force Majeure:</li>
            <ul>
              <li> Cancellations due to unforeseen circumstances will be assessed individually. Possible full/partial refund or future credit.</li>
            </ul>
          </ul>
          <div className="modal-footer">
            <input className='input-booking' type="checkbox" id="agree" name="agree" />
            <label className='label-booking' htmlFor="agree">By signing, I acknowledge that I have read, understood, and agree to the Cancellation Policy.</label>
            <button onClick={handleModal}>Agreed</button>
          </div>
        </div>
      </div>
    )}
  </div>
  </div>
  </>
);
};
  
export default BookingForm;