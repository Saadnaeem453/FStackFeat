import express from "express";
import multer from "multer";
import { createCourse, getCourses,getCoursesWithFilters } from "../controllers/courseController.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });
router.get("/getcourse", getCoursesWithFilters);
router.get("/getcourses", getCourses);

router.post("/createcourse", upload.single("image"), createCourse);

export default router;
