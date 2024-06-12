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
    },
    createTodoInfo(state, action: PayloadAction<any>) {
      state.todoInfo = [...state.todoInfo, action.payload];
    },
    editTodoInfo(state, action: PayloadAction<any>) {
      state.todoInfo = state.todoInfo.map((item: any) =>
        item._id === action.payload._id ? action.payload : item
      );
    },
    deleteTodoInfo(state, action: PayloadAction<string>) {
      state.todoInfo = state.todoInfo.filter((item: any) => item._id !== action.payload);
    }
  }
});

export const { setTodoInfo, createTodoInfo, editTodoInfo, deleteTodoInfo } = todoSlice.actions;
export default todoSlice.reducer;