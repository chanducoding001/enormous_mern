import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrlInstance } from "./axiosInstance";

// Reusable API request function
const apiRequest = async (method, url, payload = null, rejectWithValue) => {
    try {
        const response = await baseUrlInstance[method](url, payload);
        
        if (response.status !== 200) {
            // return rejectWithValue(`Error while performing request: ${url}`);
            return rejectWithValue({
                status: response.status,
                message: `Error while performing request: ${url}`
            });
        }
        const data = response?.data?.data;
        console.log('api data',data);
        
        return data;
    } catch (error) {
        // return rejectWithValue(error.message);
        return rejectWithValue({
            status: error.response?.status || 500,
            message: error.message
        });
    }
};

// Create reusable thunk generator
const createThunk = (type, method, url, requiresPayload = true) => {
    return createAsyncThunk(type, async (payload, { rejectWithValue }) => {
        return apiRequest(method, url, requiresPayload ? payload : null, rejectWithValue);
    });
};

// Define API thunks
export const registerThunkApi = createThunk("register", "post", import.meta.env.VITE_REGISTER_URL);
export const loginThunkApi = createThunk("login", "post", import.meta.env.VITE_LOGIN_URL);
export const addTodoThunkApi = createThunk("add todo", "post", import.meta.env.VITE_ADD_TODO_URL);
export const editTodoThunkApi = createThunk("edit todo", "post", import.meta.env.VITE_EDIT_TODO_URL);
export const deleteTodoThunkApi = createThunk("delete todo", "post", import.meta.env.VITE_DELETE_TODO_URL);
export const getTodosThunkApi = createThunk("get todos", "get", import.meta.env.VITE_GET_TODOS_URL, false);










// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { baseUrlInstance } from "./axiosInstance";



// export const addTodoThunkApi = createAsyncThunk('add todo',async(payload,{dispatch,rejectWithValue})=>{
//     try {
//         const response = await baseUrlInstance.post(import.meta.env.VITE_ADD_TODO_URL,payload);
//         if(response.status !== 200){
//             return rejectWithValue('Error while posting todo')
//         }
//         const data = response.data;
//         return data;
//     } catch (error) {
//         return rejectWithValue(error.message);
//     }
// });

// export const editTodoThunkApi = createAsyncThunk('edit todo',async(payload,{dispatch,rejectWithValue})=>{
//     try {
//         const response = await baseUrlInstance.post(import.meta.env.VITE_EDIT_TODO_URL,payload);
//         if(response.status !== 200){
//             return rejectWithValue('Error while editing todo')
//         }
//         const data = response.data;
//         return data;
//     } catch (error) {
//         return rejectWithValue(error.message);
//     }
// });

// export const deleteTodoThunkApi = createAsyncThunk('delete todo',async(payload,{dispatch,rejectWithValue})=>{
//     try {
//         const response = await baseUrlInstance.post(import.meta.env.VITE_DELETE_TODO_URL,payload);
//         if(response.status !== 200){
//             return rejectWithValue('Error while deleting todo')
//         }
//         const data = response.data;
//         return data;
//     } catch (error) {
//         return rejectWithValue(error.message);
//     }
// });

// export const getTodosThunkApi = createAsyncThunk('get todos',async(_,{rejectWithValue})=>{
//     try {
//         const response = await baseUrlInstance.get(import.meta.env.VITE_GET_TODOS_URL);
//         if(response.status !== 200){
//             return rejectWithValue('Error while getting todos')
//         }
//         const data = response.data;
//         return data;
//     } catch (error) {
//         return rejectWithValue(error.message);
//     }
// });