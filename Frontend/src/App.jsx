import { useState } from 'react'
//import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import Loginpage from './components/Loginpage'
import Signuppage from './components/Signuppage'
import Home from './components/Home'
import About from './components/About'
import Collection from './components/Collection'
import Contact from './components/Contact'
import Productpage from './components/Productpage'
import Cartpage from './components/Cartpage'
import DeliveryPaymentpage from './components/DeliveryPaymentpage'
import Myorderpage from './components/Myorderpage'
import Search from './components/Search';
import { ToastContainer, toast } from 'react-toastify';
//import Userprotection from './components/userprotection';

function App() {

  return (
    <>
     <ToastContainer />
      <Navbar />  
      <Search/>  
        <Routes>      
          <Route path='/' element={<Signuppage/>} />
          <Route path="/login" element={<Loginpage/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/collection" element={<Collection/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/product/:id" element={<Productpage/>} />
          <Route path="/cart" element={<Cartpage/>} />
          <Route path="/myorder" element={<Myorderpage/>} />
          <Route path="/delivery" element={<DeliveryPaymentpage/>} />
        </Routes>
    </>
  )
}

export default App
