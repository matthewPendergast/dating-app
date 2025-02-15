import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import express from "express";
import pageRoutes from "./routes/pages.js";
import authRoutes from "./routes/auth.js";
import Database from "better-sqlite3";
import livereload from "livereload";
import connectLivereload from "connect-livereload";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;
const db = new Database("app.db");

// Setup database
db.pragma("journal_mode = WAL");
const createTables = db.transaction(() => {
    db.prepare(`
        CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username STRING NOT NULL UNIQUE,
        password STRING NOT NULL)    
    `).run();
});
createTables();

// Enable LiveReload in development
const isDev = process.env.NODE_ENV !== "production";

if (isDev) {
    const liveReloadServer = livereload.createServer();
    liveReloadServer.watch(`${__dirname}/views`);
    liveReloadServer.watch(`${__dirname}/public`);    
    app.use(connectLivereload());

    liveReloadServer.server.once("connection", () => {
        setTimeout(() => {
            liveReloadServer.refresh("index");
        }, 100);
    });
}

app.set("view engine", "ejs");
app.set("views", "./views");
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

app.get("/", (req, res) => {
    if (req.user) {
        return res.render("dashboard");
    }
    res.render("index");
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
