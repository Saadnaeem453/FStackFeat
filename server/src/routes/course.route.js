import express from "express"
import multer from "multer"
import { createCourse, getCourse } from "../controllers/courseController.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload =multer({storage}) 
router.get("/" , getCourse)
router.post("/createcourse" , upload.single("image"), createCourse)
export default router;