import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify';


function List({token}) {
  const [listproduct,setListproduct]=useState([])
  const currency ='$';

   const allproduct=async()=>{
       try {
          const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/products/Listproduct`);
           
          if(res.data.success){
            setListproduct(res.data.products);            
          }
       } catch (error) {
         toast.error(error.message);
       }
   }

   const Deleteproduct=async(id)=>{
       try {
          const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/products/deleteproduct/${id}`,{headers:{Authorization:`Bearer ${token}`}});
           if(res.data.success){             
              setListproduct(prev =>prev.filter(item => item._id !== id) )
              toast.success(res.data.message);
           }
       } catch (error) {
         toast.error(error.message);
       }     
   }

   
   useEffect(()=>{
      allproduct()
   },[])
 
   
  return (
    <div className='px-5 py-1'>
      <h1 className='text-xl font-medium'>All Product List</h1>
      {/* list header */}
      <div className='grid grid-cols-5  mt-3'>
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b>Action</b>
      </div>

       {/* list all product */}
       {listproduct.map((item)=>(
          <div key={item._id} className='grid grid-cols-5 mt-1 border-b border-gray-400 py-1 '>
         <img className='w-16 rounded-xs' src={`${import.meta.env.VITE_BASE_URL}/uploads/${item.image[0]}`} alt="" />
         <p className='text-sm'>{item.name}</p>
         <p className='text-sm'>{item.category}</p>
         <p className='text-sm'>{currency}{item.price}</p>
         <p onClick={()=>Deleteproduct(item._id)} className='cursor-pointer text-xs'>&#10006;</p>
         </div>
       ))}
       
    </div>
  )
}

export default List
