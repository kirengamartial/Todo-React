import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const todoInfo = localStorage.getItem('todoInfo');
const parsedTodoInfo = todoInfo ? JSON.parse(todoInfo) : [];

interface TodoState {
  todoInfo: any[];
}

const initialState: TodoState = {
  todoInfo: Array.isArray(parsedTodoInfo) ? parsedTodoInfo : []
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setTodoInfo(state, action: PayloadAction<any[]>) {
      state.todoInfo = action.payload;
      localStorage.setItem('todoInfo', JSON.stringify(action.payload));
    }
  }
});

export const { setTodoInfo } = todoSlice.actions;
export default todoSlice.reducer;