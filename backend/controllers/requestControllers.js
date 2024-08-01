// controllers/restaurantRequestController.js

const cloudinary = require("cloudinary");
const Requests = require("../model/requestModel");
const xss = require('xss');

const multer = require('multer');
const storage = multer.memoryStorage(); 
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, 
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Only images of type JPG, JPEG, and PNG are allowed!');
    }
  }
}).single('productImage'); 
const submitRequest = async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      return res.status(400).json({ success: false, message: err });
    }

    const userId = req.user.userId;

    // Sanitizing string inputs
    const sanitizedData = {
      userName: xss(req.body.userName),
      productName: xss(req.body.productName),
      phone: xss(req.body.phone),
      size: xss(req.body.size),
      material: xss(req.body.material),
      colour: xss(req.body.colour),
      weight: parseFloat(req.body.weight),
      quantity: parseInt(req.body.quantity),
      price: parseFloat(req.body.price),
    };

    // Validation
    if (!sanitizedData.userName || sanitizedData.userName.length < 3) {
      return res.status(400).json({
        success: false,
        message: "User name must be at least 3 characters long.",
      });
    }

    if (!sanitizedData.productName || sanitizedData.productName.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Product name must be at least 3 characters long.",
      });
    }

    const phonePattern = /^[0-9]{10}$/; // Simple pattern for 10-digit phone numbers
    if (!sanitizedData.phone || !phonePattern.test(sanitizedData.phone)) {
      return res.status(400).json({
        success: false,
        message: "Phone number must be a valid 10-digit number.",
      });
    }

    if (!sanitizedData.size || sanitizedData.size.length < 1) {
      return res.status(400).json({
        success: false,
        message: "Size must be specified.",
      });
    }

    if (!sanitizedData.material || sanitizedData.material.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Material must be at least 3 characters long.",
      });
    }

    if (!sanitizedData.colour || sanitizedData.colour.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Colour must be at least 3 characters long.",
      });
    }

    if (isNaN(sanitizedData.weight) || sanitizedData.weight <= 0) {
      return res.status(400).json({
        success: false,
        message: "Weight must be a positive number.",
      });
    }

    if (isNaN(sanitizedData.quantity) || sanitizedData.quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be a positive integer.",
      });
    }

    if (isNaN(sanitizedData.price) || sanitizedData.price <= 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be a positive number.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image.",
      });
    }

    try {
      // Upload image to Cloudinary
      const uploadedImage = await cloudinary.v2.uploader.upload_stream({
        folder: "requests",
        crop: "scale"
      }, function (error, result) {
        if (error) throw error;
        return result;
      }).end(req.file.buffer);

      // Save the request to the database
      const newRequest = new Requests({
        userName: sanitizedData.userName,
        productName: sanitizedData.productName,
        phone: sanitizedData.phone,
        size: sanitizedData.size,
        material: sanitizedData.material,
        colour: sanitizedData.colour,
        weight: sanitizedData.weight,
        quantity: sanitizedData.quantity,
        price: sanitizedData.price,
        productImageUrl: uploadedImage.secure_url,
        requestedBy: userId,
      });

      await newRequest.save();
      res.status(200).json({
        success: true,
        message: "Request created successfully",
        data: newRequest,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json("Server Error");
    }
  });
};
// const submitRequest = async (req, res) => {
//   upload(req, res, async function (err) {
//     if (err) {
//       return res.status(400).json({ success: false, message: err });
//     }

//     const userId = req.user.userId;

//     // Destructuring
//     const { userName, productName, phone, size, material, colour, weight, quantity, price } = req.body;

//     // Validate data
//     if (!userName || !productName || !phone || !size || !material || !colour || !weight || !quantity || !price || !req.file) {
//       return res.json({
//         success: false,
//         message: "Please fill all the fields and upload an image.",
//       });
//     }

//     try {
//       // Upload image to Cloudinary
//       const uploadedImage = await cloudinary.v2.uploader.upload_stream({
//         folder: "requests",
//         crop: "scale"
//       }, function (error, result) {
//         if (error) throw error;
//         return result;
//       }).end(req.file.buffer);

//       // Save the request to the database
//       const newRequest = new Requests({
//         userName: userName,
//         productName: productName,
//         phone: phone,
//         size: size,
//         material: material,
//         colour: colour,
//         weight: weight,
//         quantity: quantity,
//         price: price,
//         productImageUrl: uploadedImage.secure_url,
//         requestedBy: userId,
//       });

//       await newRequest.save();
//       res.status(200).json({
//         success: true,
//         message: "Request created successfully",
//         data: newRequest,
//       });
//     } catch (error) {
//       console.log(error);
//       res.status(500).json("Server Error");
//     }
//   });
// };


const getAllRequests = async (req, res) => {
  try {
    const requests = await Requests.find();
    res.json({
      success: true,
      message: "Requests fetched successfully",
      requests: requests,
    });
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getSingleRequest = async (req, res) => {
  try {
    const requestId = req.params.id;
    if (!requestId) {
      return res
        .status(400)
        .json({ success: false, message: "Request ID is required!" });
    }
    const request = await Requests.findById(requestId);
    if (!request) {
      return res
        .status(404)
        .json({ success: false, message: "Request not found" });
    }
    res.json({
      success: true,
      message: "Request fetched successfully",
      request,
    });
  } catch (error) {
    console.error("Error fetching request:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
const deleteRequest = async (req, res) => {
  try {
    const requestId = req.params.id;
    if (!requestId) {
      return res
        .status(400)
        .json({ success: false, message: "Request ID is required!" });
    }
    const deletedRequest = await Requests.findByIdAndDelete(requestId);
    if (!deletedRequest) {
      return res
        .status(404)
        .json({ success: false, message: "Request not found" });
    }
    res.json({ success: true, message: "Request deleted successfully" });
  } catch (error) {
    console.error("Error deleting request:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
const updateRequestStatus = async (req, res) => {
  try {
    const requestId = req.params.id;
    const { requestStatus } = req.body;

    console.log(requestId);
    console.log(requestStatus);

    // Check if the bluebook with the given ID exists
    const request = await Requests.findById(requestId);
    if (!request) {
      return res
        .status(404)
        .json({ success: false, message: "Request not found" });
    }

    // Update the bluebook status
    request.requestStatus = requestStatus;
    await request.save();

    return res.json({
      success: true,
      message: "Request status updated successfully",
      request,
    });
  } catch (error) {
    console.error("Error updating request status:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
const getRequestsByUserId = async (req, res) => {
  try {
    const userId = req.user.userId;
    const allRequests = await Requests.find({ requestedBy: userId });
   
   
    res.json({
      success: true,
      message: "All requests by the user is fetched successfully.",
      requests: allRequests,
    });
    console.log(allRequests);
    // Check if the user exists
  } catch (error) {
    console.error("Error fetching requests details.");
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  submitRequest,
  getAllRequests,
  deleteRequest,
  getSingleRequest,
  updateRequestStatus,
  getRequestsByUserId
};
