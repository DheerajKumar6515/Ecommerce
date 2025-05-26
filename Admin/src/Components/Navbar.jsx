import { toast } from 'react-toastify'

function Navbar({setToken}) {
  const handlelogout=()=>{
       setToken('');
       toast.success('Logout')
  }
  return (
    <div className='h-12 md:h-18 lg:h-24 w-full px-2 md:px-4 xl:h-12 py-1 flex items-center justify-between'>
        <div className='text-lg font-medium md:text-3xl lg:text-4xl xl:text-2xl'>ShopNest <span className='text-base font-bold rounded-full text-red-500'>.</span></div>

        <div>
            <button onClick={handlelogout} className='cursor-pointer bg-gray-400 px-2 py-[2px] text-sm md:text-xl md:py-2 md:px-4 lg:text-2xl xl:text-sm rounded-md text-center hover:bg-gray-500 hover:text-white'>Logout</button>
        </div>    
    </div>
  )
}

export default Navbar
