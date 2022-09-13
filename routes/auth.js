const express = require('express');
const router = express.Router();

// importing controller
const {signup, signin, logOutUser } = require("../controllers/auth");
const {addtodos, getTodos, deleteTodo, updateTodo, updateTodosData} = require('../controllers/todo')
const {getUserData} = require('../controllers/user')

router.post('/signup', signup);
router.post('/signin', signin);
router.delete('/logOutUser/:userId', logOutUser);
router.post('/addtodo',addtodos)
router.get('/getTodos',getTodos)
router.delete("/deleteTodo/:toDoId",deleteTodo)
router.put('/updateTodo',updateTodo)
router.put('/updateTodosData',updateTodosData)
router.get('/getUserData',getUserData)

module.exports = router;