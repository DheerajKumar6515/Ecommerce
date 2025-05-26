import React, { Children, useContext, useEffect } from 'react'
import { Shopcontext } from '../context/shopcontext'
import { useNavigate } from 'react-router-dom';

function userprotection({Children}) {
    const {token}=useContext(Shopcontext);
    const navigate=useNavigate();

    useEffect(()=>{
        if(!token || !localStorage.getItem('token')){
           navigate('/login')
        }
    },[token])
  return (
    <>
      {Children}
    </>
  )
}

export default userprotection
