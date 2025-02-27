import dotenv from "dotenv";
dotenv.config();

import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import jwt from "jsonwebtoken";

import pageRoutes from "./routes/pages.js";
import authRoutes from "./routes/auth.js";

import { pool } from "./config/db.js"; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use((req, res, next) => {
    try {
        const token = req.cookies.app;
        req.user = token ? jwt.verify(token, process.env.JWTVAL) : false;
    } catch (err) {
        req.user = false;
    }
    res.locals.user = req.user;
    next();
});

app.use("/", pageRoutes);
app.use("/", authRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
    });
} else {
    app.get("/", (req, res) => {
        res.json({ message: "API is running" });
    });
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export { app };