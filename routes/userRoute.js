const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.get("/me", userController.getMe);
router.get("/:userId", userController.getUserbyId);
router.patch("/profile", userController.userUpdateProfile);

module.exports = router;
