const mongoose = require("mongoose");
const { Todos } = require("../models/Todo");
const { Users } = require("../models/User");
 const roles = {
    ADMIN:'admin',
    USER:'user'
  };
const addTodoController = async (req, res) => {
    try {
        const { role, email, description } = req.body;

        // Validate required fields
        if (!role || !email || !description) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        // Find the user by email
        const user = await Users.findOne({ email }).exec();
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        // Validate the role
        if (role !== roles.ADMIN) {
            return res.status(403).json({ message: "User cannot add!" });
        }

        // Create a new todo
        const newTodo = await Todos.create({
            description,
            userId: user.id, // Associate the todo with the user
        });

        return res.status(200).json({ message: "Todo added successfully!", data: newTodo });
    } catch (error) {
        console.error("Error adding todo:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


const editTodoController = async (req, res) => {
    try {
        const { role, email, description, todoId } = req.body;

        // Validate required fields
        if (!role || !email || !description || !todoId) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        // Find the user by email
        const user = await Users.findOne({ email }).exec();
        console.log('edit user',user);
        
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        // // Validate the role
        if (role !== roles.ADMIN) {
            return res.status(403).json({ message: "User cannot edit!" });
        }

        // // Find the todo
        // const todo = await Todos.findOne({ id: todoId, userId: user._id }).exec();
        // Ensure todoId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(todoId)) {
            return res.status(400).json({ message: "Invalid todo ID!" });
        }

        // Find the todo with ObjectId comparison
        const todo = await Todos.findOne({ 
            _id: new mongoose.Types.ObjectId(todoId), 
            // userId: user._id 
        }).exec();
        if (!todo) {
            return res.status(404).json({ message: "Todo not found or does not belong to the user!" });
        }

        // Update the todo
        todo.description = description;
        await todo.save();

        return res.status(200).json({ message: "Todo updated successfully!", data:todo });
    } catch (error) {
        console.error("Error updating todo:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


const deleteTodoController = async (req, res) => {
    try {
        const { role, email, todoId } = req.body;

        // Validate required fields
        if (!role || !email || !todoId) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        // Find the user by email
        const user = await Users.findOne({ email }).exec();
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        // Validate the role
        if (role !== roles.ADMIN) {
            return res.status(403).json({ message: "User role does not match!" });
        }

        // Find the todo and ensure it belongs to the user
        const todo = await Todos.findOneAndDelete({ _id: todoId });
        // has to delete based upon the user entered access
        // const todo = await Todos.findOneAndDelete({ _id: todoId,userId: user.id });
        
        if (!todo) {
            return res.status(404).json({ message: "Todo not found or could not be deleted!" });
        }
        return res.status(200).json({ message: "Todo deleted successfully!" });
        
    } catch (error) {
        console.error("Error deleting todo:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


const getTodosController = async (req, res) => {
    try {

        const todos = await Todos.find({});

        return res.status(200).json({ message: "Todos fetched successfully!", data:todos });
    } catch (error) {
        console.error("Error fetching todos:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { addTodoController, editTodoController, deleteTodoController, getTodosController };
