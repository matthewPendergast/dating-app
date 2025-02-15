require("dotenv").config();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const pageRoutes = require("./routes/pages");
const authRoutes = require("./routes/auth");
const PORT = process.env.PORT || 3000;
const db = require("better-sqlite3")("app.db");

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
    const livereload = require("livereload");
    const connectLivereload = require("connect-livereload");
    const liveReloadServer = livereload.createServer();

    liveReloadServer.watch(__dirname + "/views");
    liveReloadServer.watch(__dirname + "/public");
    app.use(connectLivereload());

    liveReloadServer.server.once("connection", () => {
        setTimeout(() => {
            liveReloadServer.refresh("index");
        }, 100);
    });
}

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static("public"));

app.use(function (req, res, next) {
    // Try to decode incoming cookie
    try {
        const decoded = jwt.verify(req.cookies.app, process.env.JWTVAL);
        req.user = decoded;
    } catch(err) {
        req.user = false;
    }
    res.locals.user = req.user;    
    next();
});

app.use("/", pageRoutes);
app.use("/", authRoutes); 

app.get("/", (req, res) => {
    if (req.user) {
        // If user is logged in, redirect to dashboard
        return res.render("dashboard");
    }
    res.render("index");
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
