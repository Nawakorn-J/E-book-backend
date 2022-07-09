// const fs = require("fs");
const { User } = require("../models");
const createError = require("../utils/createError");

exports.getMe = async (req, res) => {
  const userName = JSON.parse(JSON.stringify(req.user));

  res.json({ userName });
};

exports.getUserbyId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({
      where: { id: userId },
      attributes: { exclude: ["password"] },
    });
    if (!user) {
      createError("user not found", 400);
    }
    const result = JSON.parse(JSON.stringify(user));

    res.json({ user: result });
  } catch (err) {
    next(err);
  }
};
