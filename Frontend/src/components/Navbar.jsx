import React,{useContext, useEffect, useRef} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'
import { Shopcontext } from '../context/shopcontext';

function Navbar() {
   const navigate=useNavigate();
  let openRef=useRef();
  const {Setshowsearch,getCountdata,token,setToken}=useContext(Shopcontext)
  
   const handleOpen=()=>{
      openRef.current.style.transform = 'translatex(-16rem)'     
   }

   const handleclose=()=>{
      openRef.current.style.transform = 'translatex(16rem)'
   }

   const Removetoken =()=>{
       localStorage.removeItem('token');
       setToken('');
       navigate('/login')
   }



  return (
    <div className='bg-white  w-full flex items-center justify-between '>
       <nav className='w-full h-[34px] md:h-20 md:px-8 xl:w-[90%] mx-auto xl:h-7  flex items-center justify-between border-b border-black/60 px-2 py-7 '>

          <div> <Link to='/home' className='text-xl md:text-3xl 2xl:text-2xl font-medium font-sans'>ShopNest</Link> </div>

         {token || localStorage.getItem('token') ? <>
      
          <div className=' hidden xl:flex items-center justify-center gap-8'>
            <Link to='/home' className='uppercase font-sans text-xs font-medium text-black/60 hover:underline'>Home</Link> 

             <Link to='/collection' className='uppercase font-sans text-xs font-medium text-black/60 hover:underline'>collection</Link>
             <Link to='/about' className='uppercase font-sans text-xs font-medium text-black/60 hover:underline'>About</Link>
             <Link to='/contact' className='uppercase font-sans text-xs font-medium text-black/60 hover:underline'>contact</Link>
          </div>
             </>:''}
         

          <div className='flex items-center gap-2'>
            <p onClick={()=>Setshowsearch(true)} className='md:text-3xl xl:text-lg cursor-pointer text-black/60'> <i className="ri-search-line"></i> </p>
             
             
             <div className='group relative'>
                <Link to='/login' className=' md:text-3xl xl:text-lg cursor-pointer text-black/60'> <i className="ri-account-circle-line"></i> </Link>
                 
                 {token || localStorage.getItem('token') && 
                <div className='group-hover:block hidden absolute dropdown-menu -right-8 pt-4'>
                   <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500'>
                      <p className='cursor-pointer hover:text-black'>My Profile</p>
                      <p onClick={()=>navigate('/myorder')}  className='cursor-pointer hover:text-black'>Orders</p>
                      <p onClick={Removetoken} className='cursor-pointer hover:text-black'>Logout</p>
                   </div>
                </div>
             }
             </div>
           
            <div className='relative'>
               <Link to='/cart'>
               <p className=' md:text-3xl xl:text-lg cursor-pointer text-black/60'> <i className="ri-shopping-cart-2-line"></i> </p>
               <p className='text-xs absolute top-3.5 -right-0.5 bg-black/70 text-white w-4 h-3.5 rounded flex items-center justify-center'>{getCountdata()}</p>
               </Link> 
            </div>
           
           {token || localStorage.getItem('token') ? <>
               <p onClick={handleOpen} className=' md:text-3xl xl:text-xl font-semibold xl:hidden 2xl:hidden'> <i className="ri-menu-line"></i> </p>
           </>:''}
           
          </div>

       </nav>

       {/* navbar for mobile device */}           
       <ul ref={openRef} className={`bg-gray-400 font-medium lg:block xl:hidden flex flex-col items-start gap-4  py-20 px-10 fixed -right-64 top-0 bottom-0 w-64  z-50 h-screen  transition duration-500`}>
            <div className='absolute right-6 top-6 lg:right-7'>
               <p onClick={handleclose} className='w-5 font-bold text-lg sm:text-2xl cursor-pointer lg:text-4xl'> <i className="ri-close-line"></i> </p>
            </div>
            <li className='lg:mt-'><Link to='/home'  onClick={handleclose} className='text-sm md:text-xl lg:text-2xl'>Home</Link></li>
            <li className='lg:mt-8'><Link to='/collection'  onClick={handleclose} className='text-sm md:text-xl lg:text-2xl'>collection</Link></li>
            <li className='lg:mt-8'><Link to='/about'  onClick={handleclose} className='text-sm md:text-xl lg:text-2xl'>About</Link></li>
            <li className='lg:mt-8'><Link to='/contact'  onClick={handleclose} className='text-sm md:text-xl lg:text-2xl'>Contact</Link></li>
            
         </ul>

    </div>
  )
}

export default Navbar
