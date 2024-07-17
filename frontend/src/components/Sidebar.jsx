import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import '../style/sidebar.css';

const Sidebar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
     // const user = JSON.parse(localStorage.getItem("userData"));
    // //   //logout function
   const navigate=useNavigate()
   const handleLogout=(e)=>{
      e.preventDefault()
      localStorage.clear()
      navigate('/login')
 
   }
  return (
    <nav className="sidebar1 navi">
      <div className="navbar1">
        <div className="logo1">

          
        Welcome {user.firstName}!  
        </div>
        <ul className='ul1'>
        <li className='listItem1 li1'>
          <a className="navLink1" href='/admin/logdashboard'>
              <i className="fas fa-user"></i>
              <span  style={{fontSize:'21px',fontWeight:'normal'}} className="navItem1">User logs</span>
            </a>
          </li>
          <li className='listItem1 li1'>
          <a className="navLink1" href='/admin/usertable'>
              <i className="fas fa-user"></i>
              <span  style={{fontSize:'21px',fontWeight:'normal'}} className="navItem1">Dashboard</span>
            </a>
          </li>
          <li className='li1'>
          <a className="navLink1" href='/admin/admindash'>
              <i className="fas fa-chart-bar"></i>
              <span  style={{fontSize:'21px',fontWeight:'normal'}} className="navItem1">Product List</span>
            </a>
          </li>
          <li className='li1'>
          <a className="navLink1" href='/admin/requestdash'>
              <i className="fas fa-tasks"></i>
              <span  style={{fontSize:'21px',fontWeight:'normal'}} className="navItem1">Request List</span>
            </a>
          </li>
          
          
          <li className='li1'>
          <a className="navLink1" href='/admin/order'>
              <i className="fas fa-tasks"></i>
              <span  style={{fontSize:'21px',fontWeight:'normal'}} className="navItem1">Order List</span>
            </a>
          </li>
          <li className='li1'>
          <button onClick={handleLogout} className="dropdown-sidebar  " style={{fontWeight:"800"}} to="/logout"  >
                 <span style={{fontSize:'21px',fontWeight:'normal'}}>Logout</span>         
                       </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
