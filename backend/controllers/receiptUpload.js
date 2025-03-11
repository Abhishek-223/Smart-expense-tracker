import cloudinary from "../config/cloudinary.js";

const receiptUpload = async (req, res) => {
  try {
    if (!req.files || !req.files.receipt) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const receipt = req.files.receipt;
    const result = await cloudinary.uploader.upload(receipt.tempFilePath, {
      folder: "expenses",
    });

    res.json({ url: result.secure_url });
  } catch (error) {
    console.error("Upload failed:", error);
    res.status(500).json({ error: "Failed to upload receipt" });
  }
};

export default receiptUpload;
