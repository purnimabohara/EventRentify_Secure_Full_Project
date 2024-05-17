// import React, { useState } from 'react';
// import { createUserApi, testApi } from '../apis/Api';
// import Navbar from "../components/Navbar";
// import { toast } from 'react-toastify';
// import { Link } from 'react-router-dom';
// import hero1 from "../assets/Images/register1.png";
// import "../style/login.css";

// const Register = () => {
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [contactNumber, setContactNumber] = useState('');
//   const [address, setAddress] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const [errors, setErrors] = useState({});

//   const handleChange = (field, e) => {
//     const value = e.target.value;  // Access the value from the event object
//     const updateError = { ...errors };
//     delete updateError[field];
//     setErrors(updateError);

//     switch (field) {
//       case 'firstName':
//         setFirstName(value);
//         break;
//       case 'lastName':
//         setLastName(value);
//         break;
//       case 'email':
//         setEmail(value);
//         break;
//       case 'contactNumber':
//         setContactNumber(value);
//         break;
//       case 'address':
//         setAddress(value);
//         break;
//       case 'password':
//         handlePasswordChange(e); // Pass the event object to handlePasswordChange
//         break;
//       case 'confirmPassword':
//         setConfirmPassword(value);
//         break;
//       default:
//         break;
//     }
//   };

//   const handlePasswordChange = (e) => {
//     const newPassword = e.target.value;
//     setPassword(newPassword);

//     if (newPassword.length < 8 || newPassword.length > 12) {
//       setErrors(prevErrors => ({
//         ...prevErrors,
//         password: "Password must be between 8 to 12 characters long."
//       }));
//     } else {
//       setErrors(prevErrors => {
//         const { password, ...rest } = prevErrors;
//         return rest;
//       });
//     }
//   };

//   const validate = () => {
//     const errors = {};
//     const nameRegex = /^[A-Z][a-zA-Z]*$/;
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const passwordRegex = /^(?=.*[!@#$%^&*])/;

//     if (!firstName) {
//       errors.firstName = "First name is required.";
//     } else if (!firstName.match(nameRegex)) {
//       errors.firstName = "First name must start with a capital letter and contain only letters.";
//     }

//     if (!lastName) {
//       errors.lastName = "Last name is required.";
//     } else if (!lastName.match(nameRegex)) {
//       errors.lastName = "Last name must start with a capital letter and contain only letters.";
//     }

//     if (!email) {
//       errors.email = "Email is required.";
//     } else if (!email.match(emailRegex)) {
//       errors.email = "Invalid email format.";
//     }

//     if (!contactNumber) {
//       errors.contactNumber = "Phone number is required.";
//     } else if (contactNumber.length !== 10 || isNaN(contactNumber)) {
//       errors.contactNumber = "Phone number must be 10 digits.";
//     }

//     if (!address) {
//       errors.address = "Address is required.";
//     }

//     if (!password) {
//       errors.password = "Password is required.";
//     } else if (password.length < 8 || password.length > 12) {
//       errors.password = "Password must be between 8 to 12 characters long.";
//     } else if (!password.match(passwordRegex)) {
//       errors.password = "Password must contain at least 1 special character.";
//     }

//     if (!confirmPassword) {
//       errors.confirmPassword = "Confirm password is required.";
//     } else if (password !== confirmPassword) {
//       errors.confirmPassword = "Passwords do not match.";
//     }

//     setErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!validate()) {
//       toast.error("Please enter all fields correctly.");
//       return;
//     }

//     const data = {
//       firstName,
//       lastName,
//       email,
//       contactNumber,
//       address,
//       password,
//       confirmPassword
//     };

//     createUserApi(data).then((res) => {
//       if (res.data.success === false) {
//         toast.error(res.data.message);
//       } else {
//         toast.success(res.data.message);
//         setTimeout(() => {
//           window.location.reload();
//         }, 1100);
//       }
//     }).catch(err => {
//       toast.error("Server Error");
//       console.log(err.message);
//     });

//     testApi().then((res) => {
//       console.log(res.data);
//     });
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="container">
//         <div className="content">
//           <div className="image-containerr">
//             <img src={hero1} alt="Eventique" />
//           </div>
//           <div className="form-container">
//             <h2 style={{ marginBottom: '6%', marginTop: '2%', fontWeight: 'bolder' }}>Create an account</h2>
//             <form>
//               <input onChange={(e) => handleChange('firstName', e)} type="text" placeholder="First Name" value={firstName} />
//               {errors.firstName && <div className="error" style={{ color: 'red' }}>{errors.firstName}</div>}

//               <input onChange={(e) => handleChange('lastName', e)} type="text" placeholder="Last Name" value={lastName} />
//               {errors.lastName && <div className="error" style={{ color: 'red' }}>{errors.lastName}</div>}

//               <input onChange={(e) => handleChange('email', e)} type="email" placeholder="Email" value={email} />
//               {errors.email && <div className="error" style={{ color: 'red' }}>{errors.email}</div>}

//               <input onChange={(e) => handleChange('contactNumber', e)} type="number" placeholder="Phone number" value={contactNumber} />
//               {errors.contactNumber && <div className="error" style={{ color: 'red' }}>{errors.contactNumber}</div>}

//               <input onChange={(e) => handleChange('address', e)} type="text" placeholder="Address" value={address} />
//               {errors.address && <div className="error" style={{ color: 'red' }}>{errors.address}</div>}

//               <input onChange={(e) => handleChange('password', e)} type="password" placeholder="Password" value={password} />
//               {errors.password && <div className="error" style={{ color: 'red' }}>{errors.password}</div>}

//               <input onChange={(e) => handleChange('confirmPassword', e)} type="password" placeholder="Confirm Password" value={confirmPassword} />
//               {errors.confirmPassword && <div className="error" style={{ color: 'red' }}>{errors.confirmPassword}</div>}

//               <button className='buttonn' onClick={handleSubmit} type="submit" style={{ fontSize: '20px' }}>Create account</button>
//             </form>
//             <div className="line" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '4%' }}>
//               <div style={{ backgroundColor: '#CD8F68', height: '1px', width: '330px' }}></div>
//               <span style={{ color: '#CD8F68', fontSize: '17px' }}>Or</span>
//               <div style={{ backgroundColor: '#CD8F68', height: '1px', width: '330px' }}></div>
//             </div>
//             <div className="existing-user">
//               Existing user? <Link to="/login" style={{ color: '#985157', fontWeight: 'bold', textDecoration: 'none' }}>Login</Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Register;

import React, { useState } from 'react';
import { createUserApi, checkPasswordStrengthApi ,testApi } from '../apis/Api'; // Import the new API function
import Navbar from "../components/Navbar";
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import hero1 from "../assets/Images/register1.png";
import "../style/login.css";

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({});
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field, e) => {
    const value = e.target.value;
    const updateError = { ...errors };
    delete updateError[field];
    setErrors(updateError);

    switch (field) {
      case 'firstName':
        setFirstName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'contactNumber':
        setContactNumber(value);
        break;
      case 'address':
        setAddress(value);
        break;
      case 'password':
        handlePasswordChange(e);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    let strength = 'Weak';
    let color = 'red';
    let percent = 33;
    if (newPassword.length >= 6 && /\d/.test(newPassword)) {
        strength = 'Medium';
        color = 'orange';
        percent = 66;
    }
    if (/[A-Z]/.test(newPassword) && /[!@#$%^&*]/.test(newPassword)) {
        strength = 'Strong';
        color = 'green';
        percent = 100;
    }
    setPasswordStrength({ strength, color, percent });
    if (newPassword.length < 8) {
        setErrors(prevErrors => ({
            ...prevErrors,
            password: "Password must be minimum characters long."
        }));
    } else {
        setErrors(prevErrors => {
            const { password, ...rest } = prevErrors;
            return rest;
        });
    }
};


  const validate = () => {
    const errors = {};
    const nameRegex = /^[A-Z][a-zA-Z]*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   

    if (!firstName) {
      errors.firstName = "First name is required.";
    } else if (!firstName.match(nameRegex)) {
      errors.firstName = "First name must start with a capital letter and contain only letters.";
    }

    if (!lastName) {
      errors.lastName = "Last name is required.";
    } else if (!lastName.match(nameRegex)) {
      errors.lastName = "Last name must start with a capital letter and contain only letters.";
    }

    if (!email) {
      errors.email = "Email is required.";
    } else if (!email.match(emailRegex)) {
      errors.email = "Invalid email format.";
    }

    if (!contactNumber) {
      errors.contactNumber = "Phone number is required.";
    } else if (contactNumber.length !== 10 || isNaN(contactNumber)) {
      errors.contactNumber = "Phone number must be 10 digits.";
    }

    if (!address) {
      errors.address = "Address is required.";
    }
    const passwordRegex = /^(?=.*[!@#$%^&*])/;

    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 8) {
      errors.password = "Password must be minimum 8 characters long.";
    } else if (!password.match(passwordRegex)) {
      errors.password = "Password must contain at least 1 special character.";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Confirm password is required.";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please enter all fields correctly.");
      return;
    }

    const data = {
      firstName,
      lastName,
      email,
      contactNumber,
      address,
      password,
      confirmPassword
    };

    createUserApi(data).then((res) => {
      if (res.data.success === false) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 1100);
      }
    }).catch(err => {
      toast.error("Server Error");
      console.log(err.message);
    });
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
            <h2 style={{ marginBottom: '6%', marginTop: '2%', fontWeight: 'bolder' }}>Create an account</h2>
            <form>
              <input onChange={(e) => handleChange('firstName', e)} type="text" placeholder="First Name" value={firstName} />
              {errors.firstName && <div className="error" style={{ color: 'red' }}>{errors.firstName}</div>}

              <input onChange={(e) => handleChange('lastName', e)} type="text" placeholder="Last Name" value={lastName} />
              {errors.lastName && <div className="error" style={{ color: 'red' }}>{errors.lastName}</div>}

              <input onChange={(e) => handleChange('email', e)} type="email" placeholder="Email" value={email} />
              {errors.email && <div className="error" style={{ color: 'red' }}>{errors.email}</div>}

              <input onChange={(e) => handleChange('contactNumber', e)} type="number" placeholder="Phone number" value={contactNumber} />
              {errors.contactNumber && <div className="error" style={{ color: 'red' }}>{errors.contactNumber}</div>}

              <input onChange={(e) => handleChange('address', e)} type="text" placeholder="Address" value={address} />
              {errors.address && <div className="error" style={{ color: 'red' }}>{errors.address}</div>}

<div style={{ position: 'relative' }}>
    <input onChange={(e) => handleChange('password', e)} type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} style={{ width: '100%' }} />
    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }} />

</div>
{errors.password && <div className="error" style={{ color: 'red' }}>{errors.password}</div>}
{/* Password strength indicator */}
{password && (
    <div style={{ marginTop: '10px' }}>
        <div style={{ height: '10px', width: '100%', backgroundColor: '#e0e0e0', borderRadius: '5px' }}>
            <div style={{ height: '100%', width: `${passwordStrength.percent}%`, backgroundColor: passwordStrength.color, borderRadius: '5px' }}></div>
        </div>
        <div style={{ color: passwordStrength.color }}>
            Password Strength: {passwordStrength.strength}
        </div>
    </div>
)}
              <input onChange={(e) => handleChange('confirmPassword', e)} type="password" placeholder="Confirm Password" value={confirmPassword} />
              {errors.confirmPassword && <div className="error" style={{ color: 'red' }}>{errors.confirmPassword}</div>}

              <button className='buttonn' onClick={handleSubmit} type="submit" style={{ fontSize: '20px' }}>Create account</button>
            </form>
            <div className="line" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '4%' }}>
              <div style={{ backgroundColor: '#CD8F68', height: '1px', width: '330px' }}></div>
              <span style={{ color: '#CD8F68', fontSize: '17px' }}>Or</span>
              <div style={{ backgroundColor: '#CD8F68', height: '1px', width: '330px' }}></div>
            </div>
            <div className="existing-user">
              Existing user? <Link to="/login" style={{ color: '#985157', fontWeight: 'bold', textDecoration: 'none' }}>Login</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;