//improve code efficency
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

const streamUpload = (buffer, folder = "/Mern-Chat-App/") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        chunk_size: 6000000, // 6MB chunks
      },
      (err, result) => {
        if (result) resolve(result);
        else reject(err);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const result = await streamUpload(req.file.buffer);
    res.json({ url: result.secure_url, public_id: result.public_id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
