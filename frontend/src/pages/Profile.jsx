import { faMailBulk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";


import ChangePassword from "./ChangePassword";
import "../style/profile.css";


import { updateUserAPi } from "../apis/Api";
import dummyPhoto from "../assets/Images/contact.png";
import Navbar from "../components/Navbar";


const UserProfile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    contactNumber: user.contactNumber,
    address: user.address,
    avatar: user.avatar,
  });

  const [editMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    address: ''
  });

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Validate the field that is being changed
    validateField(e.target.name, e.target.value);
  };

  const handlePhotoChange = async (e) => {
    try {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFormData({
          ...formData,
          avatar: reader.result,
        });
      };
    } catch (error) {
      console.error('Error updating user profile:', error.message);
      toast.error('Error updating profile');
    }
  };

  const validateField = (fieldName, value) => {
    let errorMessage = '';

    switch (fieldName) {
      case 'firstName':
        errorMessage = value.trim() ? '' : 'First Name is required';
        break;
      case 'lastName':
        errorMessage = value.trim() ? '' : 'Last Name is required';
        break;
      case 'contactNumber':
        errorMessage = /^\d{10}$/.test(value) ? '' : 'Contact Number must be 10 digits';
        break;
      case 'address':
        errorMessage = value.trim() ? '' : 'Address is required';
        break;
      default:
        break;
    }

    setErrors(prevErrors => ({
      ...prevErrors,
      [fieldName]: errorMessage,
    }));

    return errorMessage === '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields before submission
    const isFormValid = Object.keys(errors).every(field => validateField(field, formData[field]));

    if (!isFormValid) {
      toast.error('Please fill in all required fields correctly.');
      return;
    }

    try {
      const response = await updateUserAPi(user._id, formData);
      console.log('Profile updated successfully:', response.data);
      toast.success('Profile updated successfully');
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setUser(response.data.user);
      setEditMode(false); // Exit edit mode after saving
    } catch (error) {
      console.error('Error updating profile:', error.message);
      toast.error('Error updating profile');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid col-xxl-8 px-4 py-5 profilepage">
        <div className="background-img2 d-flex justify-content-center">
          <div className="profile-card">
            <h1 style={{ fontSize: "30px" }} className="profile-header">
              My Profile
            </h1>

            <div className="profile-content">
              <div className="left-content">
                <label htmlFor="avatarInput" className="profile-photo">
                  <img
                    src={formData.avatar || dummyPhoto}
                    alt="Profile"
                    className="profile-photo-image"
                  />
                </label>
                <input
                  id="avatarInput"
                  type="file"
                  onChange={handlePhotoChange}
                  accept="image/*"
                  style={{ display: "none" }}
                />
                <div className="user-info">
                  <h2>
                    {formData.firstName} {formData.lastName}
                  </h2>
                </div>
                {!editMode && (
                  <button
                    className="btn edit-button"
                    onClick={() => setEditMode(true)}
                  >
                    Edit
                  </button>
                )}
              </div>

              <div className="right-content">
                {!editMode ? (
                  <div className="profile-form">
                    <div className="form-group">
                      <label>First Name</label>
                      <input type="text" value={formData.firstName} readOnly />
                    </div>
                    <div className="form-group">
                      <label>Last Name</label>
                      <input type="text" value={formData.lastName} readOnly />
                    </div>
                    <div className="form-group">
                      <label>Contact Number</label>
                      <input
                        type="text"
                        value={formData.contactNumber}
                        readOnly
                      />
                    </div>
                    <div className="form-group">
                      <label>Address</label>
                      <input type="text" value={formData.address} readOnly />
                    </div>
                  </div>
                ) : (
                  <form className="profile-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label>First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={errors.firstName ? 'input-error' : ''}
                      />
                      {errors.firstName && <span className='error-message'>{errors.firstName}</span>}
                    </div>
                    <div className="form-group">
                      <label>Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={errors.lastName ? 'input-error' : ''}
                      />
                      {errors.lastName && <span className='error-message'>{errors.lastName}</span>}
                    </div>
                    <div className="form-group">
                      <label>Contact Number</label>
                      <input
                        type="text"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleInputChange}
                        className={errors.contactNumber ? 'input-error' : ''}
                      />
                      {errors.contactNumber && <span className='error-message'>{errors.contactNumber}</span>}
                    </div>
                    <div className="form-group">
                      <label>Address</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className={errors.address ? 'input-error' : ''}
                      />
                      {errors.address && <span className='error-message'>{errors.address}</span>}
                    </div>

                    <div className="btn-group">
                      <button type="submit" className="save-button">
                        Save
                      </button>
                      <button
                        type="button"
                        className="cancel-button"
                        onClick={() => setEditMode(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                <div className="email-info">
                  <h3>My Email Address</h3>
                  <div className="emails">
                    <h1 id="mail">
                      <FontAwesomeIcon
                        icon={faMailBulk}
                        style={{ color: "#9A5865", fontSize: "22px" }}
                      />
                    </h1>
                    <p>{formData.email}</p>
                  </div>
                </div>

                <ChangePassword />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
