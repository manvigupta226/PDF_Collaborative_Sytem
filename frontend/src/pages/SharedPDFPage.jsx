import { useParams } from "react-router-dom";

const SharedPDFPage = () => {
  const { share_id } = useParams();
  const baseUrl = "https://pdf-collaborative-sytem-1.onrender.com"
  const downloadUrl = `${baseUrl}/shared/download/${share_id}`;

  return (
    <>
      <style>{`
        .shared-container {
          min-height: 100vh;
          background: linear-gradient(180deg, #6C2CBD 0%, #311B92 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
        }

        .shared-card {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
          border-radius: 16px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
          padding: 2.5rem 2rem;
          width: 100%;
          max-width: 500px;
          color: white;
          text-align: center;
        }

        .shared-card h1 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
        }

        .download-btn {
          background: linear-gradient(90deg, #E100FF 0%, #7F00FF 100%);
          border: none;
          border-radius: 8px;
          padding: 0.75rem 1.2rem;
          font-size: 1rem;
          font-weight: 600;
          color: white;
          cursor: pointer;
          transition: background 0.3s ease;
          display: inline-block;
          text-decoration: none;
          margin-bottom: 1.5rem;
        }

        .download-btn:hover {
          background: linear-gradient(90deg, #7F00FF 0%, #E100FF 100%);
        }

        .info-text {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
        }
      `}</style>

      <div className="shared-container">
        <div className="shared-card">
          <h1>📄 Shared PDF</h1>

          <a
            href={downloadUrl}
            download
            className="download-btn"
          >
            ⬇️ Download PDF
          </a>

          <p className="info-text">
            You are viewing a read-only version shared via link.
          </p>
        </div>
      </div>
    </>
  );
};

export default SharedPDFPage;
