// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { submitRequest } from "../apis/Api";
// import Footer from "../components/Footer";
// import Navbar from "../components/Navbar";
// import "../style/contact.css";

// const ContactPage = () => {
//   const [user, setUser] = useState(null);
//   const [productName, setProductName] = useState("");
//   const [price, setPrice] = useState("");
//   const [size, setSize] = useState("");
//   const [material, setMaterial] = useState("");
//   const [colour, setColour] = useState("");
//   const [weight, setWeight] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [phone, setPhone] = useState("");
//   const [productImage, setProductImage] = useState(null);
//   const [previewImage, setPreviewImage] = useState(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const userData = localStorage.getItem("user");

//     console.log("Token:", token); // Debugging statement
//     console.log("User Data:", userData); // Debugging statement

//     setIsLoggedIn(!!token); // Set isLoggedIn to true if token exists
//     if (userData) {
//       setUser(JSON.parse(userData)); // Parse and set user data
//     }
//   }, []);

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     setProductImage(file);
//     setPreviewImage(URL.createObjectURL(file));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     console.log("isLoggedIn:", isLoggedIn); // Debugging statement

//     if (!isLoggedIn) {
//       toast.error("Please log in first");
//       navigate("/login");
//       return;
//     }

//     // Check if all fields are filled
//     if (
//       !productName ||
//       !price ||
//       !phone ||
//       !size ||
//       !material ||
//       !colour ||
//       !weight ||
//       !quantity ||
//       !productImage
//     ) {
//       toast.error("Please fill out all fields.");
//       return;
//     }

//     console.log(
//       productName,
//       phone,
//       size,
//       material,
//       colour,
//       weight,
//       quantity,
//       price,
//       productImage
//     );

//     // Constructing FormData
//     const formData = new FormData();
//     formData.append("userName", `${user.firstName} ${user.lastName}`);
//     formData.append("productName", productName);
//     formData.append("phone", phone);
//     formData.append("size", size);
//     formData.append("material", material);
//     formData.append("colour", colour);
//     formData.append("weight", weight);
//     formData.append("price", price);
//     formData.append("quantity", quantity);
//     formData.append("productImage", productImage);

//     // API call
//     submitRequest(formData)
//       .then((res) => {
//         if (res.data.success === false) {
//           toast.error(res.data.message);
//         } else {
//           toast.success(res.data.message);
//           setTimeout(() => {
//             window.location.reload();
//           }, 1000); // Delay to ensure the toast message is shown
//         }
//       })
//       .catch((err) => {
//         console.log(err.message);
//       });
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="whole">
//         <div className="background-images"></div>
//         <div className="contact-sections">
//           <div className="details-container">
//             <h2>Rent your product</h2>
//             <h6>
//               Questions, comments, or suggestions?
//               <br /> Simply fill in the form and we'll be in touch shortly.
//             </h6>
//             <p>1055 Arthur ave Elk Groot, 67. New Palmas South Carolina.</p>
//             <p>+1 234 678 9108 39</p>
//             <p>Eventique@morailzer.com</p>
//           </div>
//           <div className="form-containerr">
//             <h2>Become renter</h2>
//             <form>
//               <input
//                 type="text"
//                 value={productName}
//                 onChange={(e) => setProductName(e.target.value)}
//                 required
//                 placeholder="Name of the product"
//               />
//               <input
//                 type="number"
//                 value={price}
//                 onChange={(e) => setPrice(e.target.value)}
//                 required
//                 placeholder="Estimated price in Rs"
//               />
//               <input
//                 type="number"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 required
//                 placeholder="Phone number"
//               />
//               <input
//                 type="number"
//                 value={quantity}
//                 onChange={(e) => setQuantity(e.target.value)}
//                 required
//                 placeholder="Quantity"
//               />
//               <input
//                 type="text"
//                 value={size}
//                 onChange={(e) => setSize(e.target.value)}
//                 required
//                 placeholder="e.g: 12h X 14w"
//               />
//               <input
//                 type="number"
//                 value={weight}
//                 onChange={(e) => setWeight(e.target.value)}
//                 required
//                 placeholder="Weight in kg"
//               />
//               <input
//                 type="text"
//                 value={colour}
//                 onChange={(e) => setColour(e.target.value)}
//                 required
//                 placeholder="Colour"
//               />
//               <input
//                 type="text"
//                 value={material}
//                 onChange={(e) => setMaterial(e.target.value)}
//                 required
//                 placeholder="Material"
//               />
//               <input
//                 onChange={handleImageUpload}
//                 type="file"
//                 required
//                 placeholder="Upload image"
//               ></input>
//               {previewImage && (
//                 <img
//                   src={previewImage}
//                   className="img-fluid rounded object-fit-cover"
//                   alt="product image"
//                 />
//               )}
//               <button type="submit" onClick={handleSubmit}>
//                 Send Request
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default ContactPage;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { submitRequest } from "../apis/Api";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../style/contact.css";

const ContactPage = () => {
  const [user, setUser] = useState(null);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [material, setMaterial] = useState("");
  const [colour, setColour] = useState("");
  const [weight, setWeight] = useState("");
  const [quantity, setQuantity] = useState("");
  const [phone, setPhone] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    console.log("Token:", token); // Debugging statement
    console.log("User Data:", userData); // Debugging statement

    setIsLoggedIn(!!token); // Set isLoggedIn to true if token exists
    if (userData) {
      setUser(JSON.parse(userData)); // Parse and set user data
    }
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (2MB limit)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        toast.error("File size exceeds 2MB limit");
        return;
      }

      // Check file type (only jpg, jpeg, png)
      const validTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!validTypes.includes(file.type)) {
        toast.error("File type not allowed");
        return;
      }

      setProductImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("isLoggedIn:", isLoggedIn); // Debugging statement

    if (!isLoggedIn) {
      toast.error("Please log in first");
      navigate("/login");
      return;
    }

    // Check if all fields are filled
    if (
      !productName ||
      !price ||
      !phone ||
      !size ||
      !material ||
      !colour ||
      !weight ||
      !quantity ||
      !productImage
    ) {
      toast.error("Please fill out all fields.");
      return;
    }

    console.log(
      productName,
      phone,
      size,
      material,
      colour,
      weight,
      quantity,
      price,
      productImage
    );

    // Constructing FormData
    const formData = new FormData();
    formData.append("userName", `${user.firstName} ${user.lastName}`);
    formData.append("productName", productName);
    formData.append("phone", phone);
    formData.append("size", size);
    formData.append("material", material);
    formData.append("colour", colour);
    formData.append("weight", weight);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("productImage", productImage);

    // API call
    submitRequest(formData)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          setTimeout(() => {
            window.location.reload();
          }, 1000); // Delay to ensure the toast message is shown
        }
      })
      .catch((err) => {
        console.log(err.message);
        toast.error("An error occurred. Please try again.");
      });
  };

  return (
    <>
      <Navbar />
      <div className="whole">
        <div className="background-images"></div>
        <div className="contact-sections">
          <div className="details-container">
            <h2>Rent your product</h2>
            <h6>
              Questions, comments, or suggestions?
              <br /> Simply fill in the form and we'll be in touch shortly.
            </h6>
            <p>1055 Arthur ave Elk Groot, 67. New Palmas South Carolina.</p>
            <p>+1 234 678 9108 39</p>
            <p>Eventique@morailzer.com</p>
          </div>
          <div className="form-containerr">
            <h2>Become renter</h2>
            <form>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
                placeholder="Name of the product"
              />
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                placeholder="Estimated price in Rs"
              />
              <input
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="Phone number"
              />
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                placeholder="Quantity"
              />
              <input
                type="text"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                required
                placeholder="e.g: 12h X 14w"
              />
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
                placeholder="Weight in kg"
              />
              <input
                type="text"
                value={colour}
                onChange={(e) => setColour(e.target.value)}
                required
                placeholder="Colour"
              />
              <input
                type="text"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                required
                placeholder="Material"
              />
              <input
                onChange={handleImageUpload}
                type="file"
                accept=".jpg,.jpeg,.png" // Accept only these file types
                required
                placeholder="Upload image"
              ></input>
              {previewImage && (
                <img
                  src={previewImage}
                  className="img-fluid rounded object-fit-cover"
                  alt="product image"
                />
              )}
              <button type="submit" onClick={handleSubmit}>
                Send Request
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
