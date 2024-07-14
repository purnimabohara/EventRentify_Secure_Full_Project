

import React, {useState,useEffect} from 'react'
import { getSingleCategory, updateCategoryAPi  } from '../../apis/Api'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const AdminEditCategory = () => {

  //receive product id from url
  const {id}=useParams()

  //navigator
  const navigate= useNavigate()

  //use effect to fetch product details
  //it runs automatically n tke dependencies
  useEffect(()=> {

  //   //API call
    getSingleCategory(id).then((res)=>{
      console.log(res.data)
      setCategoryName(res.data.category.categoryName)
      
      
      setOldImage(res.data.category.categoryImageUrl)
    })

  }, [id]);

  // useEffect(() => {
  //   //API call
  //   getSingleRestaurant(id).then((res) => {
  //     console.log(res.data);
  //     const restaurant = res.data.restaurant; // Accessing the restaurant object from response data
  //     setRestaurantName(restaurant.restaurantName);
  //     setRestaurantLocation(restaurant.restaurantLocation);
  //     setOldImage(restaurant.restaurantImageUrl);
  //   });
  // }, [id]);
  


    //make useState
    const [categoryName, setCategoryName] = useState("");
  
    

  
    //Make usestate for image
    const [categoryImage, setCategoryImage] = useState(null);
    const [privewImage, setPrivewImage] = useState(null);
    const [oldImage,setOldImage]=useState('')
  
     //Handle image upload and privew
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setCategoryImage(file);
    setPrivewImage(URL.createObjectURL(file));
    

    
  }
  //make function for button
  const handleSubmit= (e)=>{
    e.preventDefault()
    console.log(categoryName)
    console.log(categoryImage)

    //make a form data
    const formData = new FormData();
    formData.append('categoryName',categoryName)
    
    
    formData.append('categoryImage',categoryImage)

    //making api call
    updateCategoryAPi(id,formData).then((res)=>{
      if(res.data.success== true){
        toast.success(res.data.message)
        navigate('/admin/admindash')
      }else{
        toast.error(res.data.message)
      }
    }).catch(err=>{
      toast.error("Server error")
    })
  }

  
    return(
  <>
  <h2 className='m-4'>Updating   <span className='text-danger'>'{categoryName}'</span></h2>
  <div className='d-flex m-4 gap-4'>
    <div className=''>
        <form>
        <form>
                    <label>Category Name</label>
                    <input value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                      type="text"
                      className="form-control mb-2"
                      placeholder="Enter name"
                    ></input>
                  
                    
                    

                    
                    <label>Category Image</label>
                    <input 
                      onChange={handleImageUpload}
                      type="file"
                      className="form-control mb-2"
                      placeholder="Image"
                    ></input>

                    <button onClick={handleSubmit} className='btn btn-primary w-100 mt-2'>Update category</button>
                   
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

export default AdminEditCategory;