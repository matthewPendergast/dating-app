import express from "express";

const router = express.Router();
const pages = ["index", "signup"];

pages.forEach((page) => {
    router.get(`/${page}`, (req, res) => {
        res.render(page);
    });
});

// Change module.exports to export default
export default router;
