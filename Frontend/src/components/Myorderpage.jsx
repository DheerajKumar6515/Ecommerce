import React, { useContext, useEffect, useState } from 'react'
import Footer from '../components/Footer'
import { Shopcontext } from '../context/shopcontext'
import { toast } from 'react-toastify';
import axios from 'axios';

function Myorderpage() {
  const { products, currency } = useContext(Shopcontext);
  const [ordereditem, Setordereditem] = useState([])

  const orderdata = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/order/allorder`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (res.data.success) {
        let allordersItem = [];
        res.data.userorder.map((order) =>
          order.items.map((item) => {
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            allordersItem.push(item)

          })
        )
        Setordereditem(allordersItem)
      }
    } catch (error) {
      toast.error(error.message);
    }

  }
 
  
  useEffect(() => {
    // let orderData = [];
    // for (const items in cartItem) {
    //   for (const item in cartItem[items]) {
    //     if (cartItem[items][item] > 0) {
    //       orderData.push({
    //         _id: items,
    //         size: item,
    //         Quantity: cartItem[items][item]
    //       })
    //     }
    //   }
    // }

    //Setordereditem(orderData);
    //console.log(orderData);

    orderdata();

  }, [])

  return (
    <div className='flex flex-col justify-between h-screen px-2 md:px-4  xl:w-[90%] xl:m-auto 2xl:w-[80%]'>

      <div>
        <h1 className='uppercase font-medium py-3 border-b border-gray-300 md:text-3xl md:py-6 lg:py-8 xl:pt-10 xl:pb-3 xl:text-2xl'><span className='text-gray-500'>my</span> <span>orders___</span></h1>

        {ordereditem.map((item, id) =>

          <div key={id} className='flex items-center justify-between py-2 border-b border-gray-300 md:py-3 lg:py-4 xl:py-1.5'>

            <div className='flex gap-[7px] md:gap-4'>

              <div className='w-16 h-16 overflow-hidden md:w-32 md:h-32 xl:w-16 xl:h-16'>
                <img className='w-full h-full object-fill' src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${item.image[0]}`} alt="" />
              </div>

              <div>
                <p className='w-[7rem] text-xs capitalize md:text-xl md:w-64 lg:text-2xl xl:text-[15px]'>{item.name}</p>
                <div className='flex flex-col items-start xl:gap-1 pt-1 xl:pt-1.5'>
                  <div className='md:flex gap-3'>
                    <p className='text-xs text-gray-600 md:text-xl lg:text-2xl xl:text-[15px]'>{currency}{item.price}</p>
                    
                    <p className='text-xs text-gray-600 md:text-xl lg:text-2xl xl:text-sm'>Size: {item.size}</p>

                    <p className='text-xs text-gray-600 md:text-xl lg:text-2xl xl:text-sm'>Quantity: {item.Quantity}</p>


                  </div>

                  <p className='text-xs text-gray-600 md:text-xl lg:text-2xl xl:text-xs'>
                    <span className='text-black'>Date: </span>
                    {new Date(item.createdAt).toLocaleDateString('en-GB', {
                      timeZone: 'Asia/Kolkata',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>

                  <p className='text-xs text-gray-600 md:text-xl lg:text-2xl xl:text-sm'>Payment: {item.paymentMethod}</p>


                </div>
              </div>
            </div>


            <div className='flex items-center gap-2 '>
              <p className='bg-green-500 w-2 h-2 md:w-3 md:h-3 rounded-full lg:w-3 lg:h-3 xl:w-2 xl:h-2'></p>
              <p className='capitalize text-xs md:text-lg lg:text-xl  xl:text-xs'>{item.status}</p>

            </div>

            <div onClick={()=>{window.location.reload()}}  className='border px-1 py-1 border-gray-400 md:px-2 md:py-1'>
              <p className='text-xs text-center capitalize cursor-pointer text-gray-700 md:text-xl lg:text-2xl xl:text-xs'>track order</p>
            </div>

          </div>

        )}


      </div>

      {/* footer section */}
      <Footer />


    </div>
  )
}

export default Myorderpage
