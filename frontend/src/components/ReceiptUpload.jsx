import React, { useState } from "react";
import axios from "axios";

const ReceiptUpload = ({ onUpload }) => {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("receipt", file);

    try {
      setUploading(true);
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:5000/api/uploads/receipt", formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });

      onUpload(response.data.url); 
    } catch (error) {
      console.error("Upload error", error);
      alert("Failed to upload receipt");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mt-4">
      <input type="file" onChange={handleFileChange} className="border p-2 w-full" />
      {uploading && <p className="text-gray-500 mt-2">Uploading...</p>}
    </div>
  );
};

export default ReceiptUpload;