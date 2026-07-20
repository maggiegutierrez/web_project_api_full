const router = require("express").Router();
const {
  getCards,
  postCards,
  deleteCard,
  putCardLike,
  deleteCardLike,
} = require("../controllers/cards");
const {
  validateCardId,
  validateCreateCard,
} = require("../middlewares/validators");

router.get("/", getCards);
router.post("/", validateCreateCard, postCards);
router.delete("/:cardId", validateCardId, deleteCard);
router.put("/:cardId/likes", validateCardId, putCardLike);
router.delete("/:cardId/likes", validateCardId, deleteCardLike);

module.exports = router;
