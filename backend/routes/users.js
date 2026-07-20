const router = require("express").Router();
const {
  getUsers,
  getUserId,
  getCurrentUser,
  patchAvatar,
  patchUser,
} = require("../controllers/users");

const {
  validateUserId,
  validateUpdateUser,
  validateUpdateAvatar,
} = require("../middlewares/validators");

router.get("/me", getCurrentUser);

router.get("/", getUsers);

router.get("/:userId", validateUserId, getUserId);

router.patch("/me", validateUpdateUser, patchUser);

router.patch("/me/avatar", validateUpdateAvatar, patchAvatar);

module.exports = router;
