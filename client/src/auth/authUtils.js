export const registerFormData = [
    {
      id:1,
      name:'name',
      placeholder:'Name',
      componentType:'input',
      type:'text'
    },
    {
      id:2,
      name:'email',
      placeholder:'Email',
      componentType:'input',
      type:'text'
    },
    {
      id:4,
      name:'role',
      placeholder:'Role',
      componentType:'select',
      type:'select',
      options:[
        {
          label:"admin",
          value:"admin",
        },
        {
          label:"user",
          value:"user",
        },
      ]
    },
    {
      id:3,
      name:'password',
      placeholder:'Password',
      componentType:'input',
      type:'password'
    },
    
  ];
export const loginFormData = [
    {
      id:2,
      name:'email',
      placeholder:'Email',
      componentType:'input',
      type:'text'
    },
    {
      id:3,
      name:'password',
      placeholder:'Password',
      componentType:'input',
      type:'password'
    },
    {
      id:1,
      name:'confirmPassword',
      placeholder:'Confirm Password',
      componentType:'input',
      type:'password'
    },
  ];


  export const roles = {
    ADMIN:'admin',
    USER:'user'
  };

  export const loadingStates = {
    IDLE:'idle',
    PENDING:'pending',
    FULFILLED:'fulfilled',
    REJECTED:'rejected',
  };

  export const dataStates = {
    loading:loadingStates.IDLE,
    data:[],
    error:null
  };

export const handleApiRequest = async (dispatch, thunk, values, setModalState,navigate,navigateUrl) => {
    const result = await dispatch(thunk(values));

    if (result.meta.requestStatus === loadingStates.PENDING) {
      setModalState(prev => ({
        ...prev,
        open: true,
        title: 'Registering User',
        message: 'Registration is pending!',
      }));
    } else if (result.meta.requestStatus === loadingStates.FULFILLED) {
      setModalState(prev => ({
        ...prev,
        open: true,
        title: 'Success',
        message: 'Registration successful!',
      }));
      navigate(navigateUrl);
    } else if (result.meta.requestStatus === loadingStates.REJECTED) {
      const statusCode = result.payload?.status || 500; // Default to 500 if undefined
      // const errorMessage = registerError?.message || 'Cannot register user';
      const errorMessage = result.payload?.message || 'Cannot register user';
      
      setModalState(prev => ({
        ...prev,
        open: true,
        title: `Error ${statusCode}`,
        message: errorMessage,
      }));
    }
  };
