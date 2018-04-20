const express = require("express");
const router = express.Router();

//Index
router.get("/", function(req, res) {});

//Create
router.post("/", function(req, res) {});

//Show
router.get("/:id", function(req, res) {});

//Update
router.put("/:id", function(req, res) {});

//Delete
router.delete("/:id", function(req, res) {});

module.exports = router;
