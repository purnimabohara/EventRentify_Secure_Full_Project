

const logger = require('../logger');
const Log = require('../model/log');

const logRequests = async (req, res, next) => {
    const { method, url, body, query, params } = req;
    // const userId = req.body.userId || req.user?._id || 'Anonymous'; 
    const userId = '66c030fe11d2669bd9f5c227'; 

    // Create a descriptive log message
    let actionDescription;

    if (url.includes('/create')) {
        actionDescription = `User ${userId} attempted to create a user with data: ${JSON.stringify(body)}`;
    } else if (url.includes('/login')) {
        actionDescription = `User ${userId} attempted to log in`;
    } else if (url.includes('/verify')) {
        actionDescription = `User ${userId} attempted to verify email with ID: ${params.id}`;
    } else if (url.includes('/forgot/password')) {
        actionDescription = `User ${userId} requested a password reset with email: ${body.email}`;
    } else if (url.includes('/password/reset')) {
        actionDescription = `User ${userId} attempted to reset password using token: ${params.token}`;
    } else if (url.includes('/updateUser')) {
        actionDescription = `User ${userId} attempted to update user ID: ${params.id} with data: ${JSON.stringify(body)}`;
    } else if (url.includes('/changePassword')) {
        actionDescription = `User ${userId} attempted to change password for user ID: ${params.userId}`;
    } else if (url.includes('/get_categories')) {
        actionDescription = `User ${userId} requested all categories`;
    } else if (url.includes('/get_category')) {
        actionDescription = `User ${userId} requested category details for ID: ${params.id}`;
    } else if (url.includes('/get_item')) {
        actionDescription = `User ${userId} requested item details for ID: ${params.id}`;
    } else if (url.includes('/submit-request')) {
        actionDescription = `User ${userId} submitted a request with data: ${JSON.stringify(body)}`;
    } else if (url.includes('/get_requestsbyUser')) {
        actionDescription = `User ${userId} requested their submitted requests`;
    } else if (url.includes('/submit-booking')) {
        actionDescription = `User ${userId} submitted a booking with data: ${JSON.stringify(body)}`;
    } else if (url.includes('/get_booking')) {
        actionDescription = `User ${userId} requested booking details for ID: ${params.id}`;
    } else if (url.includes('/get_bookingbyUser')) {
        actionDescription = `User ${userId} requested their submitted bookings`;
    } else if (url.includes('/updateStatus')) {
        actionDescription = `User ${userId} updated booking status for ID: ${params.id}`;
    } else if (url.includes('/updateRequestStatus')) {
        actionDescription = `User ${userId} updated request status for ID: ${params.id}`;
    } else if (url.includes('/search')) {
        actionDescription = `User ${userId} searched for items with query: ${JSON.stringify(query)}`;
    } else if (url.includes('/addToCart')) {
        actionDescription = `User ${userId} added an item to their cart with data: ${JSON.stringify(body)}`;
    } else if (url.includes('/getCartByUserID')) {
        actionDescription = `User ${userId} requested their cart details`;
    } else if (url.includes('/getSingleCart')) {
        actionDescription = `User ${userId} requested cart details for ID: ${params.id}`;
    } else if (url.includes('/updateCart')) {
        actionDescription = `User ${userId} updated their cart for ID: ${params.id}`;
    } else if (url.includes('/removeFromCart')) {
        actionDescription = `User ${userId} removed an item from their cart for ID: ${params.id}`;
    } else if (url.includes('/createShippingInfo')) {
        actionDescription = `User ${userId} created shipping info with data: ${JSON.stringify(body)}`;
    } else if (url.includes('/getShippingInfoByUserID')) {
        actionDescription = `User ${userId} requested their shipping information`;
    } else if (url.includes('/getSingleShippingInfo')) {
        actionDescription = `User ${userId} requested shipping info for ID: ${params.id}`;
    } else if (url.includes('/updateShippingInfo')) {
        actionDescription = `User ${userId} updated their shipping info for ID: ${params.id} with data: ${JSON.stringify(body)}`;
    } else if (url.includes('/createOrder')) {
        actionDescription = `User ${userId} created an order with data: ${JSON.stringify(body)}`;
    } else if (url.includes('/getSingleOrder')) {
        actionDescription = `User ${userId} requested order details for ID: ${params.id}`;
    } else if (url.includes('/getOrderByUserID')) {
        actionDescription = `User ${userId} requested their order details`;
    } else if (url.includes('/upsertRating')) {
        actionDescription = `User ${userId} upserted a rating with data: ${JSON.stringify(body)}`;
    } else if (url.includes('/rating')) {
        actionDescription = `User ${userId} requested their ratings`;
    } else if (url.includes('/check-password-strength')) {
        actionDescription = `User ${userId} checked the strength of their password with data: ${JSON.stringify(body)}`;
    } else {
        actionDescription = `User ${userId} made a ${method} request to ${url} with body: ${JSON.stringify(body)}`;
    }

    // Save the log to the database
    try {
        await Log.create({
            userId,
            method,
            url,
            headers: req.headers,
            body,
            query,
            params,
            actionDescription
        });
        
    } catch (error) {
        logger.error(`Failed to save log to database: ${error.message}`);
    }

    next();
};

module.exports = logRequests;
