import mongoose, { Schema } from "mongoose";

const todoModel = new Schema({
    title: {
        type: String,
        required: [true, 'title is required']
    },
    completed: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

const Todo = mongoose.model("Todo", todoModel)

export default Todo