const router = require("express").Router();
const Business = require("../models/Business");
const User = require("../models/User");

//register
router.post("/register", async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      birthDate: req.body.birthDate,
    });
    const newUser = await user.save();
    res.status(200).json('registered succesfully');
  } catch (error) {
    res.status(500).json({message:'failed'});
  }
});

router.post("/register/business", async (req, res) => {
  try {
    const newBusiness = new Business({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      location: req.body.location,
      description: req.body.description,
    });

    const newly = await newBusiness.save();
    res.status(200).json(newly);
  } catch (error) {
    res.status(500).json(error);
  }
});
//different login between user and business
router.post("/login/:type", async (req, res) => {
  try {
    if (req.params.type === "user") {
      const user = await User.findOne({ email: req.body.email });
      if (req.body.password === user.password) {
        console.log('server denetim yaptı')
        res.status(200).json({message:'Personal login welcome'});
      } else {
        res.status(500).json("Password is wrong");
      }
    } else {
      const business = await Business.findOne({ email: req.body.email });
      if (req.body.password === business.password) {
        res.status(200).json("Business welcome");
      } else {
        res.status(500).json("Password is wrong");
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
//login
