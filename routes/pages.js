const express = require("express");
const router = express.Router();
const pages = [
    "index"
];

pages.forEach((page) => {
    router.get(`/${page}`, (req, res) => {
        res.render(page);
    });
});

module.exports = router;
