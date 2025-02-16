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