import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import Register from "./pages/Register";
import Service from "./pages/Service";

//for showing toast messages
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminDash from "./pages/Admin/AdminDash";
import AdminEditCategory from "./pages/Admin/AdminEditCategory";
import RequestDash from "./pages/Admin/RequestDash";
import ForgetPassword from "./pages/ForgetPassword";
import Login from "./pages/Login";
import UserProfile from "./pages/Profile";
import ResetPassword from "./pages/ResetPassword";
import VerificationMessage from "./pages/VerificationMessage";
import AdminRoutes from "./protected/AdminRoutes";
import UserRoutes from "./protected/UserRoutes";

import useAxiosInterceptors from "./protected/axiosInterceptor";

// import MenuDash from './pages/Admin/MenuDash';
// import AdminEditMenu from './pages/Admin/MenuEdit';
import ItemDash from "./pages/Admin/ItemDash";
import AdminEditItem from "./pages/Admin/ItemEdit";
// import ViewMenu from './pages/ViewMenu';
import FilteredItemsPage from "./pages/FilteredItemsPage";
import ItemDetails from "./pages/ItemDetails";
import RequestHistory from "./pages/RequestHistory";

import ViewItem from "./pages/ViewItem";

import AddToCart from "./pages/AddToCart";
import Orders from "./pages/Admin/Orders";
import ShippingInfo from "./pages/ShippingInfo";

import ContactPage from "./pages/ContactPage";
import ViewCategory from "./pages/ViewCategory";

import ReviewPage from "./pages/ReviewPage";

import AboutUs from "./pages/AboutUs";

import { UserTable } from "./pages/Admin/UserTable";


import FAQPage from "./pages/FaqPage";
import OrderHistory from "./pages/OrderHistory";
import PolicyPage from "./pages/PolicyPage";
import TermPage from "./pages/TermsPage";
import Thankyou from "./pages/ThankyouPage";
import LogDashboard from "./pages/Admin/logDashboard";



// import Aboutuspage from "./pages/AboutUS/page";

function App() {
  useAxiosInterceptors();

  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/viewItem/:categoryId/item" element={<ViewItem />} />
        <Route path="/viewCategories" element={<ViewCategory />} />
        <Route path="/service" element={<Service />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/filteredItems" element={<FilteredItemsPage />} />
        <Route path="/faqPage" element={<FAQPage />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/policy" element={<PolicyPage />} />
        <Route path="/terms" element={<TermPage />} />
        {/* //user route */}
        <Route element={<UserRoutes />}>
          <Route path="/profile" element={<UserProfile />} />
          {/* <Route path='/category/:categoryId/menu' element={<ViewMenu/>}/> */}

          <Route path="/itemdetails/:id" element={<ItemDetails />} />

          <Route path="/orderHistory" element={<OrderHistory />} />

          <Route path="/cart" element={<AddToCart />} />
          <Route path="/shippingForm" element={<ShippingInfo />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/success" element={<Thankyou />} />

          <Route path="/requestHistory" element={<RequestHistory />} />
        </Route>
        {/* admin route */}
        <Route element={<AdminRoutes />}>
          <Route path="/admin/admindash" element={<AdminDash />} />
          <Route path="/admin/requestdash" element={<RequestDash />} />
    

          
          
          <Route path="/admin/logdashboard" element={<LogDashboard />} />

          <Route path="/admin/edit/:id" element={<AdminEditCategory />} />

          {/* <Route path='/admin/menudash/:categoryId' element={<MenuDash/>}/> */}

          {/* <Route path='/admin/menuedit/:id' element={<AdminEditMenu/>}/> */}

          <Route path="/admin/itemdash/:categoryId" element={<ItemDash />} />

          <Route path="/admin/itemedit/:id" element={<AdminEditItem />} />
          <Route path="/admin/usertable" element={<UserTable />} />

          <Route path="/admin/order" element={<Orders />} />
        </Route>
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/verify" component={<VerificationMessage />} />
      </Routes>
    </Router>
  );
}

export default App;

//npx serve -s build

// npx serve -s build -l 3000 --ssl-cert ./cert.pem --ssl-key ./key.pem
// >>
