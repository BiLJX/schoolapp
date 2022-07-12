//apps
import express from "express"
import mongoose from "mongoose"
import { Server } from "socket.io"
import cookie from "cookie"
import path from "path"

//middlewares
import bodyParser from "body-parser"
import cors from "cors"
import cookieParser from "cookie-parser"
import { ApiRoutes } from "./routes"

//constants
const CONNECTION_URL = "mongodb+srv://billjesh:Billu456@cluster0.vyegx.mongodb.net/Schoolapp?retryWrites=true&w=majority"
const PORT = process.env.PORT || 5000


//app
const app = express()

//using middlewares
app.use(bodyParser.json())
app.use(cors({credentials: true, origin: true}));
app.use(cookieParser())
app.use(express.static(path.join("build")))

//api

app.use("/api", ApiRoutes)

//init app
mongoose.connect(CONNECTION_URL).then(async()=>{
    const server = app.listen(PORT, ()=>{
        console.log("listening on port "+PORT+"...")
    })
})