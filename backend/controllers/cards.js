const Card = require("../models/card");
const { NotFoundError, ForbiddenError } = require("../errors");

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (err) {
    next(err);
  }
};

const postCards = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const createdCard = await Card.create({ name, link, owner: req.user._id });
    res.status(201).json(createdCard);
  } catch (err) {
    next(err);
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.cardId);
    if (!card) {
      throw new NotFoundError("Tarjeta no encontrada");
    }
    if (card.owner.toString() !== req.user._id) {
      throw new ForbiddenError("No tienes permiso para eliminar esta tarjeta");
    }

    await Card.findByIdAndDelete(req.params.cardId);
    res.json({ message: "Tarjeta eliminada exitosamente" });
  } catch (err) {
    next(err);
  }
};

const putCardLike = async (req, res, next) => {
  try {
    const updatedCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (!updatedCard) {
      throw new NotFoundError("ID de tarjeta no encontrado");
    }
    res.json(updatedCard);
  } catch (err) {
    next(err);
  }
};

const deleteCardLike = async (req, res, next) => {
  try {
    const updatedCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (!updatedCard) {
      throw new NotFoundError("ID de tarjeta no encontrado");
    }
    res.json(updatedCard);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCards,
  postCards,
  deleteCard,
  putCardLike,
  deleteCardLike,
};
