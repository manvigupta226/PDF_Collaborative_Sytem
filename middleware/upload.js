const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => cb(null, `${file.originalname}`)
});

const fileFilter = (req, file, cb) => {
  file.mimetype === 'application/pdf' ? cb(null, true) : cb(new Error('Only PDFs allowed'), false);
};

module.exports = multer({ storage, fileFilter });
