import React, { useContext, useEffect, useState } from 'react'
import { Shopcontext } from '../context/shopcontext'
import { useLocation } from 'react-router-dom'

function Search() {
    const {showsearch,search,Setsearch,Setshowsearch}=useContext(Shopcontext)
    const location=useLocation()
    const [visiable,Setvisiable]=useState(false)

    useEffect(()=>{
        if(location.pathname.includes('collection') ){
            Setvisiable(true)
        } else{
            Setvisiable(false)
        }   
               
    },[location])
  return visiable && showsearch ? (
    <div className={` flex items-center justify-center bg-gray-100 w-full h-12 md:h-20 xl:h-12 xl:w-[90%] xl:m-auto`}>
       
       <div className='inline-flex items-center border border-gray-500 w-[17rem] rounded-full h-8 md:w-[30rem] md:h-14 lg:w-[36rem] xl:h-9 xl:w-[27rem]'>
          <input value={search} onChange={(e)=>Setsearch(e.target.value)} className='flex-1 outline-0 bg-inherit text-sm px-5 pb-1  rounded-full h-7 md:text-xl xl:text-sm' type="text" placeholder='search' />
          <p  className=' w-8 px-2 md:w-14 xl:w-10 md:text-3xl xl:text-base cursor-pointer text-black/80'> <i className="ri-search-line"></i> </p>
       </div>
       <div className=''>
               <p onClick={()=>Setshowsearch(false)} className='w-5 text-lg md:px-2 md:text-3xl cursor-pointer lg:text-4xl xl:text-lg'> <i className="ri-close-line"></i> </p>
            </div>

    </div>
  ):null
}

export default Search
