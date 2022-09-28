const express = require("express");
const router = express.Router();

const {
  getUsers,
  signup,
  signin,
  verify,
  forgotPassword,
  resetPassword,
  profileEdit,
  profileUpdate,
} = require("../controllers/userController");
// const { isAuthenticatedUser } = require('../middlewares/auth');
router.route("/userList").get(getUsers);
router.route("/user/new").post(signup);
router.route("/signin").post(signin);
router.route("/verify/:token").get(verify);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/user/profile/edit/:id").get(profileEdit);
router.route("/user/profile/update/:id").put(profileUpdate);

module.exports = router;
