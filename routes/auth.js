import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Database from "better-sqlite3";

const router = express.Router();
const db = new Database("app.db");

router.post("/login", (req, res) => {
    if (typeof req.body.username !== "string") {
        req.body.username = "";
    }
    if (typeof req.body.email !== "string") {
        req.body.email = "";
    }

    const userStatement = db.prepare("SELECT * FROM users WHERE username = ?");
    const user = userStatement.get(req.body.username);

    if (!user) {
        // To Do: Show error that user doesn't exist
        return res.render("login");
    }

    const match = bcrypt.compareSync(req.body.password, user.password);
    if (!match) {
        // To Do: show error
        return res.render("login");
    }

    const tokenValue = jwt.sign(
        {
            exp: Math.floor(Date.now() / 1000) + 86400, // 1 day expiration
            userID: user.id,
            username: user.username,
        },
        process.env.JWTVAL
    );

    res.cookie("app", tokenValue, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 86400000, // 1 day
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

    // Check if username already exists
    const usernameStatement = db.prepare("SELECT * FROM users WHERE username = ?");
    const check = usernameStatement.get(req.body.username);

    if (check) {
        // To Do: display error showing username already exists
        return res.render("signup"); // Assuming this page handles signup errors
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
    const tokenValue = jwt.sign(
        {
            exp: Math.floor(Date.now() / 1000) + 86400,
            userID: user.id,
            username: user.username,
        },
        process.env.JWTVAL
    );

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

// Change module.exports to export default
export default router;
