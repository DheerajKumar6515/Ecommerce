import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

function Add({token}) {
  const [name,setName]=useState('');
  const [description,setDescription]=useState('');
  const [category,setCategory]=useState('men');
  const [subcategory,setSubcategory]=useState('topwear');
  const [price,setPrice]=useState('');
  const [sizes,setSizes]=useState([]);
  const [bestseller,setBestseller]=useState(false)
  const [image1,setImage1]=useState(false)
  const [image2,setImage2]=useState(false)
  const [image3,setImage3]=useState(false)
  const [image4,setImage4]=useState(false)

  
  const handleSubmit =async(e)=>{
     e.preventDefault();
      try {
         
        const formdata = new FormData();
        formdata.append('name',name)
        formdata.append('description',description)
        formdata.append('category',category)
        formdata.append('subcategory',subcategory)
        formdata.append('price',price)
        formdata.append('sizes',sizes)
        formdata.append('bestseller',bestseller)
        formdata.append('image1',image1)
        formdata.append('image2',image2)
        formdata.append('image3',image3)
        formdata.append('image4',image4)

         const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/products/addproduct`,formdata,{headers:{Authorization:`Bearer ${localStorage.getItem('admintoken')}`}})

          if(res.data.success){
             toast.success(res.data.message);
             setName('')
             setDescription('')
             setCategory('men')
             setSubcategory('topwear')
             setPrice('')
             setSizes('')
             setBestseller(false)
             setImage1(false)
             setImage2(false)
             setImage3(false)
             setImage4(false)

          }else{
            toast.error(res.data.message)
          }
      } catch (error) {
        toast.error(error.message);
      }
     
  }

  return (
    <div className='p-3 w-full '>
    <form onSubmit={handleSubmit} action="#">

      <div>
        <p className='font-medium'>Upload Image</p>

        <div className='flex gap-2 items-center pt-2.5'>

           <label htmlFor="image1" className='w-[7rem] h-[7rem] cursor-pointer'>
            <img className='w-full h-full object-cover' src={`${!image1 ? './src/assets/uploadImg.png': URL.createObjectURL(image1)}`} alt="" />
            <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id='image1' hidden required/>
           </label>

           <label htmlFor="image2" className='w-[7rem] h-[7rem] cursor-pointer'>
            <img className='w-full h-full object-cover' src={`${!image2 ? './src/assets/uploadImg.png': URL.createObjectURL(image2)}`} alt="" />
            <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id='image2' hidden required/>
           </label>

           <label htmlFor="image3" className='w-[7rem] h-[7rem] cursor-pointer'>
            <img className='w-full h-full object-cover' src={`${!image3 ? './src/assets/uploadImg.png': URL.createObjectURL(image3)}`} alt="" />
            <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id='image3' hidden required/>
           </label>

           <label htmlFor="image4" className='w-[7rem] h-[7rem] cursor-pointer'>
            <img className='w-full h-full object-cover' src={`${!image4 ? './src/assets/uploadImg.png': URL.createObjectURL(image4)}`} alt="" />
            <input onChange={(e)=>setImage4(e.target.files[0])} type="file" id='image4' hidden required/>
           </label>

        </div>
      </div>

      <div className='flex flex-col mt-1 mb-2'>
         <p htmlFor="" className='capitalize mb-1 text-sm font-medium'>product name</p>
         <input onChange={(e)=>setName(e.target.value)} value={name} className='w-80 h-9 border rounded outline-0 border-gray-500 px-1 text-sm py-1 ' type="text" placeholder='Type here' required/>
      </div>

      <div className='flex flex-col mt-1 mb-2'>
         <p htmlFor="" className='capitalize mb-1 text-sm font-medium'>product description</p>
         <textarea onChange={(e)=>setDescription(e.target.value)} value={description}  className='w-80 h-20 border rounded outline-0 border-gray-500 px-1 text-sm py-1 ' type="text" placeholder='write content here...' required/>
      </div>

      <div className='flex flex-col mt-1 mb-2'>
        <p className='capitalize mb-1 text-sm font-medium'>product category</p>
        <select onChange={(e)=>setCategory(e.target.value)} value={category}  className='w-80 h-9 border text-sm outline-0 py-1 rounded border-gray-500' required>
          <option className='text-xs' value="men">Men</option>
          <option className='text-xs' value="women">Women</option>
          <option className='text-xs' value="kids">Kids</option>
        </select>
      </div>

        <div className='flex flex-col mt-1 mb-2'>
        <p className='capitalize mb-1 text-sm font-medium'>sub category</p>
        <select onChange={(e)=>setSubcategory(e.target.value)} value={subcategory} className='w-80 h-9 border text-sm py-1 outline-0 rounded border-gray-500' required>
          <option className='text-xs' value="topwear">Topwear</option>
          <option className='text-xs' value="bottomwear">BottomWear</option>
          <option className='text-xs' value="winterwear">Winterwear</option>
        </select>
      </div>

       <div className='flex flex-col mt-1 mb-2'>
         <p htmlFor="" className='capitalize mb-1 text-sm font-medium'>product price</p>
         <input onChange={(e)=>setPrice(e.target.value)} value={price} className='w-80 h-9 border rounded outline-0 border-gray-500 px-1 text-sm py-1 ' type="number" placeholder='00' required/>
      </div>

      <div>
         <p htmlFor="" className='capitalize mb-1 text-sm font-medium'>product sizes</p>
         <div className='flex gap-3'>
           <div onClick={()=>setSizes(prev=>prev.includes("S") ? prev.filter(item => item !== "S" ) : ["S",...prev])} className={`${sizes.includes("S")? 'bg-pink-100':'bg-slate-200 '} cursor-pointer text-sm px-3 py-1 border border-gray-500`}>S</div>
           <div onClick={()=>setSizes(prev=>prev.includes("M") ? prev.filter(item => item !== "M" ) : ["M",...prev])} className={`${sizes.includes("M")? 'bg-pink-100':'bg-slate-200 '} cursor-pointer text-sm px-3 py-1 border border-gray-500`}>M</div>
           <div onClick={()=>setSizes(prev=>prev.includes("L") ? prev.filter(item => item !== "L" ) : ["L",...prev])} className={`${sizes.includes("L")? 'bg-pink-100':'bg-slate-200 '} cursor-pointer text-sm px-3 py-1 border border-gray-500`}>L</div>
           <div onClick={()=>setSizes(prev=>prev.includes("XL") ? prev.filter(item => item !== "XL" ) : ["XL",...prev])} className={`${sizes.includes("XL")? 'bg-pink-100':'bg-slate-200 '} cursor-pointer text-sm px-3 py-1 border border-gray-500`}>XL</div>
           <div onClick={()=>setSizes(prev=>prev.includes("XXL") ? prev.filter(item => item !== "XXL" ) : ["XXL",...prev])} className={`${sizes.includes("XXL")? 'bg-pink-100':'bg-slate-200 '} cursor-pointer text-sm px-3 py-1 border border-gray-500`}>XXL</div>
         </div>

      </div>

      <div className='flex gap-2 mt-3'>
        <input onChange={()=>setBestseller(prev=>!prev)} value={bestseller} checked={bestseller} className='cursor-pointer w-4' type="checkbox" id='bestseller' />
        <label className='capitalize ' htmlFor="bestseller">Add to bestseller</label>
      </div>

      <button className='bg-black text-white w-32 mt-4 py-1 uppercase font-medium rounded-lg hover:bg-black/70' type='submit'>Add</button>

    </form>
    </div>
  )
}

export default Add
