import React, { useEffect, useState } from "react";
import Sidebar from '../../components/Sidebar';
import { useParams } from "react-router-dom";
import { deleteItem, addItem, getAllCategories } from "../../apis/Api";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const ItemDash = () => {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  //useState for adding items
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [size, setSize] = useState("");
  const [material, setMaterial] = useState("");
  const [colour, setColour] = useState("");
  const [weight, setWeight] = useState("");
  const [owner, setOwner] = useState("");
  const [contact, setContact] = useState("");
  const[quantity,setQuantity]=useState("");
  const[itemSecurityDeposit,setItemSecurityDeposit]=useState("");



  
  const [itemImage, setItemImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const navigate = useNavigate();

  // Function for image upload and preview
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setItemImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("itemName", itemName);
    formData.append("itemPrice", itemPrice);
    formData.append("size", size);
    formData.append("material", material);
    formData.append("colour", colour);
    formData.append("quantity", quantity);
    formData.append("itemSecurityDeposit", itemSecurityDeposit);




    formData.append("weight", weight);

    formData.append("itemImage", itemImage);
    formData.append("owner",owner);
    formData.append("contact",contact);


    formData.append("categoryId",categoryId);
    console.log(formData);



    addItem(formData)
      .then((res) => {
        if (res.data.success == false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          window.location.reload();
        }
      })
      .catch((err) => {
        toast.error("Server error");
        console.log(err.message);
      });
  };

  // Delete item function
  const handleDelete = (id) => {
    const confirmDialog = window.confirm("Are you sure you want to delete this item?");
    if (!confirmDialog) {
      return;
    } else {
      deleteItem(id)
        .then((res) => {
          if (res.data.success == true) {
            toast.success(res.data.message);
            window.location.reload();
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((err) => {
          toast.error("Server error");
          console.log(err.message);
        });
    }
  };

  useEffect(() => {
    getAllCategories()
      .then((res) => {
        const foundCategory = res.data.categories.find((category) => category._id === categoryId);
        if (foundCategory) {
        setItems(foundCategory.items);
          } else {
          console.error("Category not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching items: ", error);
      });
  }, [categoryId]);

  const handleSearch = () => {
    const filteredItems = items.filter(
      (item) =>
        item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.size.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setItems(filteredItems);
  };

  const handleSort = () => {
    const sortedItems = [...items];
    sortedItems.sort((a, b) => {
      const nameA = a.itemName.toLowerCase();
      const nameB = b.itemName.toLowerCase();
      const sizeA = a.size.toLowerCase();
      const sizeB = b.size.toLowerCase();

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
    setItems(sortedItems);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <>
      <Sidebar />
      <div className="main-content">
        <h2 className="main head" style={{ marginLeft: "5%",marginTop:'2%' }}>List of Items</h2>
        <div className="search-container" style={{ marginLeft: '2%' }}>
         
        <div className="search-containerr d-flex justify-content-between align-items-center">
  {/* Search bar */}
  <div className="search-barr d-flex align-items-center">
    <input
      type="text"
      className="form-control me-3"
      style={{ width: "400px",height:'50px',marginLeft:'100%' }}
      placeholder="Search item"
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
       
        </div>
        <div className="m-4">
          <div className="d-flex justify-content-between align-items-center mb-5">
            <div className="d-flex align-items-center">
            
              <button style={{marginLeft:'10%'}}
                type="button"
                className="btn-dashboard"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Add Item
              </button>
              <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
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
                    <div className="modal-body">
                      <form>
                        <label>Item Name</label>
                        <input
                          onChange={(e) => setItemName(e.target.value)}
                          type="text"
                          className="form-control mb-2"
                          placeholder="Enter item"
                        ></input>
                        <label>Item Price</label>
                        <input
                          onChange={(e) => setItemPrice(e.target.value)}
                          type="text"
                          className="form-control mb-2"
                          placeholder="Enter price"
                        ></input>
                         <label>Item Quantity</label>
                        <input
                          onChange={(e) => setQuantity(e.target.value)}
                          type="text"
                          className="form-control mb-2"
                          placeholder="Enter quantity"
                        ></input>
                        <label>Item Size</label>
                        <input
                          onChange={(e) => setSize(e.target.value)}
                          type="text"
                          className="form-control mb-2"
                          placeholder="Enter size"
                        ></input>
                        
                         <label>Item Material</label>
                        <input
                          onChange={(e) => setMaterial(e.target.value)}
                          type="text"
                          className="form-control mb-2"
                          placeholder="Enter material"
                        ></input>
                         <label>Item Colour</label>
                        <input
                          onChange={(e) => setColour(e.target.value)}
                          type="text"
                          className="form-control mb-2"
                          placeholder="Enter colour"
                        ></input>
                         <label>Item Weight</label>
                        <input
                          onChange={(e) => setWeight(e.target.value)}
                          type="text"
                          className="form-control mb-2"
                          placeholder="Enter weight"
                        ></input>
                         <label>Owner</label>
                        <input
                          onChange={(e) => setOwner(e.target.value)}
                          type="text"
                          className="form-control mb-2"
                          placeholder="Enter name of the owner"
                        ></input>
                         <label>Contact</label>
                        <input
                          onChange={(e) => setContact(e.target.value)}
                          type="text"
                          className="form-control mb-2"
                          placeholder="Enter contact"
                        ></input>
                        <label>Security Deposit</label>
                        <input
                          onChange={(e) => setItemSecurityDeposit(e.target.value)}
                          type="number"
                          className="form-control mb-2"
                          placeholder="Enter security deposit"
                        ></input>

                        <label>Item Image</label>
                        <input
                          onChange={handleImageUpload}
                          type="file"
                          className="form-control mb-2"
                          placeholder="Image"
                        ></input>
                        {previewImage && (
                          <img
                            src={previewImage}
                            className="img-fluid rounded object-fit-cover"
                            alt="item Image"
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
                <th style={{ backgroundColor:'#9A5865', color: 'white',fontSize:'19px' }}>Item Image</th>
                <th style={{ backgroundColor:'#9A5865', color: 'white',fontSize:'19px' }}>Item Name</th>
                <th style={{ backgroundColor:'#9A5865', color: 'white',fontSize:'19px' }}>Item Price</th>
                <th style={{ backgroundColor:'#9A5865', color: 'white',fontSize:'19px' }}>Item Quantity</th>

                <th style={{ backgroundColor:'#9A5865', color: 'white',fontSize:'19px' }}>Item Material</th>
                <th style={{ backgroundColor:'#9A5865', color: 'white',fontSize:'19px' }}>Item Size</th>
                <th style={{ backgroundColor:'#9A5865', color: 'white',fontSize:'19px' }}>Vendor</th>
                <th style={{ backgroundColor:'#9A5865', color: 'white',fontSize:'19px' }}>Contact</th>
                <th style={{ backgroundColor:'#9A5865', color: 'white',fontSize:'19px' }}>Security Deposit</th>



                <th style={{ backgroundColor:'#9A5865', color: 'white',fontSize:'19px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id}>
                  <td>
                    <img src={item.itemImage} width={"40"} height={"40"} alt="" />
                  </td>
                  <td>{item.itemName}</td>
                  <td>{item.itemPrice}</td>
                  <td>{item.quantity}</td>

                  <td>{item.material}</td>
                  <td>{item.size}</td>
                  <td>{item.owner}</td>
                  <td>{item.contact}</td>
                  <td>Rs.{item.itemSecurityDeposit}</td>


                  <td className="dash-td">
                    <div className="btn-group" role="group">
                      <Link
                        to={`/admin/itemedit/${item._id}`}
                        className="btn btn-success" style={{marginRight:'10px', width:'10px',height:'40px', marginTop:'0'}}
                      >
                        <FontAwesomeIcon icon={faEdit} className="edit-dash"/>
                      </Link>
                      <button onClick={() => handleDelete(item._id)} className="btn btn-danger"style={{marginRight:'10px', width:'10px',height:'40px',verticalAlign:'middle',marginTop:'0'}}>
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

export default ItemDash;
