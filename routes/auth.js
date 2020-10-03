const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../model/User");
const {
  validateNewUser,
  validateLoginUser,
} = require("../joi_validation/User");

dotenv.config();
//Register new user
router.post("/register", async (req, res) => {
  //Joi validation
  const { error } = validateNewUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //If email already exists
  const ifEmailExist = await User.findOne({
    email: req.body.email,
  });
  if (ifEmailExist) return res.status(400).send("Email already exist");

  //Hashing the password
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);

  //Saving the details to DB
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPass,
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

//Login
router.post("/login", async (req, res) => {
  //Joi validation
  const { error } = validateLoginUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //If email exists then get the user details
  const user = await User.findOne({
    email: req.body.email,
  });
  if (!user) return res.status(400).send("Email not found");

  //Check the password if email is present
  const ifPasswordIsCorrect = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!ifPasswordIsCorrect) return res.send("Invalid Password");

  //Assign  to header if valid user
  const token = jwt.sign(
    { _id: user._id, email: user.email },
    process.env.PAYLOAD_STRING
  );
  res.header("auth-token", token).send(token);
});

module.exports = router;
