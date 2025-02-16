const express = require("express");
const { addTodoController, editTodoController, deleteTodoController, getTodosController } = require("../controllers/todoController");


const router = express.Router();


router.post('/addTodo',addTodoController);
router.post('/editTodo',editTodoController);
router.post('/deleteTodo',deleteTodoController);
router.get('/allTodos',getTodosController);


module.exports = router;