const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const { NotFoundError, UnauthorizedError } = require("../errors");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new UnauthorizedError("Correo o contraseña incorrectos");
    }

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      throw new UnauthorizedError("Correo o contraseña incorrectos");
    }

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" });
    res.send({ token });
  } catch (err) {
    next(err);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

const getUserId = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      throw new NotFoundError("ID de usuario no encontrado");
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new NotFoundError("ID de usuario no encontrado");
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { name, about, avatar, email, password } = req.body;

    const hash = await bcrypt.hash(password, 10);

    const createdUser = await User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    });

    const userToReturn = createdUser.toObject();
    delete userToReturn.password;

    res.status(201).json(userToReturn);
  } catch (err) {
    next(err);
  }
};

const patchUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: req.body.name,
        about: req.body.about,
      },
      { new: true, runValidators: true },
    );
    if (!updatedUser) {
      throw new NotFoundError("ID de usuario no encontrado");
    }
    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
};

const patchAvatar = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { avatar: req.body.avatar },
      { new: true, runValidators: true },
    );
    if (!updatedUser) {
      throw new NotFoundError("ID de usuario no encontrado");
    }
    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUsers,
  getUserId,
  getCurrentUser,
  createUser,
  patchUser,
  patchAvatar,
  login,
};
