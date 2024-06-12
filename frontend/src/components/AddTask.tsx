import React, { useState } from 'react';
import { useGetTodoQuery,useCreateTodoMutation} from '../slices/todoSlices/todoApiSlice';
import { toast } from 'react-toastify';
import Spinner from './Spinners';

const AddTask = () => {
    const [title, setTitle] = useState<string>('');
    const [isLoading, setIsLoading] = useState<Boolean>(false);

    //@ts-ignore
    const { data: todo, refetch } = useGetTodoQuery(); 
    const [createTodo] = useCreateTodoMutation();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
      };


      const addTask = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
           await createTodo({ title }).unwrap();
          toast.success('Added todo successfully');
          refetch(); 
        } catch (err: any) {
          console.log(err);
          toast.error(err?.data?.message || err.error);
        } finally {
          setIsLoading(false);
        }
      };
    
  return (
    <form onSubmit={addTask}>
        <div className="input-container">
        <input
            type="text"
            placeholder="Add your task"
            value={title}
            onChange={handleInputChange}
          />
          <button type="submit">Add</button>
         
        </div>
        {isLoading && <Spinner/>}
        </form>
  )
}

export default AddTask
