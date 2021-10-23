const loginRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

loginRouter.post("/", async (req, res) => {
  const { body } = req;
  if (!body) return res.status(400).end();
  const user = await User.findOne({ username: body.username });
  const passwordMatch = await bcrypt.compareSync(body.password, user.password);

  console.log(user, passwordMatch);

  if (!(user && passwordMatch)) {
    return res.status(400).json({
      error: "Wrong credentials",
    });
  }
  const token = jwt.sign(user._doc, process.env.SECRET);
  return res.json({
    token,
    username: body.username,
  });
});

module.exports = loginRouter;
