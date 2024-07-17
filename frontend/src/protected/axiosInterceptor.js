import axios from 'axios';
import { toast } from 'react-toastify';

const useAxiosInterceptors = () => {
    axios.interceptors.response.use(
        response => response,
        error => {
            if (error.response && error.response.status === 401) {
                toast.error("Your session has expired. Please log in again.");
                error.preventDefault();
                localStorage.clear();

                
                localStorage.removeItem("user");
                localStorage.removeItem("token");

                
                window.location.href = '/login';
            }
            return Promise.reject(error);
        }
    );
};

export default useAxiosInterceptors;
