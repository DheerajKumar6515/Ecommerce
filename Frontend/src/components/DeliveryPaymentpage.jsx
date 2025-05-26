import React, { useContext, useEffect, useState } from 'react'
import { Shopcontext } from '../context/shopcontext'
import { toast } from 'react-toastify';
import axios from 'axios';

function DeliveryPaymentpage() {
  
  const {products,currency,getTotalcount,deliveryfee,navigate,cartItem,setCartitem}=useContext(Shopcontext);
  const [method,setMethod]=useState('cod')
  const [amount,setAmount]=useState('')
  const payment=["stripe","razorpay","cod" ];
  const [firstname,setFirstName]=useState('');
  const [lastname,setLastname]=useState('');
  const [email,setEmail]=useState('');
  const [street,setStreet]=useState('');
  const [city,setCity]=useState('');
  const [state,setState]=useState('');
  const [zipcode,setZipcode]=useState('');
  const [country,setCountry]=useState('');
  const [phone,setPhone]=useState('');

  const address ={firstname,lastname,email,street,city,state,zipcode,country,phone};

  const handleSubmit=async(e)=>{
    e.preventDefault();

    try {
     
    let orderItem = [];
     for(const items in cartItem){
       for(const item in cartItem[items]){
         if(cartItem[items][item] > 0){
           
           let itemInfo = structuredClone(products.find((product)=>product._id === items));
           if(itemInfo){
             itemInfo.size=item,
             itemInfo.Quantity=cartItem[items][item]
             orderItem.push(itemInfo);
           }
         }
       }
     }
     
     switch (method) {
      case 'cod':
         const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/order/codorder`,{items:orderItem,amount,address},{headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }});
        if(res.data.success){
          toast.success(res.data.message);
          navigate('/myorder')
          setCartitem({})
        }else{
          toast.error(res.data.message);
        }
        break;
      
      case 'stripe':
           const resdata = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/order/stripeorder`,{items:orderItem,amount,address},{headers:{
          Authorization:`Bearer ${localStorage.getItem('token' || localStorage.getItem('token'))}`
        }});
        if(resdata.data.success){
           const {session}=resdata.data;
           window.location.replace(session.url);          
           setCartitem({})
           toast.success(resdata.data.message)
        }else{
          toast.error(resdata.data.message);
        }
        break;

        case 'razorpay':
           const razorpaydata = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/order/razerorder`,{items:orderItem,amount,address},{headers:{
          Authorization:`Bearer ${localStorage.getItem('token' || localStorage.getItem('token'))}`
        }});
        if(razorpaydata.data.success){
              initpay(razorpaydata.data.order);                  
        }else{
          toast.error(resdata.data.message);
        }
        break;
     
      default:
        break;
     }

     } catch (error) {
       toast.error(error.message);
     }


    setFirstName('');
    setLastname('');
    setEmail('');
    setStreet('');
    setCity('');
    setState('');
    setZipcode('');
    setCountry('');
    setPhone('');
   
  }

  const initpay=(order)=>{
      const options={
        key:import.meta.env.RAZORPAY_ID_KEY,
        amount:order.amount,
        currency:order.currency,
        name:'Order Payment',
        description:"Order Payment",
        order_id:order.id,
        receipt:order.receipt,
        handler:async(response)=>{
            //console.log(response);  
            try {
               const {data}=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/order/verifyrazorpay`,response,{headers:{
                Authorization:`Bearer ${localStorage.target('token')}`
               }})
               if(data.success){
                 navigate('/myorder');
                 setCartitem({})
               }
            } catch (error) {
              toast.error(error.message)
            }         
        }
      }
      const rzp=new window.Razorpay(options)
      rzp.open();
      
  }

  useEffect(()=>{
     let totalAmount =getTotalcount() === 0 ? 0:getTotalcount()+deliveryfee;
     setAmount(totalAmount);
  },[getTotalcount])
  
  return (
    <div className='xl:w-[90%] xl:m-auto 2xl:w-[80%]'>
       
       <div className='px-3 md:px-5'>
          <form onSubmit={handleSubmit} action="#">

             <div className='flex flex-col xl:flex-row xl:gap-52'>
            
             <div className='xl:w-1/2'>
               <h2 className='uppercase font-medium text-lg pt-2 pb-2 md:text-2xl md:py-5 lg:text-4xl lg:py-7 xl:text-2xl'><span className='text-gray-400'>delivery</span> <span>information___</span></h2>
                <div className='flex gap-3 mb-3 md:mb-5 lg:mb-6 xl:mb-3'>
                   <input className='border border-gray-500 text-sm w-1/2 py-2 px-1 rounded md:py-4 md:text-xl md:px-3 lg:text-2xl lg:py-5 xl:px-3 xl:text-base xl:h-[47px]' type="text" value={firstname} onChange={(e)=>setFirstName(e.target.value)} placeholder='First name' required/>
                   <input className='border border-gray-500 text-sm w-1/2 py-2 px-1 rounded md:py-4 md:text-xl md:px-3 lg:text-2xl lg:py-5 xl:px-3 xl:text-base xl:h-[47px]' type="text" value={lastname} onChange={(e)=>setLastname(e.target.value)} placeholder='Last name' required/>
                </div>
                 
                 <input className='border border-gray-500 text-sm w-full py-2 px-1 rounded mb-3 md:py-4 md:text-xl md:px-3 md:mb-5 lg:text-2xl lg:py-5 xl:px-3 xl:text-base xl:h-[47px] xl:mb-3' type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email address' required />

                 <input className='border border-gray-500 text-sm w-full py-2 px-1 rounded md:py-4 md:text-xl md:px-3 md:mb-1 lg:text-2xl lg:py-5 xl:px-3 xl:text-base xl:h-[47px] ' type="text" value={street} onChange={(e)=>setStreet(e.target.value)} placeholder='Street' required />

                 <div className='flex gap-3 mt-3 md:mb-5 xl:mt-2'>
                   <input className='border border-gray-500 text-sm w-1/2 py-2 px-1 rounded md:py-4 md:text-xl md:px-3 lg:text-2xl lg:py-5 xl:px-3 xl:text-base xl:h-[47px]' type="text" value={city} onChange={(e)=>setCity(e.target.value)} placeholder='City' required/>
                   <input className='border border-gray-500 text-sm w-1/2 py-2 px-1 rounded md:py-4 md:text-xl md:px-3 lg:text-2xl lg:py-5 xl:px-3 xl:text-base xl:h-[47px]' type="text" value={state} onChange={(e)=>setState(e.target.value)} placeholder='State' required/>
                 </div>

                 <div className='flex gap-3 mt-3 md:mt-1 xl:mt-2'>
                   <input className='border border-gray-500 text-sm w-1/2 py-2 px-1 rounded md:py-4 md:text-xl md:px-3 lg:text-2xl lg:py-5 xl:px-3 xl:text-base xl:h-[47px]' type="number" value={zipcode} onChange={(e)=>setZipcode(e.target.value)} placeholder='Zip code' required/>
                   <input className='border border-gray-500 text-sm w-1/2 py-2 px-1 rounded md:py-4 md:text-xl md:px-3 lg:text-2xl lg:py-5 xl:px-3 xl:text-base xl:h-[47px]' type="text" value={country} onChange={(e)=>setCountry(e.target.value)} placeholder='Country' required/>
                 </div>

                 <input className='border border-gray-500 text-sm w-full py-2 px-1 rounded mt-3 md:py-4 md:text-xl md:px-3 lg:text-2xl lg:py-5 xl:px-3 xl:text-base xl:h-[47px] xl:mt-2' type="number" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder='Phone' required/>
             </div>

             <div className='xl:w-1/2'>
               <h1 className='uppercase font-medium text-lg pt-5 md:text-2xl md:pt-7 lg:text-4xl lg:pb-3 xl:text-2xl'><span className='text-gray-400'>cart</span> <span>totals____</span></h1>
                <div>
                   <div className='flex items-center justify-between py-1'>
                     <p className='capitalize text-sm text-gray-600 md:text-xl lg:text-3xl xl:text-lg'>subtotal</p>
                     <p className='text-sm text-gray-600 md:text-xl lg:text-3xl xl:text-lg'>{currency}{getTotalcount()}.00</p>
                   </div>

                   <div className='flex items-center justify-between py-1'>
                     <p className='capitalize text-sm text-gray-600 md:text-xl lg:text-3xl xl:text-lg'>shipping free</p>
                     <p className='text-sm text-gray-600 md:text-xl lg:text-3xl xl:text-lg'>{currency}{deliveryfee}.00</p>
                   </div>

                   <div className='flex items-center justify-between py-1'>
                     <p className='capitalize text-sm font-medium md:text-xl lg:text-3xl xl:text-xl'>Total</p>
                     <p className='text-sm md:text-xl lg:text-3xl xl:text-xl'>{currency}{amount}.00</p>
                   </div>
                </div>

                <h2 className='uppercase text-base font-medium pt-2 md:text-2xl md:pt-7 lg:text-3xl xl:text-xl xl:pt-20'><span className='text-gray-600'>payment</span> <span>method___</span></h2>
                 <div className='mt-2 flex gap-3 md:mt-5'>

                     {payment.map((pay,idx)=>(
                       <div key={idx} className='flex gap-2 items-center border border-gray-400 py-1 px-2 md:py-2 xl:h-12 xl:flex xl:items-center xl:justify-center'>
                       <input onClick={(e)=>setMethod(pay)} className='md:w-10 md:h-6 xl:h-3.5 xl:w-8'  type="radio" name="payment" required />
                        <p className='font-medium  text-blue-700  text-sm md:text-xl lg:text-2xl xl:text-base'>{pay}</p>
                     </div>
                     ))}
                    
                 </div>
             </div>

             </div>

              <div className='w-full flex items-center justify-end md:mt-3 xl:-mt-10'>
             <button className='text-white bg-black py-2 px-5 mt-4 uppercase cursor-pointer text-sm md:text-2xl md:py-3 md:px-8 lg:text-2xl lg:py-4 lg:px-10 xl:mt-0 xl:text-xs xl:pt-2 xl:h-8 xl:px-8' type="submit">place order</button>
              </div>

          </form>
       </div>


    </div>
  )
}

export default DeliveryPaymentpage
