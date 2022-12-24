import express from "express";
import multer from "multer";
import dotenv from "dotenv";
import { connectDb } from "./db/Connect.js";
import contactRoute from "./routes/ContactRoute.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// make a url for photos 
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use("/upload", express.static(path.join(__dirname, "/upload")));

// upload image 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "upload")
    }, filename: (req, file, cb) => {
        cb(null, req.body.name)
    }
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
     res.status(200).json("File has been uploaded");
})

// connect the database 
const dataBaseURL = process.env.DATABASE;
connectDb(dataBaseURL);

// main page 
app.get("/api/contact", (req, res) => {
    res.send("Welcome to Contact app Api")
})

// all routes 
app.use("/api/contact", contactRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is connected to port ${process.env.PORT} `);
});
