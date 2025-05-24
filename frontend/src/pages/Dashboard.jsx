import React, { useEffect, useState } from "react";
import instance from "../api/axios";
// import { useNavigate } from "react-router-dom";

// const navigate = useNavigate();
const Dashboard = () => {
  const [pdfs, setPdfs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const token = localStorage.getItem("token");

  const fetchPDFs = async () => {
    try {
      const res = await instance.get("/api/pdf/mypdfs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPdfs(res.data.pdfs || []);
    } catch (err) {
      console.error("Failed to fetch PDFs:", err);
    }
  };

  useEffect(() => {
    fetchPDFs();
  }, []);

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      await axios.post("/api/files/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setSelectedFile(null);
      fetchPDFs();
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  const filteredPDFs = pdfs.filter((pdf) =>
    pdf.original_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <style>{`
        .dashboard-container {
          min-height: 100vh;
          background: linear-gradient(180deg, #6C2CBD 0%, #311B92 100%);
          padding: 2rem 1rem;
          color: white;
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
          padding: 2rem;
          max-width: 800px;
          margin: auto;
        }
        .upload-section,
        .search-section {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .upload-btn {
          background: linear-gradient(90deg, #E100FF 0%, #7F00FF 100%);
          border: none;
          border-radius: 8px;
          padding: 0.75rem;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        .upload-btn:hover {
          background: linear-gradient(90deg, #7F00FF 0%, #E100FF 100%);
        }
        .search-bar {
          padding: 0.75rem 1rem;
          border-radius: 8px;
          border: none;
          background: rgba(255, 255, 255, 0.15);
          color: white;
        }
        .search-bar::placeholder {
          color: #ddd;
        }
        .pdf-item {
          background: rgba(255, 255, 255, 0.1);
          padding: 1rem;
          border-radius: 12px;
          margin-bottom: 1rem;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: background 0.3s;
        }
        .pdf-item:hover {
          background: rgba(255, 255, 255, 0.2);
        }
        .pdf-name {
          font-weight: 600;
        }
        .pdf-meta {
          font-size: 0.85rem;
          color: #ddd;
        }
      `}</style>

      <div className="dashboard-container">
        <div className="glass-card">
          <h2 className="text-2xl font-bold mb-6 text-center">📂 Your PDFs</h2>

          {/* Upload Section */}
          <div className="upload-section">
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setSelectedFile(e.target.files[0])}
              style={{ color: "white" }}
            />
            {selectedFile && (
              <div style={{ color: "#ccc" }}>{selectedFile.name}</div>
            )}
            <button className="upload-btn" onClick={handleUpload}>
              Upload PDF
            </button>
          </div>

          {/* Search Section */}
          <div className="search-section">
            <input
              className="search-bar"
              type="text"
              placeholder="🔍 Search by filename..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* PDFs List */}
          <div>
            {filteredPDFs.length > 0 ? (
              filteredPDFs.map((pdf) => (
                <div
                  key={pdf.id}
                  className="pdf-item"
                  onClick={() => (window.location.href = `/pdf/${pdf.id}`)}
                >
                  <div>
                    <div className="pdf-name">📄 {pdf.original_name}</div>
                    <div className="pdf-meta">
                      Uploaded: {new Date(pdf.created_at).toLocaleString()}
                    </div>
                  </div>
                  <div style={{ color: "#BB86FC" }}>Open ➜</div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-300">No PDFs found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
