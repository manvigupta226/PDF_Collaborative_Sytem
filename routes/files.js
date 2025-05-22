const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

router.post('/upload', auth, upload.single('file'), async (req, res) => {
  const { originalname, path } = req.file;
  const shareId = uuidv4();

  try {
    await db.execute(
      'INSERT INTO pdfs (user_id, original_name, file_path, shareId) VALUES (?, ?, ?, ?)',
      [req.user, originalname, path, shareId]
    );
    res.status(200).json({ msg: 'File uploaded successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to upload file to DB' });
  }
});

module.exports = router;
