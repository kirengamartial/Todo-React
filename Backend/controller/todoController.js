import Todo from "../models/todoModel.js";

const getAllTodo = async(req, res) => {
try {
    const todo = await Todo.find()
    res.status(200).json(todo)
} catch (error) {
    console.log(error)
    res.status(500).json({message: error})
}
}

const createTodo = async(req, res) => {
    try {
        const { title } = req.body

        const todo = await Todo.create({title})

         if(todo) {
          res.status(200).json(todo)
           }

    } catch (error) {
        res.status(500).json({message:'Invalid Title'})
    }

}

const updateTodo = async(req, res) => {
try {
    const { id } = req.params
    const {completed} = req.body

    const todo = await Todo.findById(id)

    if(todo) {
        todo.completed = completed || todo.completed
        
        const updatedTodo = await todo.save()

        res.status(200).json(updatedTodo)
    }

} catch (error) {
  res.status(500).json(error)
  console.log({message: error})   
}
}

const deleteTodo = async(req, res) => {
try {
    const { id } = req.params
    await Todo.findByIdAndDelete(id)

    res.status(200).json({message: 'deleted successfully', _id: id})
} catch (error) {
    res.status(500).json(error)
    console.log({message: error})
}
}

export {
    getAllTodo,
    createTodo,
    updateTodo,
    deleteTodo
}