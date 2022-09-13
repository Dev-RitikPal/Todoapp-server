const todos = require("../models/todo");
const { json } = require("express");
const Todos = require("../models/todo");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.addtodos = async (req, res) => {
  const { id, taskName, description, category, status } = req.body;

  // User.findOne({ id: id }).exec((err, user) => {
  //   if (!taskName || !description || !category) {
  //     return res.json({
  //       msg: `${!taskName || !description || !category} not provided`,
  //     });
  //   }

  const addtodo = new todos({
    taskName,
    description,
    category,
    status,
  });
  const todoId = await addtodo.save();
  const setId = await User.updateOne(
    { _id: id },
    { $push: {todos:todoId._id} },
    { new: true }
  );
  //((err, success) => {
  //   todoId = success._id
  if (!setId) {
    return err;
  } else {
    return res.json({
      msg: "todo added sucessfully",
    });
  }
  // });

  // });
};

exports.getTodos = async (req, res) => {
  const { authid: tokan } = req.headers;
  const ress = jwt.verify(tokan, process.env.JWT_SIGNIN_KEY)
  try {
    const userResponse = await User.findOne({ _id: ress._id }).populate("todos");
    if (userResponse) {
      res.json(userResponse.todos);
    }
  } catch (e) {
    res.json({
      msg: e,ress
    });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { toDoId } = req.params;
    const resps = await Todos.deleteOne({ _id: toDoId });
    if (resps) {
      res.json({
        msg: "todo deleted sucessfully",
      });
    }
  } catch (e) {
    res.json({
      msg: e,
    });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id, status } = req.body;
    const resps = await Todos.findOneAndUpdate(
      { _id: id },
      { status: status },
      { new: true }
    );
    if (resps) {
      res.json({
        msg: "todo updated succesfully",
      });
    }
  } catch (e) {
    res.json({
      msg: e,
    });
  }
};

exports.updateTodosData = async (req, res) => {
  try {
    const { id, taskName, description, category } = req.body;
    const resps = await Todos.findOneAndUpdate(
      { _id: id },
      // {taskName,description,category},
      req.body,
      { new: true }
    );
    if (resps) {
      res.json({
        msg: "todo updated succesfully",
      });
    }
  } catch (e) {
    res.json({
      msg: e,
    });
  }
};
