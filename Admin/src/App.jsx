import { useEffect, useState } from 'react'
import Navbar from './Components/Navbar'
import Sidebar from './Components/Sidebar'
import { Routes,Route } from 'react-router-dom'
import Add from './Components/Add'
import List from './Components/List'
import Orders from './Components/Orders'
import Login from './Components/Login'
import {ToastContainer} from 'react-toastify'

function App() {
  const [token, setToken] = useState(localStorage.getItem('admintoken')?localStorage.getItem('admintoken') : '');

  useEffect(()=>{
     localStorage.setItem('admintoken',token);
  },[token])

  return (    
    <div className='bg-gray-50 w-full h-screen'>
      <ToastContainer/>
      {token === "" ? <Login setToken={setToken}/>:
      <>
      <Navbar setToken={setToken}/>
      <hr/>       
      <div className='flex'>
          <Sidebar/>
          <div className='w-full'>
             <Routes>
               <Route path='/' element={<Add token={token}/>}/>
               <Route path='/list' element={<List token={token}/>}/>
               <Route path='/orders' element={<Orders token={token}/>}/>
             </Routes>
          </div>
      </div>
      </>
      }
      </div>
    
  )
}

export default App
