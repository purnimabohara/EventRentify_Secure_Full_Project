
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Sidebar from '../../components/Sidebar';
// import { useParams } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import { addMenu,deleteMenu,getAllCategories } from "../../apis/Api";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEdit, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";

// const MenuDash = () => {
//   const { categoryId } = useParams();
//   console.log("categoryId",categoryId) ;
//   const [menus, setMenus] = useState([]);
//   const [menuName, setMenuName] = useState("");
 
  



//   useEffect(() => {
//     // Fetch menus for the specific restaurant using restaurantId
//     getAllCategories()
//       .then((res) => {
//         const foundCategory = res.data.categories.find((category) => category._id === categoryId);
//         if (foundCategory) {
//           setMenus(foundCategory.menus);
//         } else {
//           console.error("Category not found");
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching menus: ", error);
//       });
//   }, [categoryId]); // Fetch menus whenever restaurantId changes

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     console.log(
//       menuName
//     );

//     //making logical form data
//     const formData = new FormData();
//     formData.append("menuName", menuName);
//     formData.append("categoryId", categoryId);


  

//     //making api call
//     addMenu(formData)
//       .then((res) => {
//         if (res.data.success == false) {
//           toast.error(res.data.message);
//         } else {
//           toast.success(res.data.message)
//           window.location.reload()
          
        
//         }
//       })
//       .catch((err) => {
//         toast.error("Server error");
//         console.log(err.message);
//       });
//   };

//   const handleDelete=(id)=>{
//     const confirmDialog = window.confirm('Are you sure you want to delete this menu?')
//     if(!confirmDialog){
//       return;

//     }else{
//       //make api call
//       deleteMenu(id).then((res)=>{
//         if(res.data.success== true){
//           toast.success(res.data.message)
//           window.location.reload()
//         }
//         else{
//           toast.error(res.data.message)
//         }
//       })

//     }


//   }
//   return (
//     <>
//     <Sidebar/>
//       <div className="main-content">
//         <h2 className="main head">List of Menus</h2>
//         <div className="search-container" style={{marginLeft:'2%'}}>
//           {/* Search bar */}
//           <div className="search-bar">
//             <input
//               type="text"
//               className="form-control me-3"
//               style={{ width: "300px" }}
//               placeholder="Search category"
//             />
//             <button type="button" className="btn btn-success search-button1">
//               Search
//             </button>
//           </div>

//           {/* Sort dropdown and sort button */}
//           <div className="sort-dropdown">
//             <select value="">
//               <option value="name">Sort by Name</option>
//               <option value="location">Sort by Location</option>
//             </select>
//             <button
//               type="button"
//               className="btn btn-primary sort-button sortbtn"
//             ></button>
//           </div>
//         </div>
//       <div className="m-4">
//         <div className="d-flex justify-content-between align-items-center mb-5">
//           <div className="d-flex align-items-center">
            
//             <button
//               type="button"
//               className="btn btn-success"
//               data-bs-toggle="modal"
//               data-bs-target="#exampleModal"
//             >
//               Add Menu
//             </button>
//             <div
//               className="modal fade"
//               id="exampleModal"
//               tabIndex="-1"
//               aria-labelledby="exampleModalLabel"
//               aria-hidden="true"
//             >
//               <div className="modal-dialog">
//               <div className="modal-content">
//                 <div className="modal-header">
//                   <h1 className="modal-title fs-5" id="exampleModalLabel">
//                     Modal title
//                   </h1>
//                   <button
//                     type="button"
//                     className="btn-close"
//                     data-bs-dismiss="modal"
//                     aria-label="Close"
//                   ></button>
//                 </div>
//                 <div className="modal-body">
//                   <form>
//                     <label>Menu Name</label>
//                     <input
//                       onChange={(e) => setMenuName(e.target.value)}
//                       type="text"
//                       className="form-control mb-2"
//                       placeholder="Enter menu"
//                     ></input>
                    
//                     </form>
//                 </div>
//                 <div className="modal-footer">
//                   <button
//                     type="button"
//                     class="btn btn-secondary"
//                     data-bs-dismiss="modal"
//                   >
//                     Close
//                   </button>
//                   <button
//                     onClick={handleSubmit}
//                     type="button"
//                     class="btn btn-primary"
//                   >
//                     Save changes
//                   </button>
//                 </div>
//               </div>
//             </div>
//             </div>
//           </div>
//         </div>

//         <table className="table table-striped">
//           <thead>
//             <tr>
//               <th style={{ backgroundColor: "rgb(2, 53, 2)", color: "white" }}>Menu Name</th>
//               <th style={{ backgroundColor: "rgb(2, 53, 2)", color: "white" }}>Items</th>
//               <th style={{ backgroundColor: "rgb(2, 53, 2)", color: "white" }}>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {menus.map((menu) => (
//               <tr key={menu._id}>
//                 <td>{menu.menuName}</td>
//                 <td>
//                 <Link to={`/admin/itemdash/${categoryId}/${menu._id}`} className="btn btn-primary">
//   <FontAwesomeIcon icon={faEye} />
// </Link>
//                 </td>
//                 <td>
//                   <div className="btn-group" role="group">
//                   <Link
//                     to={`/admin/menuedit/${menu._id}`}
//                     className="btn btn-success"
//                   >
//                     <FontAwesomeIcon icon={faEdit} /> 
//                   </Link>
//                     <button  onClick={() => handleDelete(menu._id)} className="btn btn-danger">
//                       <FontAwesomeIcon icon={faTrash} />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       </div>
//     </>
//   );
// };

// export default MenuDash;

