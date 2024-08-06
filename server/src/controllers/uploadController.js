import cloudinary from '../config/cloudinaryConfig.js';
import Image from '../models/image.model.js';

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'uploads' },
        (error, result) => {
          if (error) {
            return reject(error);
          }
          resolve(result);
        }
      );
      stream.end(req.file.buffer); // End the stream with the file buffer
    });

    const newImage = new Image({
      url: result.secure_url,
      public_id: result.public_id,
    });

    await newImage.save();
    res.status(200).json(newImage);
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export const getALLImages = async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).json(images);
  } catch (error) {
    console.error("Fetching images error:", error);
    res.status(500).json({ message: 'Error while fetching images', error: error.message });
  }
};
