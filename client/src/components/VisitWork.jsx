import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import useLoginUser from '../hooks/useLoginUser';
import { loadingStates, roles } from '../auth/authUtils';
import {
  addTodoThunkApi,
  deleteTodoThunkApi,
  editTodoThunkApi,
  getTodosThunkApi,
} from '../api/todoApi';
import { addTodo, getAllTodoDataState } from '../app/todoSlicer';
import './components.css';

const VisitWork = () => {
  const [todoInput, setTodoInput] = useState('');
  const [editTodo, setEditTodo] = useState(null);
  const [shouldFetchTodos, setShouldFetchTodos] = useState(false);

  const dispatch = useDispatch();
  const { loading: todosLoading, data: todos } = useSelector(getAllTodoDataState);
  const { name, email, role } = useLoginUser();

  useEffect(() => {
    if (todosLoading === loadingStates.IDLE || shouldFetchTodos) {
      dispatch(getTodosThunkApi()).then((result) => {
        if (result.meta.requestStatus === 'fulfilled') {
          setShouldFetchTodos(false);
        }
      });
    }
  }, [shouldFetchTodos, dispatch]);

  const handleAddTodo = async () => {
    if (!todoInput.trim()) return;

    const newTodo = { role, email, description: todoInput };
    const result = await dispatch(addTodoThunkApi(newTodo));
    
    if (result.meta.requestStatus === 'fulfilled') {
      dispatch(addTodo({ id: nanoid(3), description: todoInput }));
      setTodoInput('');
      setShouldFetchTodos(true);
    }
  };

  const handleEditTodo = (id) => {
    setEditTodo(todos.find((todo) => todo._id === id) || null);
  };

  const handleUpdateTodo = async () => {
    if (!editTodo?.description.trim()) return;

    const updatePayload = { role, email, description: editTodo.description, todoId: editTodo._id };
    const result = await dispatch(editTodoThunkApi(updatePayload));
    
    if (result.meta.requestStatus === 'fulfilled') {
      setEditTodo(null);
      setShouldFetchTodos(true);
    }
  };

  const handleDeleteTodo = async (id) => {
    const result = await dispatch(deleteTodoThunkApi({ role, email, todoId: id }));
    if (result.meta.requestStatus === 'fulfilled') {
      setShouldFetchTodos(true);
    }
  };

  return (
    <div className='todoContainer'>
      <h1 className='todoTitle'>Task Master</h1>
      {role === roles.ADMIN && (
        <div className='todoInputContainer'>
          <input
            placeholder="Add todo"
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
            className='todoInputField'
            // className='inputField'
          />
          <button onClick={handleAddTodo} className='addTodoBtn'>Add Todo</button>
        </div>
      )}
      <div className='todosListContainer'>
        {todos?.map((todo) => (
          <div key={todo._id} className='descriptContainer'>
            {(editTodo?._id === todo._id && role===roles.ADMIN) ? (
              <div className='eachTodoContainer'>
                <input
                  value={editTodo.description}
                  onChange={(e) => setEditTodo({ ...editTodo, description: e.target.value })}
                  className='todoInputField editInput'
                />
                 <div className='editDeleteBtnsContainer'>
                <button onClick={handleUpdateTodo} className='editDeleteBtn'>Update</button>
                <button onClick={() => handleDeleteTodo(todo._id)} className='editDeleteBtn'>Delete</button>
                 </div>

              </div>
            ) : (
              <div className='eachTodoContainer'>
                <h2 className='todoDescription'>{todo.description}</h2>
                {role === roles.ADMIN && 
                // <div className='editDeleteBtnsContainer'>
                <div className='editDeleteBtnsContainer'>
                <button onClick={() => handleEditTodo(todo._id)} className='editDeleteBtn'>Edit</button>
                <button onClick={() => handleDeleteTodo(todo._id)} className='editDeleteBtn'>Delete</button>
                </div>
                // </div>
                }
              </div>
            )}
            {/* {role === roles.ADMIN && <button className='editDeleteBtn' onClick={() => handleDeleteTodo(todo._id)}>Delete</button>} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisitWork;










// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   addTodo,
//   deleteTodo,
//   editTodo,
//   getAllTodoDataState,
//   todosState,
// } from '../app/todoSlicer';
// import { nanoid } from '@reduxjs/toolkit';
// import useLoginUser from '../hooks/useLoginUser';
// import { loadingStates, roles } from '../auth/authUtils';
// import {
//   addTodoThunkApi,
//   deleteTodoThunkApi,
//   editTodoThunkApi,
//   getTodosThunkApi,
// } from '../api/todoApi';

// const VisitWork = () => {
//   const [todoChange, setTodoChange] = useState('');
//   const [editObj, setEditObj] = useState(null);
//   const [shouldCallGetTodos, setShouldCallGetTodos] = useState(false);

//   const dispatch = useDispatch();
//   const { loading: allTodoPending, data: allTodosData } = useSelector(getAllTodoDataState);
//   const totalTodos = useSelector(todosState);
//   const { name, email, role } = useLoginUser();

//   // useEffect(() => {
//   //   if (allTodoPending === loadingStates.IDLE || shouldCallGetTodos) {
//   //     const result = dispatch(getTodosThunkApi());;
//   //     if(handleApiResult(getTodosThunkApi,result)){
//   //       setShouldCallGetTodos(false);
//   //     }
      
//   //   }
//   // }, [shouldCallGetTodos, allTodoPending, dispatch]);

//   useEffect(() => {
//     if (todosLoading === loadingStates.IDLE || shouldFetchTodos) {
//       dispatch(getTodosThunkApi()).then((result) => {
//         if (result.meta.requestStatus === 'fulfilled') {
//           setShouldFetchTodos(false);
//         }
//       });
//     }
//   }, [shouldFetchTodos, todosLoading, dispatch]);
//   const handleApiResult = (apiInstance, result) => {
//     if (apiInstance.fulfilled.match(result)) {
//       console.log('API Call Successful');
//       return true;
//     }
//     console.log('API Call Failed');
//     return false;
//   };

//   const addNewTodo = async () => {
//     if (!todoChange.trim()) {
//       console.log('Todo description is empty');
//       return;
//     }

//     const reqObj = { role, email, description: todoChange };
//     try {
//       const result = await dispatch(addTodoThunkApi(reqObj));
//       if (handleApiResult(addTodoThunkApi, result)) {
//         setShouldCallGetTodos(true);
//         dispatch(addTodo({ id: nanoid(3), description: todoChange }));
//         setTodoChange('');
//       }
//     } catch (error) {
//       console.error('Error adding new todo:', error);
//     }
//   };

//   const editTodoHandler = (id) => {
//     const editingObj = allTodosData.find((todo) => todo._id === id);
//     setEditObj(editingObj || null);
//   };

//   const updateTodo = async () => {
//     if (!editObj?.description.trim()) return;

//     const editPayload = {
//       role,
//       email,
//       description: editObj.description,
//       todoId: editObj._id,
//     };

//     try {
//       const result = await dispatch(editTodoThunkApi(editPayload));
//       if (handleApiResult(editTodoThunkApi, result)) {
//         setEditObj(null);
//         setShouldCallGetTodos(true);
//       }
//     } catch (error) {
//       console.error('Error updating todo:', error);
//     }
//   };

//   const deleteTodoHandler = (id) => {
//     const reqObj = { role, email, todoId:id }
//     // dispatch(deleteTodo(id));
//     dispatch(deleteTodoThunkApi(reqObj));
//     setShouldCallGetTodos(true);
//   };

//   return (
//     <div>
//       <h1>Visit Work</h1>
//       {role === roles.ADMIN && (
//         <div>
//           <input
//             placeholder="Add todo"
//             value={todoChange}
//             onChange={(e) => setTodoChange(e.target.value)}
//           />
//           <button onClick={addNewTodo}>Add Todo</button>
//         </div>
//       )}
//       <div>
//         {allTodosData?.map((todo) => (
//           <div key={todo._id}>
//             {editObj?._id === todo._id ? (
//               <>
//                 <input
//                   value={editObj.description}
//                   onChange={(e) => setEditObj({ ...editObj, description: e.target.value })}
//                 />
//                 <button onClick={updateTodo}>Update</button>
//               </>
//             ) : (
//               <>
//                 <h2>{todo.description}</h2>
//                 {role === roles.ADMIN && <button onClick={() => editTodoHandler(todo._id)}>Edit</button>}
//               </>
//             )}
//             {role === roles.ADMIN && <button onClick={() => deleteTodoHandler(todo._id)}>Delete</button>}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default VisitWork;





// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { addTodo, deleteTodo, editTodo, getAllTodoDataState, todosState } from '../app/todoSlicer';
// import { nanoid } from '@reduxjs/toolkit';
// import useLoginUser from '../hooks/useLoginUser';
// import { loadingStates, roles } from '../auth/authUtils';
// import { addTodoThunkApi, editTodoThunkApi, getTodosThunkApi } from '../api/todoApi';

// const VisitWork = () => {
//     const [todoChange,setTodoChange] = useState('');
//     const [editObj,setEeditObj] = useState({});
//     const [shouldCallGetTodos,setShouldCallGetTodos] = useState(false);
//     const {loading:allTodoPending,data:allTodosData} = useSelector(getAllTodoDataState);

//     const dispatch = useDispatch();
//     const totalTodos = useSelector(todosState);
//     const {name,email,role,isLogin} = useLoginUser();
//   console.log("all todos",allTodosData);
  
//     useEffect(()=>{
//       if(allTodoPending===loadingStates.IDLE || shouldCallGetTodos){
//         dispatch(getTodosThunkApi());
//       }

//       return setShouldCallGetTodos(false);
//     },[shouldCallGetTodos,allTodoPending])
//     const handleApiResult = (apiInstance, result) => {
//       let fulfilled = apiInstance.fulfilled.match(result);
//       if (apiInstance.fulfilled.match(result)) {
//         // if the api hit is successful forwarding to next component
//         console.log('calling in fulfilled');
  
//         // nextComponent();
//       } else if (apiInstance.rejected.match(result)) {
//         // if any api fails setting the error here
//         console.log('calling in rejected');
//         // setErrors({ apiError: apiErrorMsg });
//       }
//       console.log('api fulfilled', fulfilled);
      
//       return fulfilled;
//     };
//     const addNewTodo = async ()=>{

//         if(todoChange){
//           const newTodo = {
//             id:nanoid(3),
//             description:todoChange
//         }
//         const reqObj = {
//           role, email, description:todoChange
//         };
//         const result = await dispatch(addTodoThunkApi());
//         const isFulfilled = handleApiResult(addTodoThunkApi,result);
//         console.log('add new is fulfill',isFulfilled);
        
//         if(isFulfilled===true){
//           setShouldCallGetTodos(true);
//           dispatch(addTodo(newTodo));
//           setTodoChange('');
//         }else{
//           console.log("failed to post");
//         }

//     };
//     const editingTodo = (id)=>{
//         const editingObj = allTodosData.find((e)=>e._id===id);
//         setEeditObj(editingObj);
//     };
//     const updateIdFun = ()=>{
//         // dispatch(editTodo(editObj));
//         const editPayload = {
//           role, email, description:editObj?.description, todoId:editObj?._id
//         }
//         dispatch(editTodoThunkApi(editPayload));
//         setEeditObj({});

//     }
//     const deletingTodo = (id)=>{
//         dispatch(deleteTodo(id));
//     };

//   return (
//     <div>
//       <h1>Visit work</h1>
//       <div>
//       {
//         role === roles.ADMIN && 
//         <>
//       <input placeholder='Add todo' value={todoChange} onChange={(e)=>setTodoChange(e.target.value)}/>
//       <button onClick={addNewTodo}>Add Todo</button>
//         </>
//       }
//       {
//         allTodosData?.map((e)=>{
//             return <div key={e._id}>
//            {
//             (editObj?._id !== e._id)  ?  <>
//             <h2>{e.description}</h2> 
//             {
//               role === roles.ADMIN && <button onClick={()=>editingTodo(e._id)}>Edit Todo</button>
//             }
//             </> : <>
//             <input value={editObj.description} onChange={(e)=>{
//             setEeditObj({...editObj,description:e.target.value})
//             }}/>
//             <button onClick={updateIdFun}>Update</button>
//             </>
//            }
//            {
//             role === roles.ADMIN && (
//             <button onClick={()=>deletingTodo(e.id)}>Delete Todo</button>
//             )
//            }
//             </div>
//         })
//       }
//       </div>
//     </div>
//   )
// }

// export default VisitWork;








// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { addTodo, deleteTodo, editTodo, getAllTodoDataState, todosState } from '../app/todoSlicer';
// import { nanoid } from '@reduxjs/toolkit';
// import useLoginUser from '../hooks/useLoginUser';
// import { loadingStates, roles } from '../auth/authUtils';
// import { addTodoThunkApi, getTodosThunkApi } from '../api/todoApi';

// const VisitWork = () => {
//     const [todoChange,setTodoChange] = useState('');
//     const [editObj,setEeditObj] = useState({});
//     const [shouldCallGetTodos,setShouldCallGetTodos] = useState(false);
//     const {loading:allTodoPending,data:allTodosData} = useSelector(getAllTodoDataState);

//     const dispatch = useDispatch();
//     const totalTodos = useSelector(todosState);
//     const {name,email,role,isLogin} = useLoginUser();
//   console.log("all todos",allTodosData);
  
//     useEffect(()=>{
//       if(allTodoPending===loadingStates.IDLE || shouldCallGetTodos){
//         dispatch(getTodosThunkApi());
//       }

//       return setShouldCallGetTodos(false);
//     },[shouldCallGetTodos,allTodoPending])
//     const handleApiResult = (apiInstance, result) => {
//       if (apiInstance.fulfilled.match(result)) {
//         // if the api hit is successful forwarding to next component
//         console.log('calling in fulfilled');
  
//         // nextComponent();
//       } else if (apiInstance.rejected.match(result)) {
//         // if any api fails setting the error here
//         console.log('calling in rejected');
//         // setErrors({ apiError: apiErrorMsg });
//       }
//     };
//     const addNewTodo = async ()=>{

//         if(todoChange){
//           const newTodo = {
//             id:nanoid(3),
//             description:todoChange
//         }
//         const reqObj = {
//           role, email, description:todoChange
//         };
//         const result = await dispatch(addTodoThunkApi(reqObj));
//         if(addTodoThunkApi.fulfilled.match(result));
//         setShouldCallGetTodos(true);
//           dispatch(addTodo(newTodo));
//           setTodoChange('');
//         }else{
//           console.log("failed to post");
//         }

//     };
//     const editingTodo = (id)=>{
//         const editingObj = totalTodos.find((e)=>e.id===id);
//         setEeditObj(editingObj);
//     };
//     const updateIdFun = ()=>{
//         dispatch(editTodo(editObj));
//         setEeditObj({});
//     }
//     const deletingTodo = (id)=>{
//         dispatch(deleteTodo(id));
//     };

//   return (
//     <div>
//       <h1>Visit work</h1>
//       <div>
//       {
//         role === roles.ADMIN && 
//         <>
//       <input placeholder='Add todo' value={todoChange} onChange={(e)=>setTodoChange(e.target.value)}/>
//       <button onClick={addNewTodo}>Add Todo</button>
//         </>
//       }
//       {
//         allTodosData?.map((e)=>{
//             return <div key={e._id}>
//            {
//             (editObj?.id !== e.id)  ?  <>
//             <h2>{e.description}</h2> 
//             {
//               role === roles.ADMIN && <button onClick={()=>editingTodo(e.id)}>Edit Todo</button>
//             }
//             </> : <>
//             <input value={editObj.description} onChange={(e)=>{
//             setEeditObj({...editObj,description:e.target.value})
//             }}/>
//             <button onClick={updateIdFun}>Update</button>
//             </>
//            }
//            {
//             role === roles.ADMIN && (
//             <button onClick={()=>deletingTodo(e.id)}>Delete Todo</button>
//             )
//            }
//             </div>
//         })
//       }
//       </div>
//     </div>
//   )
// }

// export default VisitWork;
