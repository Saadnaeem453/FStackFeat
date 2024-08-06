import  express  from "express" 
import dotenv from "dotenv"
import dbConnect from './src/config/db.js';
import cors from 'cors';
import uploadRoutes from "../server/src/routes/uplaod.route.js"
const app = express();
dotenv.config();
dbConnect();
app.use(express.json())
app.use(cors());

app.use("/api", uploadRoutes)
app.use(express.urlencoded())
const PORT = process.env.PORT || 4000
app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
})