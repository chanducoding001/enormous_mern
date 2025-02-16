import React from 'react'
import useLoginUser from '../hooks/useLoginUser';

const WelcomePage = () => {

    // const loginUser = JSON.parse(localStorage.getItem("loginUser"));
    const {name,email} = useLoginUser();
  return (
    <>
    
    <div className='wrapper makeCenter'>
        <div className='card1 makeCenter'>
      <h1>Hii {name} Welcome to the Enormous It!</h1>
      <h2>Your login Mail is {email}</h2>
    </div>
    </div>
    </>
  )
}

export default WelcomePage;
