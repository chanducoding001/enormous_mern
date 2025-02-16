import React from 'react'

const SubmitBtn = (props) => {
    const {type,text,handleClick,btnClasses} = props;
  return (
    <>
      <button 
      onClick={handleClick} 
      type={type}
      className={`btnStyles ${btnClasses}`}
      >
        {text}
      </button>
    </>
  )
}

export default SubmitBtn;
