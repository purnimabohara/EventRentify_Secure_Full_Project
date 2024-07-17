// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "../style/Navbar.css";

// const Navbar = () => {
//   //get data of user form local storage
//   const user = JSON.parse(localStorage.getItem("user"));

//   // //   //logout function
//   const navigate = useNavigate();
//   const handleLogout = (e) => {
//     e.preventDefault();
//     localStorage.clear();
//     navigate("/login");
//   };

//   return (
//     <>
//       <nav className="navbar navbar-expand-lg">
//         <div className="container-fluid ">
//           <a style={{fontSize:'25px',marginRight:'2%'}} className="navbar-brand text-white fw-bold" href="#">
//             Eventique
//           </a>
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarSupportedContent"
//             aria-controls="navbarSupportedContent"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="navbarSupportedContent">
//             <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//               <li className="nav-item">
//                 <a className="nav-link active" aria-current="page" href="#">
//                   {" "}
//                   <Link
//                     className="dropdown-item text-white"
//                     to="/
//                  "
//                   >
//                     {" "}
//                     Home
//                   </Link>
//                 </a>
//               </li>

//               <li className="nav-item">
//                 <a className="nav-link" href="/viewCategories">
//                   Products
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link" href="/contact">
//                   Become a renter
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link" href="/service">
//                   Services
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link" href="/contact">
//                   About us
//                 </a>
//               </li>
//             </ul>
//             <form className="d-flex" role="search" style={{marginRight:'4%'}}>
//               {user ? (
//                 // If user is logged in, show dropdown menu
//                 <div className="dropdown">
//                   <button
//                     className="btn dropdown-toggle "
//                     type="button"
//                     data-bs-toggle="dropdown"
//                     aria-expanded="false"
//                   >
//                     Hello {user.firstName}!
//                   </button>
//                   <ul className="dropdown-menu">
//                     <li>
//                       <Link
//                         className="dropdown-item "
//                         to="/profile"
//                       >
//                         Profile
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         className="dropdown-item "
//                         to="/requestHistory"
//                       >
//                         Request History
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         className="dropdown-item "
//                         to="/password/reset/:token"
//                       >
//                         Change password
//                       </Link>
//                     </li>
//                     <li>
//                       <button
//                         onClick={handleLogout}
//                         className="dropdown-item "
//                         to="/logout"
//                       >
//                         Logout
//                       </button>
//                     </li>
//                   </ul>
//                 </div>
//               ) : (
//                 // If user is not logged in, show login and register buttons
//                 <>
//                   <Link   to="/login">
//                   <button className="sign-in">Sign in</button>
//                   </Link>
//                   <Link to="/register">
//                   <button className="sign-up">Sign up</button>
//                   </Link>
//                 </>
//               )}
//             </form>
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// };

// export default Navbar;
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";
import "../style/Navbar.css";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getCartByUserIDApi } from '../apis/Api';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchCartCount = async () => {
      if (user && user._id) {
        try {
          const res = await getCartByUserIDApi(user._id);
          if (res.data.success) {
            setCartCount(res.data.cart.length);
          } else {
            console.error('Error fetching cart data:', res.data.message);
          }
        } catch (error) {
          console.error('Error fetching cart data:', error);
        }
      }
    };

    fetchCartCount();
  }, [user]);

  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/login");
  };

  const addToCart = () => {
    console.log("Added");
    navigate("/cart");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a
            style={{ fontSize: "25px", marginRight: "2%" }}
            className="navbar-brand text-white fw-bold"
            href="#"
          >
            Eventique
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  exact
                  to="/"
                  activeClassName="active"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/viewCategories"
                  activeClassName="active"
                >
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/contact"
                  activeClassName="active"
                >
                  Become a renter
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/service"
                  activeClassName="active"
                >
                  Services
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/faqPage"
                  activeClassName="active"
                >
                 Faq
                </NavLink>
              </li>
            </ul>
            <form className="d-flex align-items-center" role="search" style={{ marginRight: "4%" }}>
              {user ? (
                <>
                  <button className="btn cart-button position-relative"
                    onClick={addToCart}
                    style={{ marginRight: "15px" }}
                  >
                    <FontAwesomeIcon icon={faShoppingCart} style={{ color: 'white', fontSize: '1.5rem' }} />
                    <span style={{fontSize:'15px',fontWeight:'normal'}} className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cartCount}
                      <span className="visually-hidden">unread messages</span>
                    </span>
                  </button>
                  <div className="dropdown">
                    <button
                      className="btn dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Hello {user.firstName}!
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to="/profile"
                        >
                          Profile
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to="/requestHistory"
                        >
                          Request History
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to="/orderHistory"
                        >
                          Order History
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to="/password/reset/:token"
                        >
                          Change password
                        </NavLink>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="dropdown-item"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <NavLink to="/login">
                    <button className="sign-in">Sign in</button>
                  </NavLink>
                  <NavLink to="/register">
                    <button className="sign-up">Sign up</button>
                  </NavLink>
                </>
              )}
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
