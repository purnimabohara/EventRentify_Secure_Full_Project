// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import { Link, useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import { getAllCategories, submitBooking } from "../apis/Api";
// import "../style/viewMenu.css";

// const ViewMenu = () => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const { categoryId } = useParams();
//   const [category, setCategory] = useState(null);
//   const [menus, setMenus] = useState([]);

//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [eventType, setEventType] = useState("");
  
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [address, setAddress] = useState("");
//   const [categoriesName, setCategoriesName] = useState("");
//   const [menusName, setMenusName] = useState([]);

//   const [numberofGuests, setNumberOfGuests] = useState("");
//   const [specialRequirements, setSpecialRequirements] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Log form data for testing
//     console.log(
//       startDate,
//       endDate,
//       phoneNumber,
//       eventType,
//       address,
//       specialRequirements,
//       numberofGuests,
//      categoriesName,
//       menusName
//     );

//     // Construct FormData object
//     const formData = new FormData();
//     formData.append("startDate", startDate);
//     formData.append("endDate", endDate);
//     formData.append("phoneNumber", phoneNumber);
//     formData.append("eventType", eventType);
//     formData.append("address", address);
//     formData.append("specialRequirements", specialRequirements);
//     formData.append("numberofGuests", numberofGuests);
    
//     formData.append("categoriesName", categoryId); 

//     // Pass menu item IDs instead of names
//     menusName.forEach(menuId => {
//       formData.append("menusName", menuId);
//     });

//     // Submit booking
//     submitBooking(formData)
//       .then((res) => {
//         if (res.data.success === false) {
//           toast.error(res.data.message);
//         } else {
//           toast.success(res.data.message);
//           // Clear form fields after successful submission
//           clearFormFields();
//         }
//       })
//       .catch((err) => {
//         toast.error("Server error");
//         console.log(err.message);
//       });
//   };

//   // Function to clear form fields
//   const clearFormFields = () => {
//     setStartDate("");
//     setEndDate("");
//     setEventType("");
//     setPhoneNumber("");
//     setAddress("");
//     setNumberOfGuests("");
//     setSpecialRequirements("");
//     setMenusName([]);
//   };
//   useEffect(() => {
//     getAllCategories()
//       .then((res) => {
//         const foundCategory = res.data.categories.find(
//           (category) => category._id === categoryId
//         );
//         if (foundCategory) {
//           setCategory(foundCategory);
//           setMenus(foundCategory.menus);
//         } else {
//           console.error("Category not found");
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching categories: ", error);
//       });
//   }, [categoryId]);
//   return (
//     <>
//       <Navbar />
//       {category && (
//         <div>
//           {/* Container for category name and location */}
//           <div className="category-info">
//             <h1 className="res-name">{category.categoryName}</h1>
           
//             <button
//               style={{ marginRight: "5%", width: "45%" }}
//               type="button"
//               className="btn btn-danger"
//               data-bs-toggle="modal"
//               data-bs-target="#exampleModal"
//             >
//               Book now
//             </button>
//           </div>

//           {/* Full width background image */}
//           <div
//             className="background-image "
//             style={{
//               height: "40vh",
//               width: "100%", // Full width
//               backgroundImage: `url(${ category.categoryImageUrl})`,
//             }}
//           ></div>
          
//           <div className="d-flex align-items-center">
//             <div
//               className="modal fade"
//               id="exampleModal"
//               tabIndex="-1"
//               aria-labelledby="exampleModalLabel"
//               aria-hidden="true"
//             >
//               <div className="modal-dialog">
//                 <div className="modal-content">
//                   <div className="modal-header ">
//                     <h1 className="modal-title fs-5" id="exampleModalLabel">
//                       Book Category
//                     </h1>
//                     <button
//                       type="button"
//                       className="btn-close"
//                       data-bs-dismiss="modal"
//                       aria-label="Close"
//                     ></button>
//                   </div>
//                   <div className="modal-body">
//                   <form onSubmit={handleSubmit}>
//                     <label>Start Date</label>
//                       <input
//                          onChange={(e) => setStartDate(e.target.value)}
//                         type="date"
//                         className="form-control mb-2"
//                         placeholder="Enter start date of event"
//                       ></input>
//                       <label>End Date</label>
//                       <input
//                          onChange={(e) => setEndDate(e.target.value)}
//                         type="date"
//                         className="form-control mb-2"
//                         placeholder="Enter end date of event"
//                       ></input>
                     
//                       <label>Phone Number</label>
//                       <input
//                          onChange={(e) => setPhoneNumber(e.target.value)}
//                         type="number"
//                         className="form-control mb-2"
//                         placeholder="Enter your number"
//                       ></input>

//                       <label>Address</label>
//                       <input  onChange={(e) => setAddress(e.target.value)}
//                         type="text"
//                         className="form-control mb-2"
//                         placeholder="Enter your address"
//                       ></input>
//                       <label>Category</label>
//                       <input onChange={(e) => setCategoriesName(e.target.value)}
//                       value={category.categoryName}
//                         type="text"
//                         className="form-control mb-2"
//                       ></input>
//                       <label> Menu Options</label>
//                       <select
//                        onChange={(e) => setMenusName(Array.from(e.target.selectedOptions, option => option.value))}
//                        className="form-control mb-2"
//                        multiple
//                      >
//                          {menus.map((menu) => (
//                 <option key={menu._id} value={menu._id}>{menu.menuName}</option>
//               ))}
//                       </select>

                      
//                       <label>Event Type</label>
//                       <select
//                        onChange={(e) => setEventType(e.target.value)}

//                         className="form-control mb-2"
//                       >
//                         <option>Wedding</option>
//                         <option>Birthday</option>
//                         <option>Anniversary</option>
//                         <option>others</option>
//                       </select>
//                       <label> Guests</label>
//                       <input  onChange={(e) => setNumberOfGuests(e.target.value)}
//                         type="number"
//                         className="form-control mb-2"
//                         placeholder="Enter Number of guests"
//                       ></input>

//                       <label>Special Requirements</label>
//                       <textarea  onChange={(e) => setSpecialRequirements(e.target.value)}
//                         type="text"
//                         className="form-control mb-2"
//                         placeholder="Add your requirements here..."
//                       ></textarea>
//                     </form>
//                   </div>
//                   <div className="modal-footer">
//                     <button
//                       type="button"
//                       className="btn btn-secondary"
//                       data-bs-dismiss="modal"
//                     >
//                       Close
//                     </button>
//                     <button
//                       onClick={handleSubmit}
//                       type="submit"
//                       class="btn btn-primary"
//                     >
//                       Book
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Container for catering info */}
//           <div className="catering-info-container">
//             <h2>CATERING INFO</h2>
//             <div className="stations">
//               {/* Render menus */}
//               {menus.map((menu) => (
//                 <Link
//                   className="itemlink"
//                   key={menu._id}
//                   to={`/viewItem/${categoryId}/${menu._id}`}
//                 >
//                   <span>{menu.menuName}</span>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ViewMenu;