const express = require('express');
const Todo = require('../models/todoModel');
const {createTodo, getTodo, getTodos, deleteTodo, updateTodo} = require('../controllers/todoController');

const router = express.Router();

router.get('/', getTodos);

router.get('/:id', getTodo);

router.post('/', createTodo);

router.delete('/:id', deleteTodo);

router.patch('/:id', updateTodo);

module.exports = router;