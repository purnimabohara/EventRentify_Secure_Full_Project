// import React,{useState} from 'react'
// import Navbar from "../components/Navbar";
// import { loginUserApi } from '../apis/Api';
// import { toast } from 'react-toastify';
// import { Link, useNavigate } from 'react-router-dom';
// import hero1 from "../assets/Images/register1.png";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {  faUser } from "@fortawesome/free-solid-svg-icons";


// import "../style/login.css";


// const Login = () => {
//   //useState(Setting input value)

//   const [email,setEmail]= useState('')
//   const [password,setPassword]= useState('')

 
//   const navigate = useNavigate();
  

  
//   //function for button
//   const handleSubmit = (e) => {
//     e.preventDefault();
  
//     // Making json data object
//     const data = {
//       email: email,
//       password: password
//     };
  
//     loginUserApi(data)
//       .then((res) => {
//         if (res.data.success) {
//           toast.success(res.data.message);
  
//           // Set token and user data in local storage
//           localStorage.setItem('token', res.data.token);
//           localStorage.setItem('user', JSON.stringify(res.data.userData));
  
//       //     // Redirect to home page
//       //     navigate("/");
//       //   } else {
//       //     toast.error(res.data.message);
//       //   }
//       // })
//         // Check if user is admin
//         const isAdmin = res.data.userData.isAdmin;

//         // Redirect based on isAdmin flag
//         if (isAdmin) {
//           // Redirect to admin page
//           navigate("/admin/admindash");
//         } else {
//           // Redirect to home page
//           navigate("/");
//         }
//       } else {
//         toast.error(res.data.message);
//       }
//     })
//       .catch((err) => {
//         if (err.response) {
//           // Server responded with an error status code
//           toast.error(err.response.data.message || "Error logging in.");
//         } else if (err.request) {
//           // Request made but no response received
//           toast.error("No response received from server.");
//         } else {
//           // Something happened in setting up the request
//           toast.error("Error logging in. Please try again later.");
//         }
//       });
//   };
  
//   const handleForgetPassword = () => {
//     navigate("/forget-password");
//   };



//   return (
//     <>
//      <Navbar/>
   

//         <div className="container">
   
//    <div className="content">
//      <div className="image-containerr">
//      <img src={hero1} alt="Eventique" />
//      </div>
//      <div className="form-container">
//        <h2 style={{marginBottom:'6%',marginTop:'2%', fontWeight:'bolder'}}>Login to your account</h2>
//        <form>
     
//          <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
//          <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
//          <button  style={{border:'none', backgroundColor:'none'}}onClick={handleForgetPassword}  className="forgetPassword">Forget Password?</button>
        
//          <button className='buttonn'onClick={handleSubmit} type="submit" style={{fontSize:'20px'}}>Login</button>
//        </form>
//        <div className="line" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center',marginTop:'4%' }}>
//                  <div style={{ backgroundColor: '#CD8F68', height: '1px', width: '330px' }}></div>
//                  <span style={{  color: '#CD8F68', fontSize: '17px' }}>Or</span>
//                  <div style={{ backgroundColor: '#CD8F68', height: '1px', width: '330px' }}></div>
//              </div>

//        <div className="existing-user">
//          Don't have an account? <a href="/register" style={{color:'#985157',fontWeight:'bold', textDecoration:'none'}}>Sign Up</a>
//        </div>
     
     
//      </div>
//    </div>
//  </div>
//     </>
//   );
  
  
  
  
  
  
  
// }


// export default Login

import React, { useState } from 'react';
import Navbar from "../components/Navbar";
import { loginUserApi } from '../apis/Api';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import hero1 from "../assets/Images/register1.png";
import "../style/login.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const data = { email, password };

    loginUserApi(data)
      .then((res) => {
        if (res.data.success) {
          // Check if password has expired
          if (res.data.passwordExpired) {
            toast.error("Your password has expired. Please change your password.");
            
            return;
          }

          toast.success(res.data.message);
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user', JSON.stringify(res.data.userData));

          const isAdmin = res.data.userData.isAdmin;
          if (isAdmin) {
            navigate("/admin/admindash");
          } else {
            navigate("/");
          }
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data.message || "Error logging in.");
        } else if (err.request) {
          toast.error("No response received from server.");
        } else {
          toast.error("Error logging in. Please try again later.");
        }
      });
  };

  const handleForgetPassword = () => {
    navigate("/forget-password");
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="content">
          <div className="image-containerr">
            <img src={hero1} alt="Eventique" />
          </div>
          <div className="form-container">
            <h2 style={{ marginBottom: '6%', marginTop: '2%', fontWeight: 'bolder' }}>Login to your account</h2>
            <form>
              <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
              <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
              <button style={{ border: 'none', backgroundColor: 'none' }} onClick={handleForgetPassword} className="forgetPassword">Forget Password?</button>
              <button className='buttonn' onClick={handleSubmit} type="submit" style={{ fontSize: '20px' }}>Login</button>
            </form>
            <div className="line" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '4%' }}>
              <div style={{ backgroundColor: '#CD8F68', height: '1px', width: '330px' }}></div>
              <span style={{ color: '#CD8F68', fontSize: '17px' }}>Or</span>
              <div style={{ backgroundColor: '#CD8F68', height: '1px', width: '330px' }}></div>
            </div>
            <div className="existing-user">
              Don't have an account? <a href="/register" style={{ color: '#985157', fontWeight: 'bold', textDecoration: 'none' }}>Sign Up</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
