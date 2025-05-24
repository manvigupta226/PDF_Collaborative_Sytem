const express = require('express');
const router = express.Router();
const db = require('../config/db');
const path = require('path');

router.get('/:share_id', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM pdfs WHERE share_id = $1', [req.params.share_id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'File not found' });
    }

    const pdf = result.rows[0];
    const pathDir = `${__dirname}/../uploads/${pdf.original_name}`;

    console.log(__dirname, pathDir)

    return res.download(pathDir, pdf.original_name);
  } catch (err) {
    console.error("Error downloading file:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
