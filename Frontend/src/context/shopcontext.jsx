import { createContext, useEffect, useState } from "react";
//import localproducts from '../data/localproducts.json'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const Shopcontext=createContext()

function ShopContextProvider({children}) {
    
    let currency='$';
    let deliveryfee=10;
    const [search,Setsearch]=useState('')
    const [showsearch,Setshowsearch]=useState(false)
    const [cartItem,setCartitem]=useState({})
    const [products,setproducts]=useState([])
    const [token,setToken]=useState('')
    const navigate=useNavigate();



    const addToCart=async(Itemid,size)=>{

      //const cartData=structuredClone(cartItem);
       
      if(!size){
         toast.error('Plz select sizes.');
         return;
      }

   
       try {
           const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart/add`,{Itemid,size},{headers:{
            Authorization :`Bearer ${localStorage.getItem('token')}`
           }})
           if(res.data.success){
              setCartitem(res.data.cartData)
              toast.success(res.data.message);
           }
       } catch (error) {
          console.log(error)
       }
    }

    const getCountdata= () =>{
       let totalcount=0;

       for(const items in cartItem){
         for(const item in cartItem[items]){
             try {
               if(cartItem[items][item] > 0){
                  totalcount += cartItem[items][item];
               }
             } catch (error) {
               
             }
         }
       }
       return totalcount;
    }

    const updateQuantity=async(Itemid,size,Quantity)=>{
      //let cartData = structuredClone(cartItem);

      //cartData[Itemid][size]=Quantity;

      try {
         const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart/update`,{Itemid,size,Quantity},{headers:{
            Authorization :`Bearer ${localStorage.getItem('token')}`
         }});
         if(res.data.success){
            setCartitem(res.data.cartData);
           // toast.success(res.data.message);
         }
      } catch (error) {
         toast.error(error.message);
      }

    }

    const getTotalcount=()=>{
      let totalAmount=0;
      for(const items in cartItem){
         let itemInfo = products.find((product)=> product._id === items);
      
         for(const item in cartItem[items]){            
           try {
              if(cartItem[items][item] > 0){
                 totalAmount += itemInfo.price * cartItem[items][item];
              }
           } catch (error) {
              
           }
         }
      }

      return totalAmount;
    }


    const getData=async()=>{
       try {
         const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/Listproduct`);
          if(res.data.success){
                //setproducts(prev => [...prev, ...res.data.products]);
                setproducts(res.data.products);
          }
       } catch (error) {
         toast.error(error.message);
       }
    }
   
    const cartdata=async()=>{
      try {
         const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cart/cartdata`,{headers:{
            Authorization :`Bearer ${localStorage.getItem('token')}`
         }});
         if(res.data.success){
            setCartitem(res.data.cartData);
         }
      } catch (error) {
         //toast.error(error.message);
         //console.log(error.message)
      }
    }

    useEffect(()=>{
      getData();
      cartdata();
    },[])
   

    const value={
        products,
        currency,
        deliveryfee,
        search,
        Setsearch,
        showsearch,
        Setshowsearch,
        addToCart,
        getCountdata,
        cartItem,
        setCartitem,
        updateQuantity,
        getTotalcount,
        navigate,
        token,
        setToken
    }

  return (
     <Shopcontext.Provider value={value}>
        {children}
     </Shopcontext.Provider>
  )
}

export default ShopContextProvider
