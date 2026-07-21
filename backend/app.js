require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const auth = require("./middlewares/auth");
const { login, createUser } = require("./controllers/users");
const errorHandler = require("./middlewares/errors");
const cors = require("cors");
const {
  validateCreateUser,
  validateLogin,
} = require("./middlewares/validators");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();

app.use(cors());
app.options("*splat", cors());

const { PORT = 3000 } = process.env;
const userRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

app.use(express.json());
app.use(requestLogger);

app.post("/signin", validateLogin, login);
app.post("/signup", validateCreateUser, createUser);

app.use(auth);

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/aroundb");

    app.listen(PORT, () => {
      console.log("Still working!");
    });
  } catch (error) {
    console.log(`Error al conectar a MongoDB: ${error.message}`);
  }
};

app.use("/users", userRouter);
app.use("/cards", cardsRouter);

app.use("*splat", (req, res) => {
  res.status(404).json({ message: "Recurso solicitado no encontrado" });
});

app.use(errorLogger);
app.use(errorHandler);

connectDB();
