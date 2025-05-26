import React, { useContext, useEffect, useState } from 'react'
import Footer from '../components/Footer'
import { Shopcontext } from '../context/shopcontext'

function Cartpage() {
  const {products,currency,cartItem,deliveryfee,updateQuantity,getTotalcount,navigate}=useContext(Shopcontext);
  const [cartData,setCartData]=useState([])

  useEffect(()=>{
     let tempData=[];
     for(const items in cartItem){
       for(const item in cartItem[items]){
         if(cartItem[items][item] > 0){
           tempData.push({
            _id:items,
            size:item,
            Quantity:cartItem[items][item]
           })
         }
       }
     }
      setCartData(tempData);
      

  },[cartItem])

  
  return (
    <div className='flex flex-col justify-between h-screen px-2 md:px-4 xl:w-[90%] xl:m-auto 2xl:w-[85%]'>

      <div>
      <h1 className='uppercase font-medium py-3 border-b border-gray-300 md:text-3xl md:py-6 lg:py-8 xl:pt-10 xl:pb-3 xl:text-2xl'><span className='text-gray-500'>your</span> <span>cart___</span></h1>
        
        {cartData.map((item,id)=>{
           
            const productdata = products.find((product)=> String(product._id) === String(item._id));
            
          return(

            <div key={id} className='flex items-center justify-between py-2 border-b border-gray-300 md:py-3 lg:py-4 xl:py-1.5'>
            <div className='flex gap-[7px] md:gap-4'>
  
               <div className='w-16 h-16 overflow-hidden md:w-32 md:h-32 xl:w-16 xl:h-16'>
                <img className='w-full h-full object-fill' src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${productdata.image[0]}`} alt="" />
                </div>
  
               <div>
                  <p className='w-[7rem] text-xs capitalize md:text-xl md:w-64 lg:text-2xl xl:text-[15px]'>{productdata?.name}</p>
                   <div className='flex items-center justify-items-start gap-7 pt-1.5'>
                    <p className='text-xs text-gray-600 md:text-xl lg:text-2xl xl:text-[15px]'>{currency}{productdata?.price}</p>
                     <p className='text-xs text-gray-600 md:text-xl lg:text-2xl xl:text-[15px]'>{item.size}</p>
                   </div>
               </div>
            </div>
  
            <div className='w-12 overflow-hidden'>
              <input onChange={(e)=> e.target.value === '' || e.target.value === '0'? null : updateQuantity(item._id,item.size,Number(e.target.value))} type='number' min={1} defaultValue={item.Quantity} className='w-12 text-gray-600 text-xs md:text-2xl lg:text-3xl xl:text-lg outline-0'/>
               
            </div>
  
            <div>
              <p onClick={()=>updateQuantity(item._id,item.size,0)} className='text-base cursor-pointer text-gray-600 md:text-3xl lg:text-4xl xl:text-xl'><i className="ri-delete-bin-5-line"></i></p>
            </div>
  
        </div>
          )
           
        })}

     

        {/* cart total section */}
       <div className='md:flex md:items-center md:justify-end md:mt-8'>
      <div className='md:w-[26rem] lg:w-[32rem] xl:w-96'>
      <h1 className='uppercase font-medium text-base pt-5 md:text-2xl md:pt-7 lg:text-3xl lg:pb-3 xl:text-lg'><span className='text-gray-400'>cart</span> <span>totals____</span></h1>
                <div>
                   <div className='flex items-center justify-between py-1'>
                     <p className='capitalize text-sm text-gray-600 md:text-xl lg:text-3xl xl:text-base'>subtotal</p>
                     <p className='text-sm text-gray-600 md:text-xl lg:text-3xl xl:text-base'>{currency}{getTotalcount()}.00</p>
                   </div>

                   <div className='flex items-center justify-between py-1'>
                     <p className='capitalize text-sm text-gray-600 md:text-xl lg:text-3xl xl:text-base'>shipping free</p>
                     <p className='text-sm text-gray-600 md:text-xl lg:text-3xl xl:text-base'>{currency}{deliveryfee}</p>
                   </div>

                   <div className='flex items-center justify-between py-1'>
                     <p className='capitalize text-sm font-medium md:text-xl lg:text-3xl xl:text-base'>Total</p>
                     <p className='text-sm md:text-xl lg:text-3xl xl:text-base'>{currency}{getTotalcount() === 0? 0: getTotalcount() + deliveryfee}.00</p>
                   </div>
                </div>

                <div className='w-full flex items-center justify-end md:mt-3 xl:-mt-10'>
                 <button onClick={()=>navigate('/delivery')} className='text-white bg-black py-2 px-2 mt-4 uppercase cursor-pointer text-xs md:text-xl md:py-3 md:px-8 lg:text-2xl lg:py-4 lg:px-10 xl:mt-16 xl:h-8 xl:text-[11px] xl:pt-2 xl:px-1.5' type="submit">proceed to checkout</button>
                </div>

      </div>
      </div>

      </div>

      {/* footer section */}
       <Footer/>

    </div>
  )
}

export default Cartpage
