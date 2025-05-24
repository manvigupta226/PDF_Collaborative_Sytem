const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Adjust if your DB config is elsewhere
const auth = require('../middleware/auth'); // Your auth middleware

// Route 1: Get PDFs uploaded by the logged-in user
router.get('/mypdfs', auth, async (req, res) => {
  try {
    const {rows} = await db.query('SELECT * FROM pdfs WHERE user_id = $1', [req.user]);
    res.json({pdfs: rows});
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Route 2: Get a specific PDF with comments
router.get('/:id', async (req, res) => {
  try {
    const pdfResult = await db.query('SELECT * FROM pdfs WHERE id = $1', [req.params.id]);

    if (pdfResult.rows.length === 0) {
      return res.status(404).json({ error: 'PDF not found' });
    }

    const pdf = pdfResult.rows[0];

    const commentsResult = await db.query(
      'SELECT c.*, u.name as author_name FROM comments c JOIN users u ON c.user_id = u.id WHERE c.pdf_id = $1',
      [req.params.id]
    );

    const comments = commentsResult.rows.map((row) => ({
      text: row.content,
      author: { name: row.author_name },
      createdAt: row.created_at,
    }));

    res.json({ pdf, comments });
  } catch (err) {
    console.error("Error fetching PDF details:", err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});


// Route 3: Post a new comment on a PDF
router.post('/:id/comments', auth, async (req, res) => {
  try {
    const { content } = req.body;
    await db.query(
      'INSERT INTO comments (pdf_id, user_id, content) VALUES ($1, $2, $3)',
      [req.params.id, req.user, content]
    );
    res.status(200).json({ msg: 'Comment added' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

module.exports = router;
