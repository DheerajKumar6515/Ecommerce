import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Login({setToken}) {
    
     const [email,setEmail]=useState('');
     const [password,setPassword]=useState('');
     const navigate=useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/users/admin`,{email,password});
            
            if(res.data.success){
                setToken(res.data.admintoken);
                toast.success(res.data.message)
                navigate('/');
            }
            
        } catch (error) {
            toast.error(res.data.message)
        }
    }


  return (
    <div className='bg-slate-100 w-full h-screen flex items-center justify-center'>
        <div className='bg-white px-5 py-5 rounded'>
            <h1 className='text-xl font-bold capitalize'>admin panel</h1>
            <form onSubmit={handleSubmit} action="#" method="post">
                <div className='flex flex-col'>
                    <label className='text-base font-semibold pt-3 mb-2' htmlFor="">Email Address</label>
                    <input className='w-64 text-base border py-1 px-1.5 border-gray-500 rounded' onChange={(e)=>setEmail(e.target.value)} type="email" value={email}  placeholder='youremail.com' required/>
                </div>

                 <div className='flex flex-col mb-3'>
                    <label className='text-base font-semibold pt-1 mb-2' htmlFor="">Password</label>
                    <input className='w-64 text-base border py-1 px-1.5 border-gray-500 rounded' onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder='Enter your password' required/>
                </div>

                <button className='bg-black cursor-pointer text-white w-full rounded py-1 hover:bg-black/80' type="submit">Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login
