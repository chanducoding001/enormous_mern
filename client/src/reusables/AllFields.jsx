import React from 'react'
import ReusableInput from './ReusableInput';
import ReusableSelect from './ReusableSelect';

const AllFields = (props) => {
    const {componentType} = props;

  switch(componentType){
    case 'input': return <ReusableInput {...props}/>;
    case 'select':return <ReusableSelect {...props}/>;

    default:return <ReusableInput {...props}/>;
  }
}

export default AllFields;
