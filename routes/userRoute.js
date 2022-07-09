const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.get("/me", userController.getMe);
router.get("/:userId", userController.getUserbyId);

module.exports = router;
