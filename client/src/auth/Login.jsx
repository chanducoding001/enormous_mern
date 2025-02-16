import React from 'react'
import * as Yup from 'yup';
import { loginFormData,  } from './authUtils';
import useFormHook from '../hooks/useFormHook';
import {jwtDecode} from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

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
            `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_AUTH_TAIL_URL}${import.meta.env.VITE_LOGIN_URL}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // 🛠 Important: Set content type
                },
                body: JSON.stringify(required),
            }
        );

        if (!response.ok) {
            const errorMessage = await response.text(); // 🛠 Get error message from server
            console.log("login failed:", errorMessage);
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
        console.error("❌ Network error:", error);
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
          title:'Login Page'
        })
      }
    </div>
  )
}

export default Login;
