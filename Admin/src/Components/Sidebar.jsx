import React from 'react'
import {NavLink} from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'

function Sidebar() {
  return (
    <div className='border border-gray-400 w-12 md:w-24 xl:w-[15%] h-screen'>
       
       <div className='pt-2 md:pt-8 md:gap-10 w-full flex flex-col items-center justify-start xl:items-start xl:px-3 gap-5 '>

          <NavLink to='/' className='flex w-full gap-2 cursor-pointer items-center justify-start xl:h-[33px] xl:gap-1 hover:bg-linear-60 from-pink-200 to-transparent '>
             <p className='text-xl pl-3 md:pl-7 xl:pl-0 md:text-4xl text-slate-800  xl:text-[22px] '><i className="ri-add-circle-line"></i></p>
             <p className='hidden xl:block xl:text-base'>Add Item</p>
          </NavLink>

           <NavLink to='/list' className='flex w-full gap-2 cursor-pointer items-center justify-start xl:h-[33px] xl:gap-1 hover:bg-linear-60 from-pink-200 to-transparent'>
             <p className='text-xl pl-3 md:pl-7 xl:pl-0 md:text-4xl text-slate-800 xl:text-[22px] '><i className="ri-calendar-check-line"></i></p>
             <p className='hidden xl:block xl:text-base'>List Item</p>
          </NavLink>

           <NavLink to='/orders' className='flex w-full gap-2 cursor-pointer items-center justify-start xl:h-[33px] xl:gap-1 hover:bg-linear-60 from-pink-200 to-transparent'>
             <p className='text-xl pl-3 md:pl-7 xl:pl-0 md:text-4xl text-slate-800 xl:text-[22px] '><i className="ri-calendar-todo-line"></i></p>
             <p className='hidden xl:block xl:text-base'>Orders</p>
          </NavLink>
       </div>

    </div>
  )
}

export default Sidebar
