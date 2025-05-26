import React from 'react'
import Footer from '../components/Footer'

function Contact() {

  const handlesubscribes=()=>{}

  return (
    <div className='px-3 md:px-8 xl:px-3 xl:w-[90%] xl:m-auto'>

       <h3 className='uppercase text-center py-4 md:py-8 md:text-3xl xl:text-xl'><span className='text-gray-500'>contact</span> <span className='font-medium'>us___</span></h3>

       <div className='flex flex-col md:flex-row md:items-center items-start justify-center xl:m-auto'>

         <div className='w-full h-82 md:w-[21rem] overflow-hidden rounded-xs lg:w-96 lg:h-96 xl:w-[26rem] xl:h-96'>
           <img className='w-full' src="./src/assets/tshirt.jpg" alt="" />
         </div>

         <div className='py-5 md:px-8 xl:px-[31px] 2xl:px-12'>

          <div>
             <h3 className='uppercase font-medium pb-3 md:text-lg lg:text-2xl xl:text-lg'>our store</h3>
             <p className='text-sm leading-5.5 text-gray-600 md:text-lg md:pb-1 md:tracking-wide lg:text-xl xl:text-sm'>54709 willms station</p>
             <p className='text-sm leading-5.5 text-gray-600 pb-3 md:text-lg md:tracking-wide lg:text-xl xl:text-sm'>suite 350, washington, USA</p>

              <p className='text-sm leading-5.5 text-gray-600 md:text-lg md:pb-1 md:tracking-wide lg:text-xl xl:text-sm'>Tel:(415)555-0132</p>
              <p className='text-sm leading-5.5 text-gray-600 pb-3 md:text-lg md:tracking-wide md:pb-5 lg:text-xl xl:text-sm'>Email:kumardev@gmail.com</p>
          </div>

          <div>
            <h3 className='uppercase font-medium pb-2 md:text-lg lg:text-2xl xl:text-lg'>careers at shopnest</h3>
            <p className='text-sm  text-gray-600 pb-4 md:text-lg lg:text-xl xl:text-sm'>Learn more about our teams and job opening</p>

            <button className='border text-xs capitalize py-2 px-3 cursor-pointer md:text-sm md:py-3 md:px-4 md:tracking-wide lg:text-lg xl:text-xs xl:py-2 xl:px-2.5 hover:bg-black hover:text-white transition duration-500'>explore jobs</button>
          </div>        

         </div>

       </div>
      

        {/* subscribe now section */}
       <div className='pt-10 pb-15 md:pt-53 md:pb-24 xl:pt-44 lg:pt-60 xl:w-[80%] xl:m-auto '>
            <h3 className={`text-center text-lg font-medium md:text-2xl lg:text-3xl xl:text-xl`}>Subscribe now & get 20% off</h3>
            <p className={`text-xs text-center py-1 px-10 font-sans md:text-base text-gray-500 lg:text-lg xl:py-1.5 xl:text-xs xl:tracking-wide `}>Lorem ipsum dolor sit amet consectetur adipisicing .</p>

            <form onSubmit={handlesubscribes} className={` flex flex-col gap-2 items-center justify-center `} action="#">
              <div className='m-auto flex flex-col xl:flex-row'>
                <input className={`mt-1 border border-gray-500 w-64 py-2 px-2 text-sm mx-auto rounded-sm outline-0 md:w-72 md:py-3 xl:h-[33px] xl:rounded-xs`} type="text" name="subscribe"  placeholder='Enter your email id' required/>
                <button className={`bg-black mt-2 mx-auto text-sm rounded py-2 px-8 text-white font-sans cursor-pointer md:text-lg xl:mt-1 xl:h-8 xl:text-sm xl:flex xl:items-center` }type="submit">Subscribe</button>
              </div>
                
            </form>
       </div>

       {/* footer section */}
       <Footer/>



    </div>
  )
}

export default Contact
