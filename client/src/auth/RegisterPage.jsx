
import React, { useState } from 'react'
import * as Yup from 'yup';
import {registerFormData } from './authUtils';
import useFormHook from '../hooks/useFormHook';
import { useNavigate } from 'react-router-dom';
import ReuseModal from '../reusables/ReuseModal';

const RegisterPage = () => {
  const [toggleRegisterModal,setToggleRegisterModal] = useState({
    open:false,
    title:'Registering User',
    message:""
  });
  const navigate = useNavigate();
  const initialValues = {
    name:'',
    email:'',
    password:'',
    role:''
  };

  const onSubmit = async (values) => {
    console.log(values);
    try {
        const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_REGISTER_URL}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            }
        );

        if (!response.ok) {
          const errorMessage = await response.json(); // 🛠 Get error message from server
          console.log("Registration failed:",errorMessage);
          setToggleRegisterModal({
            ...toggleRegisterModal,
            open:true,
            title:response?.status,
            message:errorMessage?.message
          });
          return;
        }
        
        console.log("Registration successful");
        navigate("/login"); 

    } catch (error) {
        console.error("Network error:", error);
    }
};

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required!'),
    email: Yup.string().email('Invalid email format').required('Email is required!'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required!'),
    role: Yup.string().required("Role is required!").notOneOf([""], "Role is required!"),
  });

  
  return (
    <div className='container makeCenter'>
      {
        useFormHook({
          initialValues,
          onSubmit,
          validationSchema,
          formData:registerFormData,
          title:'Register Page',
          modalProps:{
            open:toggleRegisterModal?.open,
            handleClose:()=>setToggleRegisterModal({...toggleRegisterModal,open:false}),
            title:toggleRegisterModal?.title,
            body:toggleRegisterModal?.message
          }
        })
      }
    </div>
  )
}

export default RegisterPage;











// import React, { useState } from 'react';
// import * as Yup from 'yup';
// import { handleApiRequest, loadingStates, registerFormData } from './authUtils';
// import useFormHook from '../hooks/useFormHook';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { registerThunkApi } from '../api/todoApi';
// import ReuseModal from '../reusables/ReuseModal';

// const RegisterPage = () => {
//   const [toggleRegisterModal, setToggleRegisterModal] = useState({
//     open: false,
//     title: 'Registering User',
//     message: '',
//   });

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const initialValues = {
//     name: '',
//     email: '',
//     password: '',
//     role: '',
//   };

 
//   const onSubmit = async values => {
//     try {
//       await handleApiRequest(dispatch, registerThunkApi, values, setToggleRegisterModal,navigate,"/login");
//       // navigate('/login');
//     } catch (error) {
//       console.error('Network error:', error);
//     }
//   };

//   const validationSchema = Yup.object({
//     name: Yup.string().required('Name is required!'),
//     email: Yup.string().email('Invalid email format').required('Email is required!'),
//     password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required!'),
//     role: Yup.string().required('Role is required!').notOneOf([''], 'Role is required!'),
//   });

//   return (
//     <div className="container makeCenter">
//       {useFormHook({
//         initialValues,
//         onSubmit,
//         validationSchema,
//         formData: registerFormData,
//         title: 'Register Page',
//       })}
//       <ReuseModal
//         open={toggleRegisterModal.open}
//         handleClose={() => setToggleRegisterModal(prev => ({ ...prev, open: false }))}
//         modalTitle={toggleRegisterModal.title}
//         modalBody={toggleRegisterModal.message}
//       />
//     </div>
//   );
// };

// export default RegisterPage;









