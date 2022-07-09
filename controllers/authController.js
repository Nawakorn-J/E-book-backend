const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");
// const { Op } = require("sequelize");
const { User } = require("../models");
const createError = require("../utils/createError");

const getToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

exports.login = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({
      where: { userName: userName },
    });

    if (!user) {
      createError("invalid credential", 400);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      createError("invalid credential", 400);
    }
    const token = getToken({ id: user.id });
    res.json({ token });
  } catch (err) {
    next(err);
  }
};

exports.register = async (req, res, next) => {
  try {
    const { userName, email, firstName, lastName, password, confirmPassword } =
      req.body;

    if (!userName) {
      createError("userName  is required", 400);
    }

    if (!email) {
      createError("email  is required", 400);
    }

    if (!password) {
      createError("password is required", 400);
    }
    if (confirmPassword !== password) {
      createError("password and confirm password is not match", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      userName,
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const token = getToken({ id: user.id });
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};
