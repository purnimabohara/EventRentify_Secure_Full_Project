// UserTable.js
 
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { getAllUserApi ,deleteUser} from '../../apis/Api';
import Sidebar from '../../components/Sidebar';
import {  toast } from "react-toastify";
import { faEdit, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const UserTable = () => {
  const [users, setUsers] = useState([]);
 
  useEffect(() => {
    getAllUserApi()
      .then((res) => {
        console.log(res.data);
        setUsers(res.data.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handleDelete=(id)=>{
    const confirmDialog = window.confirm('Are you sure you want to delete this user?')
    if(!confirmDialog){
      return;

    }else{
      //make api call
      deleteUser(id).then((res)=>{
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

 
  return (

    <>
    <Sidebar/>
    <div className="main-content">
        <h2 className="main head">List of Users</h2>
      
     <div className="m-4">
      

 
      <table  className="table table-striped-dash">
        <thead  className="head-dashboard" >
          <tr>
            {/* <th>User ID</th> */}
            <th style={{ backgroundColor:'#9A5865', color: 'white',fontSize:'19px' }}>First Name</th>
            <th style={{ backgroundColor:'#9A5865', color: 'white',fontSize:'19px'}}>Last Name</th>
            <th style={{ backgroundColor:'#9A5865', color: 'white',fontSize:'19px' }}>Email</th>
            <th style={{  backgroundColor:'#9A5865', color: 'white',fontSize:'19px' }}>Action</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((userData) => (
              <tr key={userData._id.$oid}>
                {/* <td>{userData._id.$oid}</td> */}
                <td className="dash-td" style={{marginLeft:'4%'}}>{userData.firstName} </td>
                <td className="dash-td">{userData.lastName}</td>
                <td className="dash-td">{userData.email}</td>
                <td className="dash-td">
                  <div className="btn-group" >
                  <button
                    onClick={() => handleDelete(userData._id)}
                    className="btn btn-danger"
                    style={{marginRight:'10px', width:'10px',height:'40px',verticalAlign:'middle',marginTop:'0'}}
                  >
                   <FontAwesomeIcon icon={faTrash} />
                   
                  </button>

                  </div>
                </td>
                {/* Add more cells as needed */}
              </tr>
            ))}
        </tbody>
      </table>
      </div>
      </div>
    </>
  );
};
 