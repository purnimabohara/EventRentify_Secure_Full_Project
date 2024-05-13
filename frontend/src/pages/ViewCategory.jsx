


// import React, { useState, useEffect } from "react";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import DOMPurify from 'dompurify';


// import { Link, useNavigate } from 'react-router-dom';
// import { getAllCategories } from "../apis/Api";
// import "../style/viewRes.css";

// const ViewCategory = () => {
//   const [categories, setCategories] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     getAllCategories()
//       .then((res) => {
//         const fetchedCategories = res.data.categories;
//         setCategories(fetchedCategories);
//       })
//       .catch((error) => {
//         console.error("Error fetching categories: ", error);
//       });
//   }, []);

//   const handleSearch = () => {
//     const sanitizedQuery = DOMPurify.sanitize(searchQuery);
  
//     const filteredItems = categories.reduce((acc, category) => {
//       const matchedItems = category.items.filter(item =>
//         item.itemName.toLowerCase().includes(sanitizedQuery.toLowerCase())
//       );
//       if (matchedItems.length > 0) {
//         acc.push(...matchedItems);
//       }
//       return acc;
//     }, []);
  
//     navigate('/filteredItems', { state: { filteredItems } });
//   };
  
//   // const handleSearch = () => {
//   //   const filteredItems = categories.reduce((acc, category) => {
//   //     const matchedItems = category.items.filter(item =>
//   //       item.itemName.toLowerCase().includes(searchQuery.toLowerCase())
//   //     );
//   //     if (matchedItems.length > 0) {
//   //       acc.push(...matchedItems);
//   //     }
//   //     return acc;
//   //   }, []);

//   //   navigate('/filteredItems', { state: { filteredItems } });
//   // };

//   const handleChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

  

//   return (
//     <>
//       <Navbar />
//       <div className="resDetails">
//         <div className="left-aligned-textt">
//           <p className="main-textt">Categories</p>
//           <p className="main-textt1">
//             Browse different food items from our featured categories
//           </p>
//         </div>

//         <div className="search-container">
//           <div className="search-bar">
//             <input
//               className="search-input1"
//               type="text"
//               placeholder="What are you looking for"
//               value={searchQuery}
//               onChange={handleChange}
//             />
//             <button
//               type="button"
//               className=" search-button11"
//               onClick={handleSearch}
//             >
//               Search
//             </button>
          
//             <div className="dropdownn">
//                  <button
//                     className="btn dropdown-toggle "
//                     type="button"
//                     data-bs-toggle="dropdown"
//                     aria-expanded="false"
//                   >
//                     Select Category
//                   </button>
//                   <ul className="dropdown-menu">
//                   {categories.map((category) => (
//                     <li>
//                       <Link
//                         className="dropdown-item "
//                         to={`/viewItem/${category._id}/item`}>
                      
//                         {category.categoryName}
//                       </Link>
//                     </li>
                    
//                   ))}
//                   </ul>
//                 </div>
//           </div>
//         </div>

//         <div className="grid-containerr">
//           {categories.map((category) => (
//             <div key={category._id} className="grid-itemm">
//               <img
//                 src={category.categoryImageUrl}
//                 alt={category.categoryName}
//                 className="categoryy-image"
//               />
//               <div className="overlayy">
//                 <Link
//                   className="overlay-link"
//                   to={`/viewItem/${category._id}/item`}
//                 >
//                   <h5>{category.categoryName}</h5>
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       <Footer/>
//     </>
//   );
// };

// export default ViewCategory;
import React, { useState, useEffect } from "react";
import DOMPurify from 'dompurify';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useNavigate } from 'react-router-dom';
import { getAllCategories } from "../apis/Api";
import "../style/viewRes.css";

const ViewCategory = () => {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getAllCategories()
      .then((res) => {
        const fetchedCategories = res.data.categories;
        setCategories(fetchedCategories);
      })
      .catch((error) => {
        console.error("Error fetching categories: ", error);
      });
  }, []);

  const handleSearch = () => {
    const sanitizedQuery = DOMPurify.sanitize(searchQuery);

    const filteredItems = categories.reduce((acc, category) => {
      const matchedItems = category.items.filter(item =>
        item.itemName.toLowerCase().includes(sanitizedQuery.toLowerCase())
      );
      if (matchedItems.length > 0) {
        acc.push(...matchedItems);
      }
      return acc;
    }, []);

    navigate('/filteredItems', { state: { filteredItems } });
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="resDetails">
        <div className="left-aligned-textt">
          <p className="main-textt">Categories</p>
          <p className="main-textt1">
            Browse different food items from our featured categories
          </p>
        </div>

        <div className="search-container">
          <div className="search-bar">
            <input
              className="search-input1"
              type="text"
              placeholder="What are you looking for"
              value={searchQuery}
              onChange={handleChange}
            />
            <button
              type="button"
              className=" search-button11"
              onClick={handleSearch}
            >
              Search
            </button>
          
            <div className="dropdownn">
                 <button
                    className="btn dropdown-toggle "
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Select Category
                  </button>
                  <ul className="dropdown-menu">
                  {categories.map((category) => (
                    <li key={category._id}>
                      <Link
                        className="dropdown-item "
                        to={`/viewItem/${category._id}/item`}>
                      
                        {category.categoryName}
                      </Link>
                    </li>
                    
                  ))}
                  </ul>
                </div>
          </div>
        </div>

        <div className="grid-containerr">
          {categories.map((category) => (
            <div key={category._id} className="grid-itemm">
              <img
                src={category.categoryImageUrl}
                alt={category.categoryName}
                className="categoryy-image"
              />
              <div className="overlayy">
                <Link
                  className="overlay-link"
                  to={`/viewItem/${category._id}/item`}
                >
                  <h5>{category.categoryName}</h5>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default ViewCategory;
