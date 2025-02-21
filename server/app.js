import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, ".env") });

console.log("Loaded .env file:", path.resolve(__dirname, ".env"));
console.log("Database URL after dotenv config:", process.env.DATABASE_URL);


import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import pageRoutes from "./routes/pages.js";
import authRoutes from "./routes/auth.js";
import { dirname } from "path";
import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false
});

const app = express();
const PORT = process.env.PORT || 5000;

// Setup database
pool.query(`
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        first_name VARCHAR(50),
        last_name VARCHAR(50),
        dob DATE,
        gender VARCHAR(10),
        password TEXT NOT NULL
    )
`);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(`${__dirname}/public`));

app.use(function (req, res, next) {
    try {
        const decoded = jwt.verify(req.cookies.app, process.env.JWTVAL);
        req.user = decoded;
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

app.listen(PORT, () => console.log(`Server running on ${PORT}`));

export { pool };