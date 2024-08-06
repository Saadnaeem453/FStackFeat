import express from 'express';
import multer from 'multer';
import { getALLImages, uploadImage } from '../controllers/uploadController.js';

const router = express.Router();

// Use memory storage for multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', upload.single('image'), uploadImage);
router.get('/getImages', getALLImages);

export default router;
