
const router = require("express").Router();

const verifyToken = require("../middleware/jwt");
const { follow, unfollow, logout } = require("../controller/userController");

//follow user
router.put("/follow/:id", verifyToken, follow);
//unfollow the user

router.put("/unfollow/:id", verifyToken, unfollow);

router.get('/logout',logout);

module.exports = router;
