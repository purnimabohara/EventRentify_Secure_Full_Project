const cloudinary = require("cloudinary");
const Cart=require("../model/addToCartModel");
const Item=require("../model/itemModel");
const xss = require("xss");

const addToCart = async (req, res) => {
    const userId = xss(req.user.userId);
    const { itemID, cartQuantity } = req.body;
  
    if (!userId || !itemID || !cartQuantity) {
      return res.json({
        success: false,
        message: "Please provide all the details",
      });
    }
  
    try {
      const existingInCart = await Cart.findOne({
        userID: userId,
        itemID: xss(itemID),
      });
  
      if (existingInCart) {
        return res.json({
          success: false,
          message: "This item is already in shopping Bag",
        });
      }
  
      const item = await Item.findById(xss(itemID));
      const totalPrice = item.itemPrice * xss(cartQuantity);
  
      const newCart = new Cart({
        userID: userId,
        itemID: xss(itemID),
        totalPrice: totalPrice,
        cartQuantity: xss(cartQuantity),
      });
  
      await newCart.save();
  
      res.status(200).json({
        success: true,
        message: "Item added to Cart",
        data: newCart,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json("Server Error");
    }
  };

const getCartByUserID = async (req, res) => {
    const id = req.user.userId;
    try {
        const cart = await Cart.find({ userID: id }).populate('itemID', 'itemName itemPrice itemSecurityDeposit size material colour weight itemImage owner contact categoryName');
        res.json({
            message: "retrieved",
            success: true,
            cart: cart,
        });
    } catch (e) {
        res.json({
            message: "error",
            success: false,
        });
    }
};

const getSingleCart = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.json({
            success: false,
            message: "Cart id is required!"
        })
    }
    try {
        const singleCart = await Cart.findById(id);
        res.json({
            success: true,
            message: "Cart fetched successfully",
            cart: singleCart
        })

    } catch (error) {
        console.log(error);
        res.status(500).json("Server Error")

    }
}
const updateCart = async (req, res) => {
    console.log(req.body);

    const {
        userID,
        itemID,
        cartQuantity,
    } = req.body;

    const id = req.params.id;
    if (!userID || !itemID || !cartQuantity) {
        return res.json({
            success: false,
            message: "All fields are required!"
        });
    }
    try {
        const item = await Item.findById(itemID);
        const totalPrice = item.itemPrice  * cartQuantity;

        const updatedCart = {
            userID: userID,
            itemID: itemID,
            totalPrice: totalPrice,
            cartQuantity: cartQuantity,
        };

        await Cart.findByIdAndUpdate(id, updatedCart);
        res.json({
            success: true,
            message: "Cart updated successfully",
            cart: updatedCart
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};


const removeFromCart = async (req, res) => {
    const id = req.params.id;
    try {
        const removedFromCart = await Cart.findByIdAndDelete(id);
        if (!removedFromCart) {
            return res.json({
                success: false,
                message: "Item not found in Cart",
            });
        }

        res.json({
            success: true,
            message: "Item removed from Cart successfully",
            data: removedFromCart,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

module.exports = {
    addToCart,
    getCartByUserID,
    getSingleCart,
    updateCart,
    removeFromCart
};
