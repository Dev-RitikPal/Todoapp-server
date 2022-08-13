const todos = require("../models/todo");
const { json } = require("express");
const Todos = require("../models/todo");

exports.addtodos = (req, res) => {
  const { taskName, description, category, status } = req.body;

  Todos.findOne({ taskName: taskName }).exec((err, user) => {
    if (!taskName || !description || !category) {
      return res.json({
        msg: `${!taskName || !description || !category} not provided`,
      });
    }

    const addtodo = new todos({
      taskName,
      description,
      category,
      status,
    });

    addtodo.save((err, success) => {
      if (err) {
        return err;
      } else {
        return res.json({
          msg: "todo added sucessfully",
        });
      }
    });
  });
};

exports.getTodos = async (req, res) => {
  try {
    const response = await Todos.find({});
    if (response) {
      res.send(response);
    }
  } catch (e) {
    res.json({
      msg: e,
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
      { new: true },
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
