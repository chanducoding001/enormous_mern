import { ErrorMessage, Field } from 'formik';
import React from 'react'

const ReusableInput = (props) => {
    const {type,name,placeholder} = props;
  return (
    <div className='inputContainer'>
      <Field name={name} className='inputField' placeholder={placeholder} type={type}/>
      <ErrorMessage name={name} className='errorMsg' component='p'/>
    </div>
  )
}

export default ReusableInput;
