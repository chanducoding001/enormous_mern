import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Button,
  Typography,
  Container
} from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import ButtonLink from "../reusables/ButtonLink";
import InstallButton from "../reusables/InstallButton";

const LayoutComponent = () => {
  const [isLogin, setIsLogin] = React.useState(
    !!JSON.parse(localStorage.getItem("loginUser"))
  );
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleLoginChange = () => {
      setIsLogin(!!JSON.parse(localStorage.getItem("loginUser")));
    };

    window.addEventListener("loginStatusChanged", handleLoginChange);
    return () => {
      window.removeEventListener("loginStatusChanged", handleLoginChange);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("loginUser");
    window.dispatchEvent(new Event("loginStatusChanged"));
    navigate("/login");
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
              paddingY: { xs: 1, sm: 2 },
            }}
          >
            {/* LOGO + TITLE */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                flexShrink: 0,
                cursor:'pointer'
              }}
              onClick={()=>navigate("/")}
            >
              <img
                src="./logoImg.png"
                height="40px"
                width="40px"
                alt="Enormous Logo"
                style={{ borderRadius: "50%" }}
              />
              <Typography
                sx={{
                  display: { xs: "none", sm: "block" },
                  fontSize: { xs: "16px", sm: "20px" },
                  fontWeight: "bold",
                  
                }}
              >
                Enormous IT
              </Typography>
            </Box>

            {/* NAVIGATION BUTTONS */}
            <Box
              sx={{
                display: "flex",
                gap: 1,
                flexWrap: "wrap",
                justifyContent: { xs: "center", sm: "flex-end" },
                width: { xs: "100%", sm: "auto" },
              }}
            >
              {!isLogin ? (
                <>
                  <ButtonLink
                    onClick={() => navigate("/register")}
                    btnText="Register"
                  />
                  <ButtonLink
                    onClick={() => navigate("/login")}
                    btnText="Login"
                  />
                </>
              ) : (
                <ButtonLink btnText="Visit Work" onClick={()=>navigate("/visitWork")}/>

              )}
            </Box>

            {/* LOGOUT & INSTALL BUTTONS */}
            <Box
              sx={{
                display: "flex",
                gap: 1,
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: { xs: "center", sm: "flex-end" },
                width: { xs: "100%", sm: "auto" },
              }}
            >
              {isLogin && (
                <Button
                  sx={{
                    color: "white",
                    bgcolor: "#FF6B6B",
                    padding: "8px 12px",
                    fontSize: "14px",
                    "&:hover": {
                      bgcolor: "#D9363E",
                    },
                  }}
                  onClick={logout}
                >
                  Log out
                </Button>
              )}
              <InstallButton/>
                {/* <Button
        sx={{
          color: "white",
          bgcolor: "#FF6B6B",
          padding: "8px 12px",
          fontSize: "14px",
          "&:hover": {
            bgcolor: "#D9363E",
          },
        }}
      >
        Install App
      </Button> */}
              {/* <Button
                sx={{
                  bgcolor: "#317EFB",
                  color: "#fff",
                  padding: "8px 12px",
                  borderRadius: "5px",
                  fontSize: "14px",
                  width: { xs: "100%", sm: "auto" },
                  maxWidth: "200px",
                  "&:hover": {
                    bgcolor: "#1E5AC8",
                  },
                }}
              >
                Install App
              </Button> */}
              
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Box>
        <Outlet />
      </Box>
    </>
  );
};

export default LayoutComponent;










// import * as React from "react";
// import {
//   AppBar,
//   Box,
//   Toolbar,
//   Button,
//   Typography,
//   Container
// } from "@mui/material";
// import { Outlet, useNavigate } from "react-router-dom";

// const LayoutComponent = () => {
//   const [isLogin, setIsLogin] = React.useState(
//     !!JSON.parse(localStorage.getItem("loginUser"))
//   );
//   const navigate = useNavigate();

//   React.useEffect(() => {
//     const handleLoginChange = () => {
//       setIsLogin(!!JSON.parse(localStorage.getItem("loginUser")));
//     };

//     window.addEventListener("loginStatusChanged", handleLoginChange);
//     return () => {
//       window.removeEventListener("loginStatusChanged", handleLoginChange);
//     };
//   }, []);

//   const logout = ()=>{
//     localStorage.removeItem('loginUser');
//     window.dispatchEvent(new Event("loginStatusChanged"));
//     navigate('/login');
//   }
//   return (
//     <>
//       <AppBar position="static">
//         <Container maxWidth="xl">
//           <Toolbar
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             {/* LOGO */}
//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 1,
//               }}
//             >
//               <img
//                 src="./logoImg.png"
//                 height="50px"
//                 width="50px"
//                 alt="Enormous Logo"
//                 style={{ borderRadius: "50%" }}
//               />
//               {/* Show only on medium+ screens */}
//               <Typography
//                 sx={{
//                   display: { xs: "none", sm: "block" },
//                   fontSize: "20px",
//                   fontWeight: "bold",
//                 }}
//               >
//                 Enormous IT
//               </Typography>
//             </Box>

//             {/* NAVIGATION BUTTONS (Login/Register or Visit Work) */}
//             <Box
//               sx={{
//                 display: "flex",
//                 gap: 2,
//               }}
//             >
//               {!isLogin ? (
//                 <>
//                   <Button
//                     onClick={() => navigate("/register")}
//                     sx={{ color: "white", display: "block" }}
//                   >
//                     Register
//                   </Button>
//                   <Button
//                     onClick={() => navigate("/login")}
//                     sx={{ color: "white", display: "block" }}
//                   >
//                     Login
//                   </Button>
//                 </>
//               ) : (
//                 <Button sx={{ color: "white", display: "block" }}>
//                   Visit Work
//                 </Button>
//               )}
//             </Box>

//             {/* LOGOUT & INSTALL BUTTONS */}
//             <Box
//               sx={{
//                 display: "flex",
//                 gap: 1,
//                 alignItems: "center",
//                 flexWrap: "wrap",
//                 width: { xs: "100%", sm: "auto" },
//                 justifyContent: { xs: "center", sm: "flex-end" },
//               }}
//             >
//               {
//                 isLogin && <Button
//                 sx={{
//                   color: "white",
//                   // bgcolor: "red",
//                   width: { xs: "100%", sm: "auto" },
//                 }}
//                 className="editDeleteBtn"
//                 onClick={logout}
//               >
//                 Log out
//               </Button>
//               }
              
//               <Button
//                 sx={{
//                   bgcolor: "#317EFB",
//                   color: "#fff",
//                   padding: "10px 10px",
//                   borderRadius: "5px",
//                   fontSize: "clamp(12px, 14px, 16px)",
//                   width: { xs: "100%", sm: "auto" },
//                   maxWidth: "200px",
//                 }}
//                 // className="editDeleteBtn"
//               >
//                 Install App
//               </Button>
//             </Box>
//           </Toolbar>
//         </Container>
//       </AppBar>

//       {/* Page Content */}
//       <Box>
//         <Outlet />
//       </Box>
//     </>
//   );
// };

// export default LayoutComponent;










// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';
// import AdbIcon from '@mui/icons-material/Adb';
// import { Outlet, useNavigate } from 'react-router-dom';
// import InstallButton from '../reusables/InstallButton';
// import useLoginUser from '../hooks/useLoginUser';

// const pages = ['Products', 'Pricing', 'Blog'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

// function LayoutComponent() {
//   const [anchorElNav, setAnchorElNav] = React.useState(null);
//   const [anchorElUser, setAnchorElUser] = React.useState(null);
//   const [isLogin,setIsLogin] = React.useState(!!(JSON.parse(localStorage.getItem("loginUser"))));
//   const navigate = useNavigate();
// React.useEffect(() => {
//     const handleLoginChange = () => {
//       setIsLogin(!!(JSON.parse(localStorage.getItem("loginUser"))));
//     };
  
//     window.addEventListener("loginStatusChanged", handleLoginChange);
    
//     return () => {
//       window.removeEventListener("loginStatusChanged", handleLoginChange);
//     };
//   }, []);
  


//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget);
//   };
//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

//   return (
//     <>
//     <AppBar position="static">
//       <Container maxWidth="xl">
//         <Toolbar disableGutters>
//         <Box sx={{
//             display:'flex',
//             // background:'black',
//             width:'20%',
//             alignItems:'center',
//             justifyContent:'center'
//         }}>
//         <img src='./logoImg.png' height='50px' width='50px' alt='Enormous Logo' style={{
//                 borderRadius:'50%'
//             }}/>
          
//           {
//             !isLogin && <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            
//             <Button onClick={()=>navigate('/register')} sx={{ my: 2, color: 'white', display: 'block' }}>
//                 Register
//             </Button>
//             <Button onClick={()=>navigate('/login')} sx={{ my: 2, color: 'white', display: 'block' }}>
//                 Login
//             </Button>
//           </Box> 
//         //   : <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex',marginLeft:'10px' } }}>
//         //   <Button sx={{ my: 2, color: 'white', display: 'block' }}>Visit Work</Button>
//         //   </Box>
//           }
//         </Box>
//         <Box sx={{
//             // background:'red',
//             // width:'50%',
//             width: { xs: '40%', sm: '60%', md: '30%' },
//             textAlign:'center',
//             display: {xs:'none',sm:'flex'},
//         }}>
//             <Typography sx={{ textWrap: 'nowrap',fontSize:'20px' }}>Enormous IT</Typography>
//         </Box>
        
//         <Box
//   sx={{
//     width: { xs: '60%', sm: '60%', md: '50%' }, // Responsive width
//     // textAlign: 'center',
//     backgroundColor: 'green', // Keep it empty or add a color
//     margin: 'auto', // Center the box
//     display: 'flex',
//     justifyContent: 'space-between',
    
//   }}
// >
//     {/* <InstallButton/> */}
//     <Button sx={{ color: 'white', display: 'block',background:'red',width:'30%' }}>Log out</Button>
//   <button
//     onClick={() => {}}
//     style={{
//       background: '#317EFB',
//       color: '#fff',
//       padding: '10px 10px',
//       border: 'none',
//       borderRadius: '5px',
//       cursor: 'pointer',
//       fontSize: 'clamp(12px, 14px, 16px)', // Responsive font size
//       width: '50%', // Full width on smaller screens
//       maxWidth: '200px', // Prevents button from being too large
//     }}
//   >
//     Install App
//   </button>
// </Box>    
//         </Toolbar>
//       </Container>
//     </AppBar>
//     {/* outlet content */}
//     <Box>
//     <Outlet/>
//     </Box>
//     </>
//   );
// }
// export default LayoutComponent;
