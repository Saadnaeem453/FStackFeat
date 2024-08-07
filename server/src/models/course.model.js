import mongoose from "mongoose"

const courseSchema = mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
},{timeStamps: true});
const Course = mongoose.model('Course', courseSchema);
export default Course;