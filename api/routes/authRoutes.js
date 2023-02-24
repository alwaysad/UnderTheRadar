const router = require("express").Router();
const { register, businessRegister, login } = require("../controller/authController");

//register
router.post("/register", register);

router.post("/register/business",businessRegister);
//different login between user and business
router.post("/login/:type", login );

module.exports = router;
//login
