const express = require("express");
const router = express.Router();

// router.use("/api/v1/auth", require("./api/v1/auth"));
// router.use("/api/v1/user", require("./api/v1/user"));
// router.use("/api/v1/transaction", require("./api/v1/transaction"));
router.use("/api/v1/service", require("./api/v1/service"));
// router.use("/api/v1/category", require("./api/v1/category"));

module.exports = router;
