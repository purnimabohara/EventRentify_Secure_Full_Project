// const checkPasswordExpiration = async (req, res, next) => {
//     const user = req.user;
  
//     if (user.isPasswordExpired()) {
//       const gracePeriod = 5 * 60 * 1000; // 5 minutes grace period
//       const passwordExpiryTime = new Date(user.passwordChangedAt).getTime() + 1 * 60 * 1000; // 1 minute expiration
  
//       if (!user.gracePeriodStart) {
//         user.gracePeriodStart = Date.now();
//         await user.save();
//       }
  
//       if (Date.now() - user.gracePeriodStart > gracePeriod) {
//         req.logout();
//         return res.status(403).json({
//           success: false,
//           message: "Your password has expired and the grace period has ended. Please log in again after resetting your password.",
//         });
//       }
  
//       return res.status(200).json({
//         success: false,
//         message: "Your password has expired. Please change your password within the next 5 minutes.",
//         redirect: "/profile", // Redirect to profile page for password change
//       });
//     }
  
//     next();
//   };
  
//   module.exports = checkPasswordExpiration;
  