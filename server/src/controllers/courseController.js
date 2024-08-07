import cloudinary from "../config/cloudinaryConfig.js";
import Course from "../models/course.model.js";
import Image from "../models/image.model.js";

export const createCourse = async (req, res) => {
  const { title, price, category, description } = req.body;
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "Courses" },
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    const newImage = new Image({
      url: result.secure_url,
      public_id: result.public_id
    });

    const newCourse = new Course({
      title,
      price,
      category,
      description,
      image: newImage
    });

    await newCourse.save();
    res.status(200).json(newCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const getCoursesWithFilters = async (req, res) => {
  console.log("Fetching courses with filters:", req.query);
  
  // Destructure query parameters
  const { minPrice, maxPrice, category, sortBy, sortOrder, search } = req.query;
  
  // Initialize the query object
  const query = {};

  // Build query based on filters
  if (minPrice && maxPrice) {
    query.price = { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) };
  }
  if (category) {
    query.category = category;
  }
  if (search) {
    query.title = { $regex: new RegExp(search, 'i') }; // Case-insensitive search
  }
  
  // Initialize sort options
  const sortOptions = {};
  if (sortBy) {
    sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;
  }

  try {
    // Fetch courses with filters and sorting
    const courses = await Course.find(query).sort(sortOptions);
    
    // Return the filtered and sorted courses
    res.json(courses);
  } catch (error) {
    // Handle errors
    console.error("Error fetching courses:", error.message);
    res.status(500).json({ message: error.message });
  }
};
export const getCourses = async (req, res) => {
    try {
      const courses = await Course.find({});
      res.status(200).json(courses);
    } catch (error) {
      console.error("Error fetching courses:", error.message);
      res.status(500).json({ message: error.message });
    }
  };