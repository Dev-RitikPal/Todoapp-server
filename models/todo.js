const mongoose = require("mongoose");
const crypto = require("crypto");

// user schema
const addTodo = new mongoose.Schema(
  {
    taskName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    status:{
      type: Boolean,
    }
  },
  { timestamps: true }
);

const Todos =  mongoose.model("Todos", addTodo);
module.exports = Todos
