import React,{useContext, useEffect, useState} from 'react'
import Footer from '../components/Footer'
import { Link, useParams } from 'react-router-dom';
import { Shopcontext } from '../context/shopcontext';
//import Relatedproduct from '../components/Relatedproduct';

function Productpage() {
  
  const {id}  = useParams();
  const {products,currency,addToCart}=useContext(Shopcontext)
  const [selectedSize, setSelectedSize] = useState(null);
  const [description,Setdescription]=useState(true)
  const [review,Setreview]=useState(false)
  const [productData,SetproductData]=useState(null)
  const [image,Setimage]=useState([]);
  const [mainImage,setMainImage]=useState(null)
  const [related,SetRelated]=useState([])
 
  useEffect(() => {
    if (products.length > 0 && id) {
        products.find((item) => {
           if(String(item._id) === String(id)){
             SetproductData(item);
             Setimage(item.image)
             setMainImage(item.image[0])
           }
        }) 
    }
  }, [products, id]);

//console.log(mainImage);
          
    useEffect(()=>{
           let productcopy = products.slice();
         
           if(productcopy.length > 0 && productData?.category){
            
               productcopy = productcopy.filter((item)=>productData?.category === item.category);

               productcopy=productcopy.filter((item)=>productData?.subcategory === item.subcategory);
                     
               SetRelated(productcopy);
              }
                                          
    },[products,productData])
  

  return (
    <div className='px-2 md:px-4 lg:px-5 xl:w-[90%] xl:m-auto 2xl:w-[80%]'>

      {/* product section */}
       
          <div  className='flex  flex-col md:gap-4 xl:gap-0 items-center md:flex-row md:h-[29rem] xl:pt-4'>
          
          <div className=' w-full flex gap-1.5 md:h-full pt-2 xl:w-1/2'>
            {/* mutiple images div */}
            <div className='w-20 h-80 overflow-hidden flex flex-col gap-1 md:h-full md:w-36'>

              {Array.isArray(image) && image.map((itemimage, idx)=>(             
                  <img onClick={()=>setMainImage(itemimage)} key={idx} className='w-full h-20 md:h-28 md:object-fill bg-center bg-cover' src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${itemimage}`} alt="" />                  
              ))}

            </div>
  
            {/* main image div */}
            <div className='w-full h-80 md:h-full 2xl:pr-18'>
              <img className='w-full h-full overflow-hidden bg-cover' src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${mainImage}`} alt="" />
            </div>
          </div>
  
          <div className=' w-full
           md:h-full md:w-[90%] pt-2 xl:w-1/2 xl:px-12 2xl:px-0 2xl:pr-20'>
            <h1 className='capitalize font-medium pt-2 md:text-2xl md:pt-0 lg:text-3xl xl:text-[21px] xl:pt-1.5'>{productData?.name}</h1>
            <p>
              <span className='text-orange-500 md:text-xl 2xl:text-sm'><i className="ri-star-fill"></i></span>
              <span className='text-orange-500 md:text-xl 2xl:text-sm'><i className="ri-star-fill"></i></span>
              <span className='text-orange-500 md:text-xl 2xl:text-sm'><i className="ri-star-fill"></i></span>
              <span className='text-orange-500 md:text-xl 2xl:text-sm'><i className="ri-star-fill"></i></span>
              <span className='text-orange-300 md:text-xl 2xl:text-sm'><i className="ri-star-fill"></i></span>
              <span className='text-xs md:text-lg 2xl:text-sm'> (122)</span>
              </p>
            <h2 className='font-medium pt-2 md:text-2xl md:pt-1 lg:text-3xl xl:pt-2 xl:text-xl'>{currency}{productData?.price}</h2>
  
            <p className='text-xs text-gray-600 pt-2 md:text-lg md:tracking-wide lg:text-lg xl:text-sm xl:pt-5'>{productData?.description}</p>
  
            <div>
              <h3 className='capitalize pt-4 text-sm text-gray-600 font-medium md:text-xl md:pt-2 xl:text-base xl:pt-5'>select size</h3>
              <div className='flex gap-2 pt-3'>
                
              {productData?.sizes.map((size) => (
              <p 
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-3 py-1 cursor-pointer text-sm md:text-xl xl:text-base 2xl:text-sm ${
                selectedSize === size ? 'border border-orange-400' : 'border border-gray-400'
              }`}
              >
              {size}
            </p>
          ))}
                
              </div>
            </div>
  
            <button onClick={()=>addToCart(productData?._id,selectedSize)} className='uppercase cursor-pointer text-xs bg-black text-white mt-6 px-4 py-2 md:text-lg md:mt-5 lg:text-xl lg:py-3 xl:text-xs'>Addtocart</button>
  
            {/* a straight line */}
            <div className='w-full h-[1px] bg-gray-300 mt-5 md:mt-1 xl:mt-[26px]'></div>
  
            <div className='py-3'>
              <p className='text-xs text-gray-600 xl:pb-1'>100% Original product.</p>
              <p className='text-xs text-gray-600 xl:pb-1'>Cash on delivery is available on this product.</p>
              <p className='text-xs text-gray-600'>Easy return and exchange policy within 7 ddays.</p>
            </div>
  
          </div>
  
        </div>
      
      {/* description section */}
      <div >

        <div className='flex mt-5 md:mt-10 xl:mt-24'>
          <button onClick={()=>{
            Setdescription(true)
            Setreview(false)
          }
            } className='border cursor-pointer border-gray-400 capitalize text-xs px-1 py-1 font-medium md:text-lg xl:text-sm'>description</button>
          <button onClick={()=>{Setreview(true)
            Setdescription(false)
          }} className='border cursor-pointer border-gray-400 capitalize text-xs px-1 py-1 font-medium md:text-lg xl:text-sm'>reviews(122)</button>
        </div>

        <div className={`border w-full h-52 ${review ? 'overflow-scroll':''} overflow-hidden border-gray-400 text-xs px-1 py-2 xl:h-32`}>

          <div className={`${description ? 'block':'hidden'} xl:px-[29px]`}>
          <p className='text-gray-600 md:text-base md:tracking-wide md:leading-6 lg:text-lg lg:leading-7 xl:text-sm xl:leading-5'>An e-commerce website is an online plateform that facilites the buying and selling of products or services over the internet. it serves as a virtual marketplace where businessess and individuals can showcase their products,interact with customers, and conduct transaction without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>

          <p className='pt-3 text-gray-600 md:text-base md:tracking-wide md:leading-6 md:pt-2 lg:text-lg lg:leading-7 xl:text-sm xl:leading-5'>E-commerce websites typically display products or services along with detailed description, images, prices, and any available variations (e.g..sizes,colors). Each product usuallyhas its owwn dedicated page with relevant information.</p>
          </div>
           
           <div className={`${review ? 'block':'hidden'} `}>
              {/* multiple review  */}
             <div className='mb-2 border-b border-gray-500 py-1'>
               <p className='font-medium md:text-xl'>Juli</p>
               <p className='text-xs text-gray-600 md:text-base md:tracking-wide'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate et.</p>
             </div>

             <div className='mb-2 border-b border-gray-500 py-1'>
               <p className='font-medium md:text-xl'>Juli</p>
               <p className='text-xs text-gray-600 md:text-base md:tracking-wide'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate et.</p>
             </div>

             <div className='mb- border-b border-gray-500 py-1'>
               <p className='font-medium md:text-xl'>Juli</p>
               <p className='text-xs text-gray-600 md:text-base md:tracking-wide'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate et.</p>
             </div>

             <div className='mb-2 border-b border-gray-500 py-1'>
               <p className='font-medium md:text-xl'>Juli</p>
               <p className='text-xs text-gray-600 md:text-base md:tracking-wide'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate et.</p>
             </div>

             <div className='mb-2 border-b border-gray-500 py-1'>
               <p className='font-medium md:text-xl'>Juli</p>
               <p className='text-xs text-gray-600 md:text-base md:tracking-wide'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate et.</p>
             </div>

           </div>

        </div>

      </div>

      {/* related products */}
      <div className='pb-18'>
        <h1 className='text-xl md:text-3xl md:pb-5 uppercase text-center pt-10 pb-3 lg:text-4xl xl:text-2xl xl:pt-24'> <span className='text-gray-500'>related</span> <span className='font-medium'>products___</span></h1> 

        <div className='grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-3 xl:w-[85%] xl:m-auto'>
         
         {related.slice(0,5).map((item,id)=>(
          <Link to={`/product/${item._id}`} key={id}>
             <div  className='card px-1 h-64 xl:h-56 border border-gray-300 rounded-xs md:h-80 overflow-hidden'>
             <div className=' h-48 md:h-64 xl:h-44 overflow-hidden'>
               <img className='w-full h-full object-cover xl:h-full xl:object-fill ' src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${item.image[0]}`} alt="" />
             </div>
             <p className='text-xs py-1 md:text-base md:px-1 xl:text-xs xl:px-1'>{item.name}</p>
             <p className='text-xs font-medium md:text-base md:px-1 xl:text-[13px]'>{currency}{item.price}</p>
           </div></Link>
   
         ))}
        
        </div>

      </div>
    
        {/* footer section */}
        <Footer/>


    </div>
  )
}

export default Productpage
