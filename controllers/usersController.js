const User = require("../models/User");
const Note = require("../models/Note");

const ayncHandler = require("express-async-handler");
// const bcrypt = require("bcryptjs");

// const getAllUsers = ayncHandler(async (req, res) => {
//   const users = await User.find().lean();
//   if (!users?.length) {
//     return res.status(400).json({ message: "No users found" });
//   }
//   res.json(users);
// });

// const createNewUser = ayncHandler(async (req, res) => {
//   const { username, password, roles } = req.body;

//   if (!username || !password || !Array.isArray(roles) || !roles.length) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   const duplicate = await User.findOne({ username }).lean().exec();

//   if (duplicate) {
//     return res.status(409).json({ message: "Duplicate username" });
//   }

//   const hashedPwd = await bcrypt.hash(password, 10); // 10 is salt rounds
//   const user = await User.create({
//     username: username,
//     password: hashedPwd,
//     roles: roles,
//   });

//   if (user) {
//     res.status(201).json({ message: `New user ${username} created` });
//   } else {
//     res.status(400).json({ message: "Invalid user data received" });
//   }
// });

// const updateUser = ayncHandler(async (req, res) => {
//   const { id, username, roles, active, password } = req.body;

//   if (
//     !id ||
//     !username ||
//     !Array.isArray(roles) ||
//     !roles.length ||
//     typeof active !== "boolean"
//   ) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   const user = await User.findById(id).exec();

//   if (!user) {
//     return res.status(400).json({ message: "User not found" });
//   }

//   user.username = username;
//   user.roles = roles;
//   user.active = active;

//   if (password) {
//     user.password = await bcrypt.hash(password, 10); // 10 is salt rounds
//   }

//   const updatedUser = await user.save();

//   res.json({ message: `${updatedUser.username} updated` });
// });

// const deleteUser = ayncHandler(async (req, res) => {
//   const { id } = req.body;

//   if (!id) {
//     return res.status(400).json({ message: "User ID required" });
//   }

//   const note = await Note.findOne({ user: id }).lean().exec();

//   if (note) {
//     return res.status(400).json({ message: "Cannot delete user with notes" });
//   }

//   const user = await User.findById(id).exec();

//   if (!user) {
//     return res.status(400).json({ message: "User not found" });
//   }

//   const result = await user.deleteOne();

//   const reply = `Username ${result.username} with ID ${result._id} deleted`;

//   res.json(reply);
// });

const getAllUsers = ayncHandler(async (req, res) => {});

const createNewUser = ayncHandler(async (req, res) => {});

const updateUser = ayncHandler(async (req, res) => {});

const deleteUser = ayncHandler(async (req, res) => {});

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
