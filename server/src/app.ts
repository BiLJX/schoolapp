//apps
import express from "express"
import mongoose from "mongoose"
import { Server } from "socket.io"
import path from "path"
import jwt from "jsonwebtoken"
import NotificationHandler from "./handler/notificationHandler"
import "./fire";
//middlewares
import bodyParser from "body-parser"
import cors from "cors"
import cookieParser from "cookie-parser"
import { ApiRoutes } from "./routes"
import { USER_PASSWORD_SECRET } from "./secret"

//constants
const CONNECTION_URL = "mongodb+srv://Classital:ofhlUSsqYXioMRXM@cluster0.vyegx.mongodb.net/Schoolapp?retryWrites=true&w=majority"
//const CONNECTION_URL = "mongodb+srv://cluster0.vyegx.mongodb.net/myFirstDatabase"
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

app.get("/*", (req, res)=>{
    res.sendFile(path.join(__dirname,"..", "build", "index.html"));
})
//init app

async function _INIT_(){
    const server = app.listen(PORT, ()=>{
        console.log("listening on port "+PORT+"...")
    });
    const io = new Server(server);
    app.locals.notification = new NotificationHandler(io);
    io.use((socket, next)=>{
        try {
            const token = <string>socket.handshake.query.token;
            if(!token) return next(new Error("Not Authorized"));;
            const user: any = jwt.verify(token, USER_PASSWORD_SECRET);
            if(!user) return next(new Error("Not Authorized"));
            socket.user_id = user.user_id;
            return next()
        } catch (error) {
            console.log(error)
            return;
        }
    }).on("connection", (socket)=>{
        socket.join(socket.user_id);
        // console.log("user connected " + socket.user_id)
    })
}
const options: Object = {
    useNewUrlParser: true,
    useUnifiedTopology: false
}
mongoose.connect(CONNECTION_URL, {}).then(_INIT_)