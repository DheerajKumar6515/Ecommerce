import React, { useContext, useState } from 'react'
import Footer from '../components/Footer'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { Shopcontext } from '../context/shopcontext'

function Signuppage() {
    const {setToken}=useContext(Shopcontext);
    const navigate=useNavigate();
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    
    const handleSubmit=async(e)=>{
       e.preventDefault()
       try {
          const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/signup`,{name,email,password});
          if(res.data.success){
             navigate('/home')
             setToken(res.data.token);
             localStorage.setItem('token',res.data.token);
             toast.success('signup successful.')
          }
       } catch (error) {
         toast.error(error.message);
       }
    }

    const handlesubscribe=()=>{}

  return (
    <div className={` w-full h-[92vh] flex flex-col items-center justify-between `}>

        <div className={` w-full h-[80%] flex flex-col items-center justify-center `}>
            <h1 className={`text-center pt-26 text-xl font-serif md:text-4xl md:pb-5 lg:text-5xl xl:text-xl xl:pt-42`}>Sign Up <i className="ri-login-box-line"></i> </h1>

            <form className={`mt-3 flex flex-col gap-2 items-center justify-center`} onSubmit={handleSubmit} action="#" method='post'>

               <input className={`border outline-0 border-gray-500 w-64 py-2 px-2 text-sm mx-auto rounded-sm md:w-[27rem] md:py-4 md:px-2.5 md:text-xl md:mb-4 lg:w-[32rem] lg:py-5 lg:text-xl xl:w-80 xl:text-sm xl:py-2 xl:px-2 xl:mb-2`} type="text" onChange={(e)=>setName(e.target.value)} value={name} placeholder='Name' required />

                <input className={`border outline-0 border-gray-500 w-64 py-2 px-2 text-sm mx-auto rounded-sm md:w-[27rem] md:py-4 md:px-2.5 md:text-xl md:mb-4 lg:w-[32rem] lg:py-5 lg:text-xl xl:w-80 xl:text-sm xl:py-2 xl:px-2 xl:mb-2`} type="email" onChange={(e)=>setEmail(e.target.value)} value={email} placeholder='Email' required />

                <input className={`border outline-0 border-gray-500 w-64 py-2 px-2 text-sm mx-auto rounded-sm md:w-[27rem] md:py-4 md:px-2.5 md:text-xl lg:w-[32rem] lg:py-5 lg:text-xl xl:w-80 xl:py-2 xl:text-sm xl:px-2`} type="password" onChange={(e)=>setPassword(e.target.value)} value={password} placeholder='Password' required />
                 
                 <div className={` mt-1 text-xs flex items-center justify-between gap-14 md:gap-32 md:py-1.5 lg:gap-42 xl:gap-[80px] xl:mt-0`}>
                    <a className={`cursor-pointer text-gray-600 md:text-lg lg:text-xl xl:text-sm`} href="#">Forget your password?</a>
                    <Link to='/login' className={`cursor-pointer text-gray-600 md:text-lg lg:text-xl xl:text-sm`} href="#">Login here.</Link>
                 </div>

                 <button className={`bg-black/80 mb-2 hover:bg-black text-white px-6 text-sm py-2 mt-3 cursor-pointer rounded md:text-2xl md:py-4 md:mt-7 md:px-16 xl:text-sm xl:py-1.5 xl:px-7 xl:mt-3`}type="submit">Create</button>
            </form>
        </div>

        <div className=' hidden xl:block xl:pt-20'>
            <h3 className={`text-center text-lg font-medium`}>Subscribe now & get 20% off</h3>
            <p className={`text-xs text-center px-10 font-sans xl:py-1.5 xl:text-sm xl:tracking-wide`}>Lorem ipsum dolor sit amet consectetur adipisicing elit dolor sit amet consectetur.</p>

            <form onSubmit={handlesubscribe} className={`pt-3 flex flex-col gap-2 xl:flex-row xl:block xl:px-28 `} action="#">
                <input className={`border border-gray-500 w-64 py-2 px-2 text-sm mx-auto rounded-sm outline-0`} type="text" name="subscribe"  placeholder='Enter your email id' required/>
                <button className={`bg-black mt-2 mx-auto text-sm rounded py-2 px-8 text-white font-sans cursor-pointer` }type="submit">Subscribe</button>
            </form>
        </div>

        <Footer/>

    </div>
  )
}

export default Signuppage
