const User = require("../models/user.model");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// [POST] /register
module.exports.register = async (req, res) => {
  const { fullName, email, password } = req.body;
    if(!fullName || !email || !password){
      return res.status(400).json({
        error: true,
        message: "All fields are required"
      })
    }
  
    const isUser = await User.findOne({ email });
    if(isUser){
      return res.status(400).json({
        error: true,
        message: "User already exists"
      })
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const user = new User({
      fullName, email, password: hashedPassword
    });
  
    await user.save();
  
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "72h"
      }
    )
  
    return res.status(201).json({
      error: false,
      user: { fullName: user.fullName, email: user.email },
      accessToken,
      message: "Registration Successful"
    })
}

// [POST] /login
module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  if(!email || !password){
    return res.status(400).json({
      error: true,
      message: "Email and Password are required"
    })
  }

  const user = await User.findOne({ email });
  if(!user){
    return res.status(400).json({
      error: true,
      message: "User not found"
    })
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if(!isPasswordValid){
    return res.status(400).json({
      error: true,
      message: "Invalid credentials"
    })
  }

  const accessToken = jwt.sign(
    { userId: user._id},
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "72h"
    }
  );

  return res.status(200).json({
    error: false,
    message: "Login Successful",
    user: { fullName: user.fullName, email: user.email},
    accessToken
  })
}

// [GET] /get-user
module.exports.getUser = async (req, res) => {
  const { userId } = req.user;

  const isUser = await User.findOne({
    _id: userId
  });

  if(!isUser){
    return res.sendStatus(401);
  }

  return res.json({
    user: isUser,
    message: ""
  })
}