const Users = require("../model/userModel");
const xss = require("xss");

// Fetching user details in the admin panel
const getAllUsers = async (req, res) => {
  console.log("Get all user data request");

  try {
    const users = await Users.find();

    if (!users) {
      console.log("No users found");
      return res.json({
        success: false,
        message: "No user found",
      });
    } else {
      return res.json({
        success: true,
        message: "User found",
        data: users,
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      message: "Error occurred",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = xss(req.params.id);
    const deletedUser = await Users.findByIdAndDelete(userId);

    if (!deletedUser) {
      res.json({
        success: false,
        message: "User not found!",
      });
    } else {
      res.json({
        success: true,
        message: "User deleted successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
};
