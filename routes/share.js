const express = require('express');
const router = express.Router();
const db = require('../config/db');
const path = require('path');

router.get('/:shareId', async (req, res) => {
  try {
    const [pdf] = await db.execute('SELECT * FROM pdfs WHERE shareId = ?', [req.params.shareId]);
    const pathDir = __dirname + '/../uploads/'+pdf[0].original_name;
    // const filePath = path.resolve(pathDir);
    console.log(pathDir);
    return res.download(pathDir, pdf[0].original_name);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = router;
