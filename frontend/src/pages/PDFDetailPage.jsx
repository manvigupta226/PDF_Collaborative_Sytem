import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PDFDetailPage = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [pdf, setPdf] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchPDFDetails = async () => {
      try {
        const res = await axios.get(`/api/pdf/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPdf(res.data.pdf);
        setComments(res.data.comments || []);
      } catch (err) {
        console.error("Error fetching PDF:", err);
      }
    };

    fetchPDFDetails();
  }, [id, token]);

  const handleCommentPost = async () => {
    try {
      const res = await axios.post(
        `/api/pdf/${id}/comments`,
        { content: newComment },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setComments(res.data.comments || []);
      setNewComment("");
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  if (!pdf) return <div className="text-white p-6 text-center">Loading PDF...</div>;

  const shareLink = `${window.location.origin}/shared/${pdf.share_id}`;

  return (
    <>
      <style>{`
        .detail-page {
          min-height: 100vh;
          background: linear-gradient(180deg, #6C2CBD 0%, #311B92 100%);
          display: flex;
          justify-content: center;
          padding: 2rem 1rem;
        }
        .detail-card {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
          border-radius: 16px;
          padding: 2rem;
          max-width: 800px;
          width: 100%;
          color: white;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        }
        .detail-card h1 {
          font-size: 1.8rem;
          font-weight: bold;
          margin-bottom: 1.5rem;
        }
        iframe {
          border-radius: 10px;
          border: none;
          width: 100%;
          height: 600px;
          margin-bottom: 2rem;
        }
        input.share-link {
          width: 100%;
          border: none;
          padding: 0.7rem 1rem;
          border-radius: 8px;
          font-size: 0.9rem;
          color: #111;
          background: rgba(255, 255, 255, 0.85);
          margin-bottom: 2rem;
        }
        .comment-box {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 0.75rem 1rem;
        }
        .comment-author {
          font-size: 0.8rem;
          color: #ccc;
        }
        .comment-text {
          font-size: 0.95rem;
          margin-bottom: 0.25rem;
        }
        .comment-input {
          flex-grow: 1;
          border: none;
          padding: 0.6rem 1rem;
          border-radius: 8px;
          font-size: 0.95rem;
          background: rgba(255, 255, 255, 0.9);
          color: #111;
          outline: none;
        }
        .comment-btn {
          background: linear-gradient(90deg, #E100FF 0%, #7F00FF 100%);
          border: none;
          padding: 0.6rem 1.2rem;
          color: white;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
        }
        .comment-btn:hover {
          background: linear-gradient(90deg, #7F00FF 0%, #E100FF 100%);
        }
      `}</style>

      <div className="detail-page">
        <div className="detail-card">
          <h1>{pdf.filename}</h1>

          <iframe
            src={pdf.url}
            title="PDF Viewer"
          ></iframe>

          <div>
            <h2 className="text-lg font-semibold mb-2">🔗 Shareable Link:</h2>
            <input
              type="text"
              className="share-link"
              readOnly
              value={shareLink}
              onClick={(e) => e.target.select()}
            />
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-3">💬 Comments</h2>
            <div className="space-y-3 mb-4">
              {comments.map((comment, index) => (
                <div key={index} className="comment-box">
                  <div className="comment-text">{comment.text}</div>
                  <div className="comment-author">
                    — {comment.author?.name || "Anonymous"},{" "}
                    {new Date(comment.createdAt).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newComment}
                placeholder="Write a comment..."
                onChange={(e) => setNewComment(e.target.value)}
                className="comment-input"
              />
              <button
                onClick={handleCommentPost}
                className="comment-btn"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PDFDetailPage;
