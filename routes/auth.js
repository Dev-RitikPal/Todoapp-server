const express = require('express');
const router = express.Router();

// importing controller
const {signup, signin, } = require("../controllers/auth");
const {addtodos, getTodos, deleteTodo, updateTodo, updateTodosData} = require('../controllers/todo')

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/addtodo',addtodos)
router.get('/getTodos',getTodos)
router.delete("/deleteTodo/:toDoId",deleteTodo)
router.put('/updateTodo',updateTodo)
router.put('/updateTodosData',updateTodosData)



module.exports = router;