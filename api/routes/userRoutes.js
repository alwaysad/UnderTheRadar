const router = require("express").Router();

const verifyToken = require("../middleware/jwt");
const { follow, unfollow, logout, GetUser } = require("../controller/userController");

//follow user
router.get('/getUser/:id',GetUser);
router.put("/follow/:id", verifyToken, follow);
//unfollow the user

router.put("/unfollow/:id", verifyToken, unfollow);

router.get("/logout", logout);

module.exports = router;
