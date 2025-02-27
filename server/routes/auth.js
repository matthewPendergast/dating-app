import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { pool } from "../config/db.js";

const router = express.Router();

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const userQuery = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
        const user = userQuery.rows[0];

        if (!user) {
            return res.status(404).json({ success: false, errors: ["User not found."] });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ success: false, errors: ["Incorrect password."] });
        }

        const tokenValue = jwt.sign(
            { userID: user.id, username: user.username },
            process.env.JWTVAL,
            { expiresIn: "1d" }
        );

        res.cookie("app", tokenValue, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 86400000,
        });

        res.status(200).json({ success: true, message: "Login successful", token: tokenValue });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, errors: ["An error occurred. Please try again."] });
    }
});

router.post("/register", async (req, res) => {
    const { username, password, first_name, last_name, dob, gender } = req.body;
    let errors = [];

    const usernameRegex = /^[A-Za-z0-9]+$/;
    if (!username || username.length < 3 || !usernameRegex.test(username)) {
        errors.push("Username must be at least 3 characters long and contain only letters and numbers.");
    }

    if (!password || password.length < 8 || 
        !/[A-Z]/.test(password) || 
        !/[a-z]/.test(password) || 
        !/[0-9]/.test(password) || 
        !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.push("Password must be at least 8 characters long and include an uppercase letter, lowercase letter, number, and symbol.");
    }

    const nameRegex = /^[A-Za-z]+$/;
    if (first_name && !nameRegex.test(first_name)) {
        errors.push("First name can only contain letters.");
    }
    if (last_name && !nameRegex.test(last_name)) {
        errors.push("Last name can only contain letters.");
    }

    if (!dob) {
        errors.push("Date of birth is required.");
    } else {
        const dobDate = new Date(dob);
        const today = new Date();
        const minAgeDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

        if (dobDate > minAgeDate) {
            errors.push("You must be at least 18 years old to sign up.");
        }
    }

    const validGenders = ["male", "female", "other", ""];
    if (!validGenders.includes(gender)) {
        errors.push("Invalid gender selection.");
    }

    if (errors.length > 0) {
        return res.status(400).json({ success: false, errors });
    }

    try {
        const userExists = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
        if (userExists.rowCount > 0) {
            return res.status(400).json({ success: false, errors: ["Username is already taken."] });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await pool.query(
            "INSERT INTO users (username, password, first_name, last_name, dob, gender) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, username",
            [username, hashedPassword, first_name, last_name, dob, gender]
        );

        const user = newUser.rows[0];

        const tokenValue = jwt.sign(
            { userID: user.id, username: user.username },
            process.env.JWTVAL,
            { expiresIn: "1d" }
        );

        res.cookie("app", tokenValue, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 86400000,
        });

        res.status(201).json({ success: true, message: "User registered successfully", token: tokenValue });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, errors: ["An error occurred. Please try again."] });
    }
});

router.get("/logout", (req, res) => {
    res.clearCookie("app");
    res.status(200).json({ success: true, message: "Logout successful" });
});

export default router;
