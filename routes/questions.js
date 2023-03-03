const express = require("express");
const router = express.Router();
const question = require("../controller/questions");

router.get("/questions", question);

module.exports = router;
