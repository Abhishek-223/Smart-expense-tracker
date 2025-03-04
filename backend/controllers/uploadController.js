import cloudinary from '../config/cloudinary.js';

export const uploadReceipt = async (req, res) => {
  try {
    const file = req.files.receipt; // Assuming file is sent as 'receipt'
    const result = await cloudinary.uploader.upload(file.path, {
      folder: 'expenses',
    });

    res.json({ url: result.secure_url });
  } catch (error) {
    res.status(500).json({ error: 'Upload failed' });
  }
};
