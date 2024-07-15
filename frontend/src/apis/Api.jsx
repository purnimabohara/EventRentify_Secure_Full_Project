



import axios from "axios";
import { jwtDecode } from 'jwt-decode'; // Correct named import
import { ToastContainer, toast } from "react-toastify";


const Api = axios.create({
  baseURL: "https://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Make separate header for authorization
const config = {
  headers: {
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

// Function to check token expiration
const checkTokenExpiry = () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; 

      if (decodedToken.exp < currentTime) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');  
        window.location.href = '/login';  
        toast.error("Your session has expired. Please log in again.");
      }
    } catch (error) {
      console.error("Error decoding token", error);
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  }
};


checkTokenExpiry();


setInterval(checkTokenExpiry, 60000); 

// Add an interceptor to handle 401 Unauthorized responses
Api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';  // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export default Api;

// Export other APIs
export const testApi = () => Api.get("/test");
// http://localhost:5000/test

// Create user API
export const createUserApi = (data) => Api.post("/api/user/create", data);

// Login user API
export const loginUserApi = (data) => Api.post("/api/user/login", data);


//Add to cart api
export const addToCartApi = (data) => Api.post('/api/user/addToCart', data, config)
export const getCartByUserIDApi = (id) => Api.get(`/api/user/getCartByUserID/${id}`, config)
export const getSingleCartApi = (id) => Api.get(`/api/user/getSingleCart/${id}`)
export const updateCartApi = (id, formData) => Api.put(`/api/user/updateCart/${id}`, formData, config)
export const removeFromCartApi = (id) => Api.delete(`/api/user/removeFromCart/${id}`, config)
export const checkPasswordStrengthApi = (data) => Api.post("/api/user/check-password-strength", data);


//create restaurant api
export const createCategoryApi = (data) =>
  Api.post("/api/category/create_category", data, config);


export const getSingleCategoryApi = (id) =>
  Api.get(`/api/category/get_category/${id}`);

//Update product API with id( id and data in URL)
export const updateProductAPi = (id, formData) =>
  Api.put(`/api/product/update_product/${id}`, formData, config);


//delete product by id
export const deleteProductApi = (id) =>
  Api.delete(`/api/product/delete_product/${id}`, config);



export const forgotPasswordApi = (data) =>
  Api.post("/api/user/forgot/password", data);

export const resetPasswordApi = (data, token) =>
  Api.put(`/api/user/password/reset/${token}`, data);
export const verifyEmail = (userId) => Api.get(`/verify?id=${userId}`);

export const updateUserAPi = (id, formData) =>
Api.put(`/api/user/updateUser/${id}`, formData, config);

// export const changePasswordApi = (userId) =>
//   Api.put(`/api/user/changePassword/:userId/${userId}`);

export const changePasswordApi = (userId, passwords) =>
  Api.put(`/api/user/changePassword/${userId}`, passwords);
//admin routes
export const getAllUserApi = () => Api.get("/api/admin/getAllUser");
//for restaurant
export const addCategoryApi = (data) =>
  Api.post("/api/admin/add-category", data, config);

export const  getAllCategories = () => Api.get("/api/user/get_categories");

export const getSingleCategory = (id) =>
  Api.get(`/api/user/get_category/${id}`);

export const updateCategoryAPi = (id, formData) =>
  Api.put(`/api/admin/update_category/${id}`, formData, config);

export const deleteCategoryApi = (id) =>
  Api.delete(`/api/admin/delete_category/${id}`, config);



//for items
export const addItem = (data) =>
  Api.post("/api/admin/add-item", data, config);

export const getSingleItem = (id) =>
  Api.get(`/api/user/get_item/${id}`,config);
  
export const updateItem = (id, formData) =>
  Api.put(`/api/admin/update_item/${id}`, formData, config);

export const deleteItem = (id) =>
  Api.delete(`/api/admin/delete_item/${id}`, config);


  export const deleteUser= (id) =>
  Api.delete(`/api/admin/deleteUser/${id}`, config);

  //request
  export const  getAllRequests = () => Api.get("/api/admin/get_requests",config);
  
  export const deleteRequest = (id) =>
  Api.delete(`/api/admin/delete_request/${id}`, config);
  export const submitRequest = (data) =>
  Api.post("/api/user/submit-request", data, config);

  export const getRequestsByUserId = (id) =>
    Api.get(`/api/user/get_requestsbyUser/${id}`,config);

  export const updateRequestStatus = (requestId, data) =>
    Api.put(`/api/user/updateRequestStatus/${requestId}`, data, config);



  
  //Rating

export const updateRatingApi = (id) => Api.get(`/api/user/updateRating/${id}`, config)
export const upsertRatingApi = (data) => Api.post('/api/user/upsertRating', data, config);
  


  export const createShippingInfoApi = (data) => Api.post('/api/user/createShippingInfo', data, config)
  export const getShippingInfoByUserIDApi = (id) => Api.get(`/api/user/getShippingInfoByUserID/${id}`, config)
  export const getSingleShippingInfoApi = (id) => Api.get(`/api/user/getSingleShippingInfo/${id}`)
  export const updateShippingInfoApi = (id, formData) => Api.put(`/api/user/updateShippingInfo/${id}`, formData, config)
  
  // order
  export const createOrderApi = (data) => Api.post('/api/user/createOrder', data, config)
  export const getOrderByUserIDApi = (id) => Api.get(`/api/user/getOrderByUserID/${id}`, config)
  export const  getAllOrdersApi = () => Api.get("/api/admin/getAllOrders",config);
  export const updateOrderStatusApi = (id, formData) => Api.put(`/api/admin/updateOrderStatus/${id}`, formData, config)
  export const cancelOrderApi = (id) => Api.delete(`/api/admin/cancelOrder/${id}`, config)
  export const updateReturnStatus = (orderId, data) =>
    Api.put(`/api/admin/updateReturnStatus/${orderId}`, data, config);

//  export const fetchUserRatingsApi = (userId) => Api.get(`/api/user/rating/${userId}`);


//log api


export const getAllLogsApi = () => {
  return Api.get("/api/admin/logs",config);
};
 
export const getSingleLogApi = (id) => {
  return Api.get(`/api/admin/logs/${id}`,config);
};
 
export const deleteLogApi = (id) => {
  return Api.delete(`/api/admin/logs/${id}`,config);
};
 






  export const searchItemsByName = async (itemName, categoryName, categoryId) => {
    try {
      const response = await axios.get('/api/user/search', {
        params: {
          itemName,
          categoryName,
          categoryId // Pass categoryId if available
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
