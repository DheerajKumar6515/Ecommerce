import { useEffect, useState } from 'react';
import { toast } from 'react-toastify'
import axios from 'axios'

function Orders({ token }) {
  const [orderData, setOrderdata] = useState([]);

  const getallorderdata = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/order/list`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (res.data.success) {
        setOrderdata(res.data.allorderdata.reverse());

      }
    } catch (error) {
      toast.error(error.message);
    }
  }

   const changestatus =async(orderId,status)=>{
      try {
         const res= await axios.post(`${import.meta.env.VITE_BASE_URL}/api/order/status`,{orderId,status},{headers:{
          Authorization:`Bearer ${token}`
         }})
         if(res.data.success){
            toast.success(res.data.message);
         }
      } catch (error) {
        toast.error(error.message)
      }
   }
   
  useEffect(() => {
    getallorderdata(); 
  }, [])
  return (
    <div className='px-3 py-2  xl:px-10 xl:py-5'>
      <h2 className='capitalize font-medium mb-2'>Order Page</h2>

      {orderData.map((order,id) => {      
       return(
         <div className = 'mb-2 xl:border xl:px-6 xl:py-3 border-gray-400 rounded xl:flex items-center justify-between' key={id} >

        <div className='border border-gray-400 mb-1 rounded-xs w-16 px-2 py-1'>
          <img className='w-12' src="./src/assets/boximg.jpg" alt="" />
        </div>

        <div>
          <p className='capitalize text-sm text-gray-700'>{order.items.map((item)=>(`${item.name} ${`x`} ${item.Quantity} ${item.size}`))} </p>
          <p className='capitalize text-sm text-gray-700'>{order.address.firstname} {order.address.lastname}</p>
          <p className='capitalize text-sm text-gray-700'>{order.address.street}</p>
          <p className='capitalize text-sm text-gray-700'>{order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</p>
          <p className='capitalize text-sm text-gray-700'>{order.address.phone}</p>
          </div>

          <div>
          <p className='capitalize text-sm text-gray-700'>items: {order.items.length}</p>
          <p className='capitalize text-sm text-gray-700'>method: {order.paymentMethod}</p>
          <p className='capitalize text-sm text-gray-700'>payment: {order.payment ? 'Done':'Pending'}</p>          
          <p className='capitalize text-sm text-gray-700'>Date: {new  Date(order.createdAt).toLocaleDateString('en-GB', {
                      timeZone: 'Asia/Kolkata',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
            })}
            </p>
            </div>

             <div>
           <p className='capitalize text-sm text-gray-700'>Amount: ${order.amount}</p>
           </div>

           <div>
            <select value={order.status} onChange={
              (e)=>{
                changestatus(order._id,e.target.value)
              }
               
              } className='capitalize border border-gray-400 rounded outline-0 text-sm text-gray-700'>
              <option value="Order placed">Order placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
           
        </div>
        
             </div>
       )
                  
     })}
     

    </div >
  )
}

export default Orders
