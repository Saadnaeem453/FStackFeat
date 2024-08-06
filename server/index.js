import  express  from "express" 
import cloudinary from "cloudinary"
import dotenv from "dotenv"
dotenv.config();
const app = express();
app.use(express.urlencoded())
const PORT = process.env.PORT || 4000
app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
})