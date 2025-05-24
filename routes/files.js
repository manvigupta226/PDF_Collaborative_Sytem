const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

router.post('/upload', auth, upload.single('file'), async (req, res) => {
  const { originalname } = req.file;
  const share_id = uuidv4();
  const path = `uploads/${originalname}`  

  try {
    await db.query(
      'INSERT INTO pdfs (user_id, original_name, file_path, share_id) VALUES ($1, $2, $3, $4)',
      [req.user, originalname, path, share_id]
    );
    res.status(200).json({ msg: 'File uploaded successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to upload file to DB' });
  }
});

module.exports = router;
