const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const courseRoutes = require("./routes/Course");
const paymentRoutes = require("./routes/Payments");
const contactUsRoute = require("./routes/Contact");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");   //To intertain fronted by bakend
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const path = require("path");

const PORT = process.env.PORT || 4000;
dotenv.config();

//database connect
database.Connect();

//middlewares
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
    "http://localhost:3000",
    "https://studynotion-green-kappa.vercel.app",
];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    })
);

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir:"/tmp",
    })
)

//cloudiary connection
cloudinaryConnect();

//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

//default route
app.get("/", (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Your server is up and running.....",
    });
});

app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
})
