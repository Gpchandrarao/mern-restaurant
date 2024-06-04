const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

dotenv.config();

const userRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const findUser = await User.findOne({ email });

    if (findUser) {
      return res.status(400).json("Email alreday taken");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ mes: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log(error);
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const comparePass = await bcrypt.compare(password, user.password);
    if (!user || !comparePass) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);

    res.status(200).json({ sucess: "Login successful", token });
    console.log("email: " + email, "token: " + token);
  } catch (error) {
    console.log("error from User Login: " + error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { userRegister, userLogin };
