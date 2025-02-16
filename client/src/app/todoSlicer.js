import { createSlice } from "@reduxjs/toolkit";
import { dataStates, loadingStates } from "../auth/authUtils";
import { addTodoThunkApi, deleteTodoThunkApi, editTodoThunkApi, getTodosThunkApi } from "../api/todoApi";

const initialState = {
    todos:[],
    addTodoData:dataStates,
    editTodoData:dataStates,
    deleteTodoData:dataStates,
    getAllTodoData:dataStates,
};
// Utility function to handle API states
const handleApiCases = (builder, api, stateField) => {
    builder
      .addCase(api.pending, (state) => {
        state[stateField].loading = loadingStates.PENDING;
      })
      .addCase(api.fulfilled, (state, action) => {
        state[stateField].loading = loadingStates.FULFILLED;        
        state[stateField].data = action.payload;
      })
      .addCase(api.rejected, (state, action) => {
        state[stateField].loading = loadingStates.REJECTED;
        state[stateField].data = [];
        state[stateField].error = action.payload;
      });
  };
  
const todoSlicer = createSlice({
    name:'todo slicer',
    initialState,
    reducers:{
        addTodo:(state,action)=>{
            state.todos = [...state.todos,action.payload];
        },
        editTodo:(state,action)=>{
            const editId = action.payload.id;
            const editIndex = state.todos.findIndex((e)=>e.id===editId);
            state.todos[editIndex] = action.payload; 
        },
        deleteTodo:(state,action)=>{
            const deleteId = action.payload;
            state.todos = state.todos.filter((e)=>e.id!==deleteId);
        }
    },
    extraReducers: (builder) => {
        handleApiCases(builder,addTodoThunkApi,'addTodoData');
        handleApiCases(builder,editTodoThunkApi,'editTodoData');
        handleApiCases(builder,deleteTodoThunkApi,'deleteTodoData');
        handleApiCases(builder,getTodosThunkApi,'getAllTodoData');
    }
});


export const {addTodo,editTodo,deleteTodo} = todoSlicer.actions;
export default todoSlicer.reducer;

export const todosState = (state)=>state.todoSlicer.todos;
export const getAllTodoDataState = (state)=>state.todoSlicer.getAllTodoData;