import express from "express";
import cookieParser from "cookie-parser";
import postRoute from "./routes/post.route.js"
import authRouter from "./routes/auth.route.js"
import dotenv from "dotenv"
import mongoose from "mongoose"
import bodyParser from "body-parser";
import cors from "cors"

dotenv.config()
const app = express();
app.use(bodyParser.json({extended:true}))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors({credentials: true ,origin:'http://localhost:3000'}))


app.use("/api/post", postRoute)
app.use("/api/auth", authRouter)

app.get("/api/test", (req,res) => {
    res.send("test")
})



mongoose.connect(process.env.DATABASE_URL_LOCAL)
.then(() => {
    app.listen(8080, () => {
        console.log("Server is running!!");
    })
})

