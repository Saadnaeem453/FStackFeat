import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: mongoose.Schema.Types.ObjectId, ref: "Image", required: true },
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);

export default Course;
