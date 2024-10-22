import dotenv from "dotenv";
import cors from './middlewares/cors.js'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') })



import e,{} from "express"
import web from "./routes/web.js"
const app = e()


// middlewares
app.use(cors)
app.use(e.json()); 



// files

// Define storage settings

  // Initialize multer with storage settings
// export const upload = multer({ storage: storage });
app.use('/uploads', e.static(path.join(__dirname, 'uploads')));


app.get("/",(_,res) =>res.redirect("/api/v1"));


// my main router
app.use("/api/v1", web);


app.listen(3000, () => {
    console.log("Connected to port 3000")
})


export default app;