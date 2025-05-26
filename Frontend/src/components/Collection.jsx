import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import { useContext } from 'react'
import { Shopcontext } from '../context/shopcontext'
import { Link } from 'react-router-dom'

function Collection() {
   const {products,currency,search,showsearch}=useContext(Shopcontext)
   const [pricevalue,setpricevalue]=useState('')
   const [visiable,Setvisiable]=useState(false)
   const [allProduct,SetallProduct]=useState([])
   const [category,SetCategory]=useState([])
   const [Subcategory,SetSubcategory]=useState([])

   const togglecategory=(e)=>{
      
      if(category.includes(e.target.value)){
         SetCategory(prev=>prev.filter(item=> item !== e.target.value))
      }else{
        SetCategory(prev=>[...prev,e.target.value])
      }
   }

   const togglesubcategory=(e)=>{
      
    if(Subcategory.includes(e.target.value)){
       SetSubcategory(prev=> prev.filter(items=> items !== e.target.value))
    }else{
      SetSubcategory(prev => [...prev,e.target.value])
    }
 }

 const applyFilter=()=>{
    let productCopy = [...products];

     if(showsearch && search){
       productCopy=productCopy.filter(item=> item.name.includes(search))
     }
     
    if(category.length > 0){     
      productCopy = productCopy.filter(item => category.includes(item.category))

    }

    if(Subcategory.length > 0){
      productCopy=productCopy.filter(item => Subcategory.includes(item.subcategory))
    }

    SetallProduct(productCopy)
 }
 
 const Sortproducts=()=>{
    const fpcopyProduct = allProduct.slice();

     switch (pricevalue) {
      case 'Low To High':
         SetallProduct(fpcopyProduct.sort((a,b)=>(a.price - b.price)))
        break;
      
        case 'High To Low':
        SetallProduct(fpcopyProduct.sort((a,b)=>(b.price - a.price)))
        break;

        default:
          applyFilter();
          break;
     }
 }

 useEffect(()=>{  
    applyFilter();
 },[category,Subcategory,search,showsearch,products])

 useEffect(()=>{
  Sortproducts();
 },[pricevalue])

  return (
    <div className='main px-3 xl:px-0 xl:w-[87%] xl:m-auto'>

      <div className='xl:flex xl:gap-8'>

         <div className='w-48 xl:w-[15rem]'>

            <div>
          <h3 onClick={()=>Setvisiable(prev=>!prev)} className='uppercase py-3 cursor-pointer font-medium font-sans xl:text-xl xl:pt-16 xl:tracking-wide'>filters</h3>
          <div className={`${visiable ? 'block':'hidden'} px-2 border-2 mb-2 border-gray-300 xl:mt-4 xl:block xl:p-3.5`}>
            <p className='uppercase pb-2'>categories</p>
             <div className='flex gap-2.5 xl:pb-1'>
            <input onClick={togglecategory} className='xl:w-4 ' type="checkbox" value={"men"} /><span className='xl:capitalize xl:text-sm'>men</span>
             </div>
             <div className='flex gap-2.5 xl:pb-1'>
            <input onClick={togglecategory} className='xl:w-4 ' type="checkbox" value={"women"} /><span className='xl:capitalize xl:text-sm'>women</span>
             </div>
             <div className='flex gap-2.5 xl:pb-1'>
            <input onClick={togglecategory} className='xl:w-4 ' type="checkbox" value={"kids"} /><span className='xl:capitalize xl:text-sm'>kids</span>
             </div>
          </div>
            </div>

            <div className={`${visiable ? 'block':'hidden'} xl:block`}>
          <div className='border-2 px-2 border-gray-300  xl:mt-4 xl:p-3.5'>
            <p className='uppercase pb-2'>type</p>
             <div className='flex gap-2.5 xl:pb-1'>
            <input onClick={togglesubcategory} className='xl:w-4 ' type="checkbox" value={"topwear"} /><span className='xl:capitalize xl:text-sm'>topwear</span>
             </div>
             <div className='flex gap-2.5 xl:pb-1'>
            <input onClick={togglesubcategory} className='xl:w-4 ' type="checkbox" value={"bottomwear"} /><span className='xl:capitalize xl:text-sm'>bottomwear</span>
             </div>
             <div className='flex gap-2.5 xl:pb-1'>
            <input onClick={togglesubcategory} className='xl:w-4 ' type="checkbox" value={"winterwear"} /><span className='xl:capitalize xl:text-sm'>winterwear</span>
             </div>
          </div>
            </div>

         </div>

         <div className='pb-8 xl:w-full'>

        <div className='w-full flex items-center justify-between py-4 xl:py-0 xl:pt-6 xl:pb-2'>
          <div>
            <h1 className='uppercase text-base md:text-2xl md:py-3 lg:text-3xl xl:text-xl'><span className='text-gray-500'>all</span> <span className='font-medium'>collections</span> <span>____</span></h1>
          </div>

          <div className='flex items-center border border-gray-400 px-2 rounded '>
            <label className='lg:text-2xl xl:text-sm' htmlFor="cars">Sort by:</label>
            <select value={pricevalue} onChange={(e)=>{setpricevalue(e.target.value)}} className='text-sm py-1 outline-0 md:py-2  md:px-3 lg:text-lg xl:text-xs xl:py-2'>
              <option value={"relevent"}>Relevent</option>            
              <option value="Low To High">Low To High</option>
              <option value="High To Low">High To Low</option>
            </select>
          </div>

        </div>

        {/*All collection  product_card */}
        <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3'>
 
          {allProduct.map((items,id)=>(
          <Link to={`/product/${items._id}`} key={id}> 
             <div   className='card h-64 xl:h-56 border border-gray-300 rounded-xs md:h-80 overflow-hidden'>
              <div className=' h-50 md:h-64 xl:h-44 overflow-hidden'>
                <img className='w-full h-full object-cover'
                 src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${items.image[0]}`} alt="" />
              </div>
              <p className='text-xs px-1 py-1 md:text-base md:px-1 xl:text-xs xl:px-1'>{items.name}</p>
              <p className='text-xs px-1 font-medium md:text-base md:px-1 xl:text-[13px]'>{currency}{items.price}</p>
            </div> 
            </Link>
          ))}
          
          
        </div>

         </div>
      </div>

      <Footer/>

    </div>
  )
}

export default Collection
