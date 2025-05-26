import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className=' xl:pt-28 xl:px-20 2xl:pt-26 2xl:px-28'>
        <Link to='/home' className={`flex items-center justify-center text-xl font-sans font-medium md:text-2xl xl:hidden `}>ShopNest<span className={`text-red-500 text-4xl`}>.</span> </Link>

       <div className={`grid grid-cols-1 xl:grid-cols-3 border-b border-b-gray-400`}>

          <div className='xl:flex xl:flex-col xl:items-center xl:justify-center'>
          <h4 className='uppercase hidden xl:text-xs xl:tracking-wide xl:block xl:font-medium'>ShopNest</h4>
            <p className='text-center text-black/60 text-xs py-3 px-5 font-sans md:text-lg md:px-16 md:tracking-wide xl:text-[11px] xl:text-start'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex rerum maiores est nam quam officiis voluptas laborum commodi perferendis tempora. Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, dolor.</p>
          </div>

          <div className={` flex items-center justify-center gap-3 mb-3 capitalize xl:flex-col `}>
              <h4 className='uppercase hidden xl:text-xs xl:tracking-wide xl:block xl:font-medium xl:mt-[-63px] 2xl:mt-[-44px] '>company</h4>
              <div className='flex gap-3 lg:gap-5'>
              <a href="#" className='text-xs text-black/60 cursor-pointer md:text-lg xl:text-xs'>home</a>
             <a href="#" className='text-xs text-black/60 cursor-pointer md:text-lg xl:text-xs'>about us</a>
             <a href="#" className='text-xs text-black/60 cursor-pointer md:text-lg xl:text-xs'>delivery</a>
             <a href="#" className='text-xs text-black/60 cursor-pointer md:text-lg xl:text-xs'>privacy policy</a>
              </div>
             
          </div>

          <div className={` flex items-center justify-center gap-3 mb-3 xl:flex-col`}>
          <h4 className='uppercase hidden xl:text-xs xl:tracking-wide xl:block xl:font-medium xl:-mt-8 2xl:-mt-4'>get in touch</h4>
             <p className='text-xs text-black/60 md:text-lg xl:text-xs'>+1-212-456-7890</p>
             <p className='text-xs text-black/60 md:text-lg xl:text-xs'>kumardev@gmail.com</p>
          </div>

       </div>

       <p className={`text-xs text-black/60 text-center py-3 md:text-sm md:py-5 md:tracking-wider xl:py-3 xl:text-xs 2xl:py-4`}>Copyright 2025 &copy; Dk.dev - All Right Reserved.</p>

    </div>
  )
}

export default Footer
