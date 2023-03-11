const User = require("../models/User");

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new Error("there is no user with given details");
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const followUser = async (req, res) => {
  try {
    const followedUser = await User.findById(req.params.id);
    const currentUser = await User.findById(req.userId);
    if (req.userId === req.params.id) {
      return res.status(404).json({ message: "You can not follow yourself" });
    }
    console.log(req.userId);
    const followers = followedUser.followers;

    const result = Array.isArray(followers)
      ? !followers.includes(req.userId)
      : false;

    if (result) {
      await followedUser.updateOne({ $push: { followers: req.userId } });
      await currentUser.updateOne({ $push: { followings: req.params.id } });
      res.status(200).json({ user: req.userId, followedOne: followedUser._id });
    } else {
      res.status(404).json({ message: "You already following this person" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const unfollowUser = async (req, res) => {
  try {
    const unfollowedUser = await User.findById(req.params.id);
    const currentUser = await User.findById(req.userId);
    if (req.userId === req.params.id) {
      return res.status(404).json({ message: "You can not unfollow yourself" });
    }
    const followers = unfollowedUser.followers;
    const result = Array.isArray(followers)
      ? followers.includes(req.userId)
      : false;

    if (result) {
      await unfollowedUser.updateOne({ $pull: { followers: req.userId } });
      await currentUser.updateOne({ $pull: { followings: req.params.id } });
      res.status(200).json({ message: "Unfollowed" });
    } else {
      res.status(404).json({ message: "You are not following this person" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const logOut = (req, res) => {
  res
    .clearCookie("accessToken", { sameSite: "none", secure: true })
    .status(200)
    .json({ message: "Logout succesfully" });
};

module.exports = {
  follow: followUser,
  unfollow: unfollowUser,
  logout: logOut,
  GetUser: getUser,
};
