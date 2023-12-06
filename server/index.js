const express =require("express");
const app =express();
const database =require("./config/database");
const cookieParser =require("cookie-parser");
const cors =require("cors");
const { cloudinaryConnect } =require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

const userRoutes = require("./routers/User")
const teamRoutes = require('./routers/Team')
const taskRoutes = require('./routers/Task')
const bodyparser = require('body-parser')

dotenv.config();

const PORT =process.env.PORT || 5000;

database.connect();

// app.use(bodyparser.json())
app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
    })
);

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp/",
    })
)
cloudinaryConnect();

app.use("/api/v1/auth",userRoutes)
app.use("/api/v1/team",teamRoutes)
app.use("/api/v1/task",taskRoutes)






app.get("/",(req,res) =>{
    return res.json({
        success:true,
        message:"your server is running at port no.."
    })
})

app.listen(PORT, () =>{
    console.log(`app is running at port no ${PORT}`)
})