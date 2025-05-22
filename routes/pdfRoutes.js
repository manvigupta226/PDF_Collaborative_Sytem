const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Adjust if your DB config is elsewhere
const auth = require('../middleware/auth'); // Your auth middleware

// Route 1: Get PDFs uploaded by the logged-in user
router.get('/mypdfs', auth, async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM pdfs WHERE user_id = ?', [req.user]);
    res.json({pdfs: rows});
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Route 2: Get a specific PDF with comments
router.get('/:id', async (req, res) => {
  try {
    const [pdf] = await db.execute('SELECT * FROM pdfs WHERE id = ?', [req.params.id]);
    const [comments] = await db.execute(
      'SELECT c.*, u.name FROM comments c JOIN users u ON c.user_id = u.id WHERE c.pdf_id = ?',
      [req.params.id]
    );
    res.json({ pdf: pdf[0], comments });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Route 3: Post a new comment on a PDF
router.post('/:id/comments', auth, async (req, res) => {
  try {
    const { content } = req.body;
    await db.execute(
      'INSERT INTO comments (pdf_id, user_id, content) VALUES (?, ?, ?)',
      [req.params.id, req.user, content]
    );
    res.status(200).json({ msg: 'Comment added' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

module.exports = router;
