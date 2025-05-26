import React from 'react'
import Footer from '../components/Footer'

function About() {

  const handlesubscribe=()=>{}
  return (
    <div className='px-3 md:px-8 xl:px-3 xl:w-[90%] xl:m-auto '>

       <h3 className='uppercase text-center py-4 md:py-8 md:text-3xl xl:text-xl'><span className='text-gray-500'>about</span> <span className='font-medium'>us___</span></h3>

       <div className='flex flex-col md:flex-row items-center justify-center 2xl:m-auto'>

         <div className='w-full h-82 md:w-[65rem] overflow-hidden rounded-xs xl:w-[90rem] xl:h-96 2xl:w-[32rem]'>
           <img className='w-full' src="./src/assets/tshirt.jpg" alt="" />
         </div>

         <div className='py-5 md:px-8 xl:px-16 2xl:w-[40rem] 2xl:px-16 '>

           <p className='text-xs tracking-wide text-gray-600 pb-3 md:text-sm md:leading-5 lg:text-base xl:text-sm xl:leading-5 xl:pb-4 2xl:leading-6 2xl:text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id quisquam vitae reiciendis accusantium nulla aperiam dolor rerum! Dolorum, labore ratione Lorem ipsum dolor sit amet reiciendis accusantium nulla Lorem ipsum dolor sit amet consectetur adipisicing elit. Id quisquam vitae reiciendis accusantium nulla..</p>

           <p className='text-xs tracking-wide text-gray-600 pb- md:text-sm md:leading-5 lg:text-base xl:text-sm xl:leading-5 xl:pb-4 2xl:text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id quisquam vitae reiciendis accusantium nulla aperiam dolor rerum! Dolorum, labore ratione Lorem ipsum dolor sit amet reiciendis accusantium nulla Lorem ipsum dolor sit amet consectetur adipisicing elit. Id quisquam vitae reiciendis accusantium nulla.</p>

           <p className='text-sm capitalize text-gray-600 font-medium md:text-lg lg:text-xl py-1 xl:text-sm xl:pb-4'>our mission</p>

           <p className='text-xs tracking-wide text-gray-600 pb-3 md:text-sm md:leading-5 lg:text-base xl:text-sm xl:leading-5 xl:pb-4 2xl:text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id quisquam vitae reiciendis accusantium nulla aperiam dolor rerum! Dolorum, labore ratione.</p>

         </div>

       </div>
 
        {/* why choose us section */}
       <div className='2xl:w-[85%] 2xl:m-auto 2xl:pt-8'>
         <h3 className='uppercase pb-5 md:pt-10 md:text-2xl md:pb-8 xl:text-lg'><span className='text-gray-500 '>why</span> <span className='font-medium'>choose us____</span></h3>

         <div className='grid grid-cols-1 md:grid-cols-3'>
            
            <div className='border-2 border-gray-300 text-center py-10 xl:h-48 xl:flex xl:flex-col xl:items-center xl:justify-center'>
               <h4 className='uppercase text-xs font-medium pb-2 md:text-base lg:text-lg xl:text-sm'>quality assurance :</h4>
               <p className='text-xs font-light text-gray-600 px-16 md:text-sm md:px-8 md:tracking-wide lg:text-base xl:text-[11px] xl:px-[82px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, esse.</p>
            </div>

            <div className='border-2 border-gray-300 text-center py-10 xl:h-48 xl:flex xl:flex-col xl:items-center xl:justify-center'>
               <h4 className='uppercase text-xs font-medium pb-2 md:text-base lg:text-lg xl:text-sm'>convenience :</h4>
               <p className='text-xs font-light text-gray-600 px-16 md:text-sm md:px-8 md:tracking-wide lg:text-base xl:text-[11px] xl:px-[82px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, esse.</p>
            </div>

            <div className='border-2 border-gray-300 text-center py-10 xl:h-48 xl:flex xl:flex-col xl:items-center xl:justify-center'>
               <h4 className='uppercase text-xs font-medium pb-2 md:text-base lg:text-lg xl:text-sm'>exception customer service :</h4>
               <p className='text-xs font-light text-gray-600 px-16 md:text-sm md:px-8 md:tracking-wide lg:text-base xl:text-[11px] xl:px-[82px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, esse.</p>
            </div>

         </div>

       </div>

        {/* subscribe now section */}
       <div className='pt-10 pb-15 md:pt-16 md:pb-24 xl:pt-20 xl:w-[80%] xl:m-auto '>
            <h3 className={`text-center text-lg font-medium md:text-2xl xl:text-xl`}>Subscribe now & get 20% off</h3>
            <p className={`text-xs text-center py-1 px-10 font-sans md:text-base text-gray-500 xl:py-1.5 xl:text-xs xl:tracking-wide `}>Lorem ipsum dolor sit amet consectetur adipisicing .</p>

            <form onSubmit={handlesubscribe} className={` flex flex-col gap-2 items-center justify-center `} action="#">
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

export default About
