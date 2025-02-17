
import React, { useState } from 'react'
import * as Yup from 'yup';
import { loginFormData,  } from './authUtils';
import useFormHook from '../hooks/useFormHook';
import {jwtDecode} from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ReuseModal from '../reusables/ReuseModal';

const Login = () => {
  const navigate = useNavigate();
    const [toggleLoginModal, setToggleLoginModal] = useState({
      open: false,
      title: 'Login User',
      message: '',
    });
  const dispatch = useDispatch();

  const initialValues = {
    email:'',
    password:'',
    confirmPassword:''
  };
  
  const onSubmit = async (values) => {
    console.log(values);
    const required = (({confirmPassword,...rest})=>rest)(values);
    try {
        const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_LOGIN_URL}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // 🛠 Important: Set content type
                },
                body: JSON.stringify(required),
            }
        );

        if (!response.ok) {
            const errorMessage = await response.json(); // 🛠 Get error message from server
            console.log("login failed:", typeof errorMessage);
            setToggleLoginModal({
              ...toggleLoginModal,
              open:true,
              title:response?.status,
              message:errorMessage?.message
            })
            return;
        }

        console.log("login successful");
        // navigate("/login");
        const data = await response.json();
        const token = data?.data?.token;
        if(!token)return;
        const unsigned = jwtDecode(token);
        console.log("unsigned",unsigned);
        
        // localStorage.setItem('loginUser',unsigned);
        localStorage.setItem("loginUser", JSON.stringify(unsigned));
        window.dispatchEvent(new Event("loginStatusChanged"));

        navigate('/');
    } catch (error) {
        console.error("Network error:", error);
    }
};


const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required!'),
  
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required!'),
  
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match') // Ensures confirmPassword matches password
    .required('Confirm password is required!'),
});


  
  return (
    <div className='container makeCenter'>
      {
        useFormHook({
          initialValues,
          onSubmit,
          validationSchema,
          formData:loginFormData,
          title:'Login Page',
          modalProps:{
            open:toggleLoginModal?.open,
            handleClose:()=>setToggleLoginModal({...toggleLoginModal,open:false}),
            title:toggleLoginModal?.title,
            body:toggleLoginModal?.message
          }
        })
      }
    </div>
  )
}

export default Login;










// import React, { useState } from 'react'
// import * as Yup from 'yup';
// import { handleApiRequest, loginFormData,  } from './authUtils';
// import useFormHook from '../hooks/useFormHook';
// import {jwtDecode} from "jwt-decode";
// import { useNavigate } from 'react-router-dom';
// import { loginThunkApi } from '../api/todoApi';
// import ReuseModal from '../reusables/ReuseModal';
// import { useDispatch } from 'react-redux';

// const Login = () => {
//   const navigate = useNavigate();
//   const [toggleLoginModal, setToggleLoginModal] = useState({
//       open: false,
//       title: 'Login User',
//       message: '',
//     });
//   const dispatch = useDispatch();

//   const initialValues = {
//     email:'',
//     password:'',
//     confirmPassword:''
//   };
  
//   const onSubmit = async (values) => {
//     console.log(values);
//     const required = (({confirmPassword,...rest})=>rest)(values);
    
//           try {
//             await handleApiRequest(dispatch, loginThunkApi, required, setToggleLoginModal,navigate,"/");
//             // navigate('/login');
//           } catch (error) {
//             console.error('Network error:', error);
//           }
// };


// const validationSchema = Yup.object({
//   email: Yup.string()
//     .email('Invalid email format')
//     .required('Email is required!'),
  
//   password: Yup.string()
//     .min(6, 'Password must be at least 6 characters')
//     .required('Password is required!'),
  
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref('password'), null], 'Passwords must match') // Ensures confirmPassword matches password
//     .required('Confirm password is required!'),
// });


  
//   return (
//     <div className='container makeCenter'>
//       {
//         useFormHook({
//           initialValues,
//           onSubmit,
//           validationSchema,
//           formData:loginFormData,
//           title:'Login Page'
//         })
//       }
//       <ReuseModal
//         open={toggleLoginModal.open}
//         handleClose={() => setToggleLoginModal(prev => ({ ...prev, open: false }))}
//         modalTitle={toggleLoginModal.title}
//         modalBody={toggleLoginModal.message}
//       />
//     </div>
//   )
// }

// export default Login;






