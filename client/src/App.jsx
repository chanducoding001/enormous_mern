import React from 'react'
import SubmitBtn from './reusables/SubmitBtn';
import RegisterPage from './auth/RegisterPage';
import Login from './auth/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import InstallButton from './reusables/InstallButton';
import LayoutComponent from './components/LayoutComponent';
import AuthProtection from './components/AuthProtection';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoutes from './components/AdminRoutes';
import WelcomePage from './components/WelcomePage';
import VisitWork from './components/VisitWork';

const App = () => {

  const handleClick = ()=>{
    console.log("btn clicked");
  }
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<LayoutComponent/>}>
      <Route element={<AuthProtection/>}>
        <Route path='register' element={<RegisterPage/>}/>
        <Route path='login' element={<Login/>}/>
      </Route>
      <Route element={<ProtectedRoute/>}>
        <Route index element={<WelcomePage/>}/>
        <Route path='visitWork' element={<VisitWork/>}/>
        <Route element={<AdminRoutes role={1}/>}>
          {/* <Route path='admin' element={}/> */}
        </Route>
        <Route element={<AdminRoutes role={2}/>}>
          {/* <Route path='admin' element={}/> */}
        </Route>
      </Route>
      </Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
