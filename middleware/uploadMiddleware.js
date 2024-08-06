// const multer = require('multer');

// const imageFileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === 'image/png' ||
//     file.mimetype === 'image/jpg' ||
//     file.mimetype === 'image/jpeg'
//   ) {
//     cb(null, true);
//   } else {
//     cb({ message: 'Only images allowed!' }, false);
//   }
// };

// const upload = multer({
//   storage: multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//       cb(null, Date.now() + '-' + file.originalname);
//     },
//   }),
//   fileFilter: imageFileFilter,
//   limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
// });

// module.exports = upload;
