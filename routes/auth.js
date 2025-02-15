const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("better-sqlite3")("app.db");

router.post("/login", (req, res) => {
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

router.post("/register", (req, res) => {
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
    const tokenValue = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + 86400,
        userID: user.id,
        username: user.username
    }, process.env.JWTVAL);
    res.cookie("app", tokenValue, {
        httpOnly: true,
        secure: true,
        sameSite: "strict", // related to CSRF (cross-site request forgery) attacks
        maxAge: 86400000, // cookie is good for 1 day
    });

    res.redirect("/");
});

router.get("/logout", (req, res) => {
    res.clearCookie("app");
    res.redirect("/index");
});

module.exports = router;
