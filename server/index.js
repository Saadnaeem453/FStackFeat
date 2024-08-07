import  express  from "express" 
import dotenv from "dotenv"
import dbConnect from './src/config/db.js';
import cors from 'cors';
import uploadRoutes from "../server/src/routes/uplaod.route.js"
import courseRoutes from "../server/src/routes/course.route.js"
import Course from  "../server/src/models/course.model.js"
const app = express();
dotenv.config();
dbConnect();
app.use(express.json())
app.use(cors());
app.use(express.urlencoded())

app.use("/api", uploadRoutes)
app.use("/courses", courseRoutes)
const PORT = process.env.PORT || 4000
app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
})