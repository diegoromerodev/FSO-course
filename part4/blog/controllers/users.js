const usersRouter = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user");

usersRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate({
    path: "blogs",
    select: "title",
  });
  res.json(users);
});

usersRouter.post("/", async (req, res) => {
  const { body } = req;
  if (!body)
    return res.status(400).json({
      error: "credentials required",
    });
  const newUser = new User({
    username: body.username,
    name: body.name,
    password: bcrypt.hashSync(body.password),
  });

  const savedUser = await newUser.save();
  res.json(savedUser);
});

module.exports = usersRouter;
