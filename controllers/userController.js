const ayncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//user registration
// route - Post /api/users/register
//public
const registerUser = ayncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fiels are mandatory");
  }
  const userFind = await User.findOne({ email });
  if (userFind) {
    res.status(400);
    throw new Error("User already exists");
  }
  const hasedpassword = await bcrypt.hash(password, 10);
  console.log(hasedpassword);

  const user = await User.create({
    username,
    email,
    password: hasedpassword,
  });
  res.status(200).json(user);
});

//login user
// route -POST /api/users/login
//public
const loginUser = ayncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fiels are mandatory");
  }
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    // decode = {
    //   user: {
    //     username: user.username,
    //     email: user.email,
    //     id: user.id,
    //   },
    // };
    // this is payload we passing to the verifyToken fuction

    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "20m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Email or password not matched!!!");
  }
});

//get user
// route -GET /api/users/:id
//private
const getUser = ayncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, getUser };
