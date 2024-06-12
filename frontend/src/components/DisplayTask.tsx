import React, {useState, useEffect} from 'react'
import {
    setTodoInfo
  } from '../slices/todoSlices/todoSlice';
  import {
    useGetTodoQuery,
    useEditTodoMutation,
    useDeleteTodoMutation
  } from '../slices/todoSlices/todoApiSlice';
  import { useDispatch } from 'react-redux';
  import { toast } from 'react-toastify';
  import Spinner from './Spinners';

const DisplayTask: React.FC = () => {
    const [isLoading, setIsLoading] = useState<Boolean>(false);

    const dispatch = useDispatch();
  
    // @ts-ignore
    const { data: todo, refetch } = useGetTodoQuery(); 
    const [editTodo] = useEditTodoMutation()
    const [deleteTodo] = useDeleteTodoMutation()
  
   
  
    useEffect(() => {
      const handleData = () => {
        dispatch(setTodoInfo({...todo}))
      }
      handleData()
    }, [todo])
  
    
  
    const deleteTask = async(id: string) => {
      setIsLoading(true)
      try {
        await deleteTodo(id)
        refetch()
        toast.success('deleted successfully')
      } catch (err:any) {
        console.log()
        toast.error(err?.data?.message || err.message)
      }finally {
        setIsLoading(false)
      }
    };
  
    const toggleTaskCompletion = async (id: string, completed: boolean) => {
      setIsLoading(true);
      try {
        const data = {
          id: id,
          completed,
        };
        console.log(data, completed)
        await editTodo(data).unwrap();
        toast.success('Task status updated successfully');
        refetch();
      } catch (err: any) {
        console.log(err);
        toast.error(err?.data?.message || err.message);
      } finally {
        setIsLoading(false);
      }
    };
  
  return (
    <>
       {isLoading && <Spinner />}
        <ul>
          {todo && todo.map((task: any) => (
            <li key={task._id}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task._id, !task.completed)}
              />
              <span className={task.completed === true ? 'completed' : ''}>
                {task.title}
              </span>
              <span className="close-icon" onClick={() => deleteTask(task._id)}>
                ×
              </span>
            </li>
          ))}
        </ul>
    </>
  )
}

export default DisplayTask
