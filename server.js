import express from "express";
import multer from "multer";
import dotenv from "dotenv";
import { connectDb } from "./db/Connect.js";
import contactRoute from "./routes/ContactRoute.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// upload image 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "upload")
    }, filename: (req, file, cb) => {
        cb(null, "fiver.jpg")
    }
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
     res.status(200).json("File has been uploaded");
})

// connect the database 
const dataBaseURL = process.env.DATABASE;
connectDb(dataBaseURL);

// all routes 
app.use("/api/contact", contactRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is connected to port ${process.env.PORT} `);
});
