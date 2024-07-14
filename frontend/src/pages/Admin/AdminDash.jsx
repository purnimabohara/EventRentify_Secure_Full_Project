


import React, { useState, useEffect } from "react";
import { addCategoryApi,  deleteCategoryApi, getAllCategories } from "../../apis/Api";
import Sidebar from '../../components/Sidebar';
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import '../../style/adminDashboard.css';
import { faEdit, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
 import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const AdminDash = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  //make useState
  const [categoryName, setCategoryName] = useState("");
  
  

  //Make usestate for image
  const [categoryImage, setCategoryImage] = useState(null);
  const [privewImage, setPrivewImage] = useState(null);

  const navigate= useNavigate()
  //useEffect for fetching all products and show in table
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getAllCategories().then((res) => {
      setCategories(res.data.categories);
    });
  }, []);

  //Function for image upload and privew
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setCategoryImage(file);
    setPrivewImage(URL.createObjectURL(file));
  };
  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log(
      categoryName,
      
      categoryImage
    );

    //making logical form data
    const formData = new FormData();
    formData.append("categoryName", categoryName);
    

    formData.append("categoryImage", categoryImage);

    //making api call
    addCategoryApi(formData)
      .then((res) => {
        if (res.data.success == false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message)
          window.location.reload()
          
        
        }
      })
      .catch((err) => {
        toast.error("Server error");
        console.log(err.message);
      });
  };

  //delete product function
  const handleDelete=(id)=>{
    const confirmDialog = window.confirm('Are you sure you want to delete this category?')
    if(!confirmDialog){
      return;

    }else{
      //make api call
      deleteCategoryApi(id).then((res)=>{
        if(res.data.success== true){
          toast.success(res.data.message)
          window.location.reload()
        }
        else{
          toast.error(res.data.message)
        }
      })

    }


  }
  const handleSearch = () => {
    const filteredCategories = categories.filter(
      (category) =>
        category.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setCategories(filteredCategories);
  };

  const handleSort = () => {
    const sortedCategories = [...categories];
    sortedCategories.sort((a, b) => {
      const nameA = a.categoryName.toLowerCase();
      const nameB = b.categoryName.toLowerCase();
    
      
      if (sortOrder === "asc") {
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      } else {
        if (nameA < nameB) return 1;
        if (nameA > nameB) return -1;
        return 0;
      }
    });
    setCategories(sortedCategories);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };


  return (
    <>
     <Sidebar/>
  <div className="main-content">
        <h2 className="main head"style={{ marginLeft: "5%",marginTop:'2%' }}>List of Categories</h2>
        <div className="search-containerr d-flex justify-content-between align-items-center">
  {/* Search bar */}
  <div className="search-barr d-flex align-items-center">
    <input
      type="text"
      className="form-control me-3"
      style={{ width: "400px",height:'50px',marginLeft:'100%' }}
      placeholder="Search category"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
    <button
      type="button"
      className="btn btn-success search-button1" style={{ width: "100px",height:'50px',color:'white',backgroundColor:'green',border:'none',marginTop:'0' }}
      onClick={handleSearch}
    >
      Search
    </button>
  </div>

  {/* Sort button */}
  <button
    type="button"
    className="btn btn-primary sort-button sortbtn"
    style={{ width: "100px",height:'50px',color:'white',backgroundColor:'rgb(0, 98, 255)',border:'none',marginTop:'0' }}
    onClick={handleSort}
  >
    {sortOrder === "asc" ? "Sort A-Z" : "Sort Z-A"}
  </button>
</div>

        <button 
            type="button"
            className="btn-dashboard" 
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Add Category
          </button>
    <div className="m-4">
    
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div className="d-flex align-items-center">
         
          <div
            className="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Modal title
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body-dashboard" >
                  <form>
                    <label>Category Name</label>
                    <input
                      onChange={(e) => setCategoryName(e.target.value)}
                      type="text"
                      className="form-control mb-2"
                      placeholder="Enter category"
                    ></input>
                    
                    
                    
                    

                    
                    <label>Category Image</label>
                    <input
                      onChange={handleImageUpload}
                      type="file"
                      className="form-control mb-2"
                      placeholder="Image"
                    ></input>
                    {privewImage && (
                      <img
                        src={privewImage}
                        className="img-fluid rounded object-fit-cover"
                        alt="category Image"
                      />
                    )}
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    onClick={handleSubmit}
                    type="button"
                    class="btn btn-primary"
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
       
          
        </div>
      </div>
  
      <table className="table table-striped-dash">
      <thead className="head-dashboard">
          <tr>
            <th  style={{ backgroundColor:'#9A5865', color: 'white',fontSize:'19px' }}>Category Image</th>
            <th style={{ backgroundColor: '#9A5865', color: 'white',fontSize:'19px' }}>Category Name</th>
       
            <th style={{ backgroundColor: '#9A5865', color: 'white',fontSize:'19px' }}>Item</th>
            <th style={{ backgroundColor: '#9A5865', color: 'white' ,fontSize:'19px'}}>Action</th>
            
          </tr>
        </thead>
        <tbody className="tbod-dash">
          {categories.map((category, index) => (
            <tr key={category._id} >
              <td className="dash-td">
                <img style={{marginLeft:'4%'}}
                  src={category.categoryImageUrl}
                  width={"50"}
                  height={"50"}
                  alt=""
                />
              </td>
              <td className="dash-td">{category.categoryName}</td>
             
              <td className="dash-td">
              {/* <Link to={`/admin/menudash/${category._id}`} className="btn btn-primary">
                    <FontAwesomeIcon icon={faEye} />
                  </Link> */}
                  <Link to={`/admin/itemdash/${category._id}`} className="btn btn-primary">
                    <FontAwesomeIcon icon={faEye} />
                  </Link>
                  
              </td >
              <td className="dash-td">
                <div className="btn-group" role="group">
                  <Link
                    to={`/admin/edit/${category._id}`}
                    className="btn btn-success " style={{marginRight:'10px', width:'10px',height:'40px', marginTop:'0'}}
                  >
                    <FontAwesomeIcon icon={faEdit} className="edit-dash" /> 
                  </Link>
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="btn btn-danger"
                    style={{marginRight:'10px', width:'10px',height:'40px',verticalAlign:'middle',marginTop:'0'}}
                  >
                   <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  </>
  

  );
};

export default AdminDash;
