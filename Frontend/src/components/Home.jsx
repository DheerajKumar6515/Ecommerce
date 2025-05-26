import React, { useContext, useEffect, useState } from 'react'
import Footer from '../components/Footer'
import { Shopcontext } from '../context/shopcontext'
import { Link } from 'react-router-dom';
function Home() {
  
   const {products,currency}=useContext(Shopcontext);
   const [Bestseller,SetBestseller]=useState([])
   
  const handlesubscribe=(e)=>{
       e.preventDefault();
  }
  return (
    <div className='w-full min-h-screen px-5 '>

      <div className='pt-10 mb-14 md:flex md:items-center md:pt-0 md:h-[26rem] border border-gray-300  xl:w-[85%] xl:h-96 xl:px-0 xl:m-auto'>
         <div className='px-3 md:w-1/2 md:px-10 xl:px-16'>
         <p className='uppercase text-xs md:text-lg xl:text-xs text-black/80'> <span className=''>_____</span> our bestsellers</p>
            <h1 className='capitalize font-serif text-4xl md:text-5xl text-black/78 py-2 xl:text-4xl'>latest arrivals</h1>
            <p className='uppercase text-xs pb-10 md:text-lg xl:text-xs'>shop now <span>_____</span></p> 
         </div>

         <div className='w-full h-64 md:w-1/2 md:h-full rounded-xs overflow-hidden'>
          <img className=' w-full bg-center object-cover' src="https://images.unsplash.com/photo-1707302342647-fe55db824d85?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
          </div>

      </div>

      {/*latest collection section */} 
       <div className='xl:w-[80%] xl:m-auto'>
          <h2 className='uppercase text-center text-lg font-sans md:text-2xl xl:pt-12'><span className='text-gray-500'>latest</span> <span className='font-medium'>collections</span>____ </h2>
          <p className='text-center text-xs text-gray-500 pt-2 pb-4 px-5 md:text-base'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae rerum .</p>

          {/*Latest collection  product_card */}
           <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3'>

            {products.slice(0,10).map((item,id)=>(
              <Link to={`/product/${item._id}`} key={id}>
                <div  className='card h-64 xl:h-56 border border-gray-300 rounded-xs md:h-80 overflow-hidden'>
                <div className=' h-48 md:h-64 xl:h-44 overflow-hidden'>
                  <img className='w-full h-full object-cover' src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${item.image[0]}`} alt="" />
                  </div>
                  <p className='text-xs px-1 py-1 md:text-base md:px-1 xl:text-xs xl:px-1'>{item.name}</p>
                  <p className='text-xs px-1 font-medium md:text-base md:px-1 xl:text-[13px]'>{currency}{item.price}</p>
              </div></Link>
            ))}


           </div>

       </div>

        {/*Best seller section */}
       <div className='xl:w-[80%] xl:m-auto'>
          <h2 className='uppercase pt-10 text-center text-lg font-sans md:text-2xl '><span className='text-gray-500'>Best</span> <span className='font-medium'>seller</span>____ </h2>
          <p className='text-center text-xs text-gray-500 pt-2 pb-4 px-5 md:text-base'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae rerum .</p>

          {/*Best seller product_card */}
           <div className='grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-3'>
               
               {products.filter(item=>item.bestseller).slice(0,5).map((item,id)=>(
                <Link to={`/product/${item.id}`} key={item._id}>
                   <div  className='card h-64 xl:h-56 border border-gray-300 rounded-xs md:h-80 overflow-hidden'>
                   <div className=' h-48 md:h-64 xl:h-44 overflow-hidden'>
                     <img className='w-full ' src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${item.image[0]}`} alt="" />
                     </div>
                     <p className='text-xs px-1 py-1 md:text-base md:px-1 xl:text-xs xl:px-1'>{item.name}</p>
                     <p className='text-xs px-1 font-medium md:text-base md:px-1 xl:text-[13px]'>{currency}{item.price}</p>
                 </div></Link>
               ))}


           </div>

       </div>

       {/*customer support section */}
       <div className='grid grid-cols-1 md:grid-cols-3 gap-3 pt-10 md:pt-20 xl:w-[78%] xl:m-auto'>

         <div className=' text-center py-5'>
           <p className='text-3xl xl:text-[26px]'><i className="ri-exchange-funds-line"></i></p>
           <p className='capitalize text-xs font-medium'>easy exchange policy</p>
           <p className='capitalize text-xs font-medium py-1 text-gray-500 '>we offer hassle free exchange policy</p>
         </div>

         <div className='text-center py-5'>
           <p className='text-3xl xl:text-[26px]'><i className="ri-checkbox-circle-line"></i></p>
           <p className='capitalize text-xs font-medium'>7 days policy</p>
           <p className='capitalize text-xs font-medium py-1 text-gray-500 '>we provide 7 days free return policy</p>
         </div>

         <div className='text-center py-5'>
           <p className='text-3xl xl:text-[26px]'><i className="ri-customer-service-line"></i></p>
           <p className='capitalize text-xs font-medium'>best customer support</p>
           <p className='capitalize text-xs font-medium py-1 text-gray-500 '>we provide 24/7 customer support</p>
         </div>

       </div>

       {/* subscribe now section */}
       <div className='pt-10 pb-15 md:pt-16 md:pb-24 xl:pt-20 xl:w-[80%] xl:m-auto'>
            <h3 className={`text-center text-lg font-medium md:text-2xl xl:text-xl`}>Subscribe now & get 20% off</h3>
            <p className={`text-xs text-center py-1 px-10 font-sans md:text-base text-gray-500 xl:py-1.5 xl:text-sm xl:tracking-wide`}>Lorem ipsum dolor sit amet consectetur adipisicing .</p>

            <form onSubmit={(e)=>handlesubscribe} className={`pt-3 flex flex-col gap-2 items-center justify-center `} action="#">
              <div className='m-auto flex flex-col xl:flex-row'>
                <input className={`border border-gray-500 w-64 py-2 px-2 text-sm mx-auto rounded-sm outline-0 md:w-72 md:py-3`} type="text" name="subscribe"  placeholder='Enter your email id' required/>
                <button className={`bg-black mt-2 mx-auto text-sm rounded py-2 px-8 text-white font-sans cursor-pointer md:text-lg 2xl:m-0` }type="submit">Subscribe</button>
              </div>
                
            </form>
       </div>

       {/* footer section */}
       <Footer/>

      
    </div>
  )
}

export default Home
