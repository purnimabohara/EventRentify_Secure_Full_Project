import React, { useState } from 'react';
import { forgotPasswordApi } from '../apis/Api';
import { toast } from 'react-toastify';
import "./ForgotPassword.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import forget from "../assets/Images/forgetPassword.png";
import { Link} from 'react-router-dom';



const ForgetPassword = () => {
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');

  const handleForgotPasswordEmail = (e) => {
    setForgotPasswordEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: forgotPasswordEmail,
    };

    forgotPasswordApi(data)
      .then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message);
          setTimeout(() => {
            window.location.reload();
          }, 1100);// You can redirect the user to another page if needed
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error('Internal server error');
      });
  };

  return (
    <>
            <div style={{height:'80vh'}}className="container">
   
   <div className="content" style={{marginTop:'2%'}}>
     
     <div className="form-containerr">
     <h6><a href="/login" style={{color:'#985157',fontSize:'1.5rem', textDecoration:'none'}}>Back to Login</a></h6>
       <h2 style={{marginBottom:'4%',marginTop:'10%', fontWeight:'bolder'}}>Forgot Your Password?</h2>
       <p className='fp' style={{fontSize:'1.1rem',marginBottom:'8%'}}>Don’t worry, happens to all of us. Enter your email below to recover your password</p>
       <form onSubmit={handleSubmit}>
     
         <input onChange={handleForgotPasswordEmail} value={forgotPasswordEmail} type="email" placeholder="Email" />

        
         <button className='buttonn' type="submit" style={{fontSize:'20px',marginTop:'10%'}}>Send Confirmation Mail</button>
       </form>
     
     </div>
     <div className="image-containerr">
     <img style={{marginLeft:'15%'}} src={forget} alt="Eventique" />
     </div>
   </div>
 </div>


    </>
  );
};

export default ForgetPassword;
