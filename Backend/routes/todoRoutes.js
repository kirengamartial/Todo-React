import { Router} from 'express'
import { getAllTodo, createTodo, updateTodo, deleteTodo } from '../controller/todoController.js'
import checkAuth from '../middleware/authMiddleware.js'

const router = Router()

router.get('/', getAllTodo)
router.post('/create',checkAuth, createTodo)
router.put('/edit/:id',checkAuth, updateTodo)
router.delete('/delete/:id',checkAuth, deleteTodo)

export default router