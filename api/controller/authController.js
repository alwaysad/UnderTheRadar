const User = require("../models/User");
const Business = require("../models/Business");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const Register = async (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 5);
  try {
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
      birthDate: req.body.birthDate,
      img:req.body.img
    });
    const newUser = await user.save();
    res.status(200).json("registered succesfully");
  } catch (error) {
    res.status(500).json({ message: "failed" });
  }
};
const BusinessRegister = async (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 5); //password hashing
  try {
    const newBusiness = new Business({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      location: req.body.location,
      description: req.body.description,
      businessType: req.body.businessType,
      city: req.body.city,
      coverimg:req.body.img,
    });

    const newly = await newBusiness.save();
    res.status(200).json(newly);
  } catch (error) {
    res.status(500).json(error);
  }
};

const Login = async (req, res) => {
  try {
    if (req.params.type === "user") {
      const user = await User.findOne({ email: req.body.email });
      const isCorrect = bcrypt.compareSync(req.body.password, user.password); //hashed password check
      if (isCorrect) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);
        res
          .cookie("accessToken", token, { httpOnly: true })
          .status(200)
          .json({ message: "Personal login welcome", token: token, user });
      } else {
        res.status(500).json({ message: "Password is wrong" });
      }
    } else {
      const business = await Business.findOne({ email: req.body.email });
      const isCorrect = bcrypt.compareSync(
        req.body.password,
        business.password
      );
      if (isCorrect) {
        const token = jwt.sign({ id: business._id }, process.env.JWT_KEY);
        res
          .cookie("accessToken", token, { httpOnly: true })
          .status(200)
          .json({ message: "Busines login welcome", token: token });
      } else {
        res.status(500).json({ message: "Password is wrong" });
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  register: Register,
  businessRegister: BusinessRegister,
  login: Login,
};
