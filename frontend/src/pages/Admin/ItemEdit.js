

import React, {useState,useEffect} from 'react'
import { getSingleItem, updateItem, getAllCategories   } from '../../apis/Api'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'


const AdminEditItem = () => {
  
  //receive product id from url
  
  const {id}=useParams();
  const { categoryId } = useParams();

  

  //navigator
  const navigate= useNavigate()

  //use effect to fetch product details
  //it runs automatically n tke dependencies
 

  
  


    //make useState
    const [catId, setCatId] = useState("");
    const [itemName, setItemName] = useState("");
    const [itemPrice, setItemPrice] = useState("");
    const [size, setSize] = useState("");
    const [material, setMaterial] = useState("");
    const [colour, setColour] = useState("");
    const [weight, setWeight] = useState("");
    const [owner, setOwner] = useState("");
    const [contact, setContact] = useState("");
    const [quantity, setQuantity] = useState("");
    const[itemSecurityDeposit,setItemSecurityDeposit]=useState("");


  
    

  
    //Make usestate for image
    const [itemImage, setItemImage] = useState(null);
    const [privewImage, setPrivewImage] = useState(null);
    const [oldImage,setOldImage]=useState('')
   
    useEffect(() => {
      // API call
      getSingleItem(id).then((res) => {
        console.log(res.data);
        setItemName(res.data.item.itemName);
        setItemPrice(res.data.item.itemPrice);
        setSize(res.data.item.size);
        setMaterial(res.data.item.material);
        setColour(res.data.item.colour);
        setWeight(res.data.item.weight);
        setOwner(res.data.item.owner);
        setContact(res.data.item.contact);
        setQuantity(res.data.item.quantity);
        setItemSecurityDeposit(res.data.item.itemSecurityDeposit);

        

        setOldImage(res.data.item.itemImage);
        setCatId(res.data.item.categoryId._id)
        console.log("catId",catId)
      }).catch((error) => {
        toast.error("Error fetching item details")
        console.error(error);
      });
    }, [id]);
  
     //Handle image upload and privew
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setItemImage(file);
    setPrivewImage(URL.createObjectURL(file));
    

    
  }
  //make function for button
  const handleSubmit= (e)=>{
    e.preventDefault()
    console.log(itemName,itemPrice,size,material,colour,weight,owner,contact,quantity)
    console.log(itemImage)

    //make a form data
    const formData = new FormData();
    formData.append('itemName',itemName)
    formData.append('itemPrice',itemPrice)
    formData.append('size',size)
    formData.append('material',material)
    formData.append('colour',colour)
    formData.append('weight',weight)
    formData.append('owner',owner)
    formData.append('contact',contact)
    formData.append('quantity',quantity)
    formData.append("itemSecurityDeposit", itemSecurityDeposit);





    formData.append('itemImage',itemImage)
    

    //making api call
    updateItem(id,formData).then((res)=>{
      if(res.data.success== true){
        toast.success(res.data.message)
        navigate(`/admin/itemdash/${catId}`);
      }else{
        toast.error(res.data.message)
      }
    }).catch(err=>{
      toast.error("Server error")
    })
  }

  
    return(
  <>


  <h2 className='m-4'>Updating   <span className='text-danger'>'{itemName}'</span></h2>
  <div className='d-flex m-4 gap-4'>
    <div className=''>
        <form>
        <form>
                    <label>Item Name</label>
                    <input value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                      type="text"
                      className="form-control mb-2"
                      placeholder="Enter name"
                    ></input>
                    <label>Item Price</label>
                    <input value={itemPrice}
                      onChange={(e) => setItemPrice(e.target.value)}
                      type="text"
                      className="form-control mb-2"
                      placeholder="Enter price"
                    ></input>
                    <label>Item Size</label>
                    <input value={size}
                      onChange={(e) => setSize(e.target.value)}
                      type="text"
                      className="form-control mb-2"
                      placeholder="Enter size"
                    ></input>
                    <label>Item Material</label>
                    <input value={material}
                      onChange={(e) => setMaterial(e.target.value)}
                      type="text"
                      className="form-control mb-2"
                      placeholder="Enter material"
                    ></input>
                    <label>Item Colour</label>
                    <input value={colour}
                      onChange={(e) => setColour(e.target.value)}
                      type="text"
                      className="form-control mb-2"
                      placeholder="Enter colour"
                    ></input>
                    <label>Item Weight</label>
                    <input value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      type="text"
                      className="form-control mb-2"
                      placeholder="Enter Weight"
                    ></input>
                     <label>Quantity</label>
                    <input value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      type="text"
                      className="form-control mb-2"
                      placeholder="Enter quantity"
                    ></input>
                     <label>Security Deposit</label>
                    <input value={itemSecurityDeposit}
                      onChange={(e) => setItemSecurityDeposit(e.target.value)}
                      type="number"
                      className="form-control mb-2"
                      placeholder="Enter security Deposit"
                    ></input>
                    <label>Item Owner</label>
                    <input value={owner}
                      onChange={(e) => setOwner(e.target.value)}
                      type="text"
                      className="form-control mb-2"
                      placeholder="Enter Owner"
                    ></input>
                    <label>Contact</label>
                    <input value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      type="text"
                      className="form-control mb-2"
                      placeholder="Enter Contact"
                    ></input>
                   
                    

                    
                    <label>Item Image</label>
                    <input 
                      onChange={handleImageUpload}
                      type="file"
                      className="form-control mb-2"
                      placeholder="Image"
                    ></input>

                    <button onClick={handleSubmit} className='btn btn-primary w-100 mt-2'>Update item</button>
                   
                  </form>
        </form>


    </div>
    <div>
        <h6>Old image</h6>
        <img src={oldImage} className='object-fit-cover rounded-3'height={180} width={180}></img>
        <hr/>

        {
          privewImage && <>
          <h6 className='mt-3'>New image</h6>
        <img src={privewImage} className='object-fit-cover rounded-3'height={180} width={180}></img>
        </>
        }

    </div>
    
  </div>
  
  </>
)}

export default AdminEditItem;