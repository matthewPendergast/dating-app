require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const db = require("better-sqlite3")("app.db");

// Setup database
db.pragma("journal_mode = WAL");
const createTables = db.transaction(() => {
    db.prepare(`
        CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username STRING NOT NULL UNIQUE,
        password STRING NOT NULL
        )    
    `).run();
});
createTables();

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static("components"));
app.use(express.static("css"));
app.use(express.static("js"));
app.use(express.static("images"));

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

app.get("/", (req, res) => {
    if (req.user) {
        // If user is logged in, redirect to dashboard
        return res.render("dashboard");
    }
    res.render("index");
});

app.get("/index", (req, res) => {
    res.render("index");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/logout", (req, res) => {
    res.clearCookie("app");
    res.redirect("/index");
});

app.post("/login", (req, res) => {
    if (typeof req.body.username !== "string") {
        req.body.username = "";
    }
    if (typeof req.body.email !== "string") {
        req.body.email = "";
    }
    const userStatement = db.prepare("SELECT * FROM users WHERE username = ?");
    const user = userStatement.get(req.body.username);
    
    const match = bcrypt.compareSync(req.body.password, user.password);
    if (!match) {
        // To Do: show error
        return res.render("login")
    }

    const tokenValue = jwt.sign({exp: Math.floor(Date.now() / 1000) + 86400, userID: user.id, username: user.username}, process.env.JWTVAL);
    res.cookie("app", tokenValue, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 86400000,
    });

    res.redirect("/");
});

app.post("/register", (req, res) => {
    if (typeof req.body.username !== "string") {
        req.body.username = "";
    }
    if (typeof req.body.email !== "string") {
        req.body.email = "";
    }

    // Check is username already exists
    const usernameStatement = db.prepare("SELECT * FROM users WHERE username = ?");
    const check = usernameStatement.get(req.body.username);

    if (check) {
        // To Do: display error showing username already exists
    }

    // Encrypt user's password
    const salt = bcrypt.genSaltSync(10);
    req.body.password = bcrypt.hashSync(req.body.password, salt);

    // Insert form values into database
    const statement = db.prepare("INSERT INTO users (username, password) VALUES (?, ?)");
    const result = statement.run(req.body.username, req.body.password);

    const lookup = db.prepare("SELECT * FROM users WHERE ROWID = ?");
    const user = lookup.get(result.lastInsertRowid);

    // Log the user in, give cookie
    const tokenValue = jwt.sign({exp: Math.floor(Date.now() / 1000) + 86400, userID: user.id, username: user.username}, process.env.JWTVAL);
    res.cookie("app", tokenValue, {
        httpOnly: true,
        secure: true,
        sameSite: "strict", // related to CSRF (cross-site request forgery) attacks
        maxAge: 86400000, // cookie is good for 1 day
    });

    res.redirect("/");
});

app.listen(3000);