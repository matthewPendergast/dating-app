import express from "express";

const router = express.Router();

router.get("/", (req, res) => res.json({ message: "Welcome to the API" }));
router.get("/signup", (req, res) => res.json({ message: "Signup endpoint" }));

export default router;
