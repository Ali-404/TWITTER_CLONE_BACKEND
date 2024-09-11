import { configDotenv } from "dotenv";
configDotenv();



import e,{} from "express"
import web from "./routes/web.js"
const app = e()

// middlewares
app.use(e.json()); 


app.get("/",(_,res) =>res.redirect("/api/v1"));


// my main router
app.use("/api/v1", web);


app.listen(3000, () => {
    console.log("Connected to port 3000")
})


export default app;