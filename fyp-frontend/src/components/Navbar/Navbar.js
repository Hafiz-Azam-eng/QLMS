import React from 'react'
import './navbar.css'
import {AiOutlineMenu} from 'react-icons/ai';
import {AiOutlineClose} from 'react-icons/ai';
import { useState } from 'react';
import { Link, useLocation } from "react-router-dom"
// import CustomButton from '../CustomButton/CustomButton'

const Navbar = () => {
    const [toggle,setToggle]  = useState(false);
    const location = useLocation();
    return (
    <div className='bg-white'>
        <div className='max-w-[1240px] px-[15px] py-[15px] items-center flex justify-between mx-auto'> 
            <div className='flex items-center gap-10'>
            { toggle ? 
            <AiOutlineMenu onClick={()=>setToggle(!toggle)} className='text-white text-2xl md:hidden block'/>
            :
            <AiOutlineClose onClick={()=>setToggle(!toggle)} className='text-white text-2xl md:hidden block'/>
            } 
            <div className='text-3xl font-bold text-[#00A86B]'>
                Quranenc
            </div>
            <ui className='hidden md:flex text-gray-700 gap-10 list-none text-xl'>
                <li>
                <Link to="/">Home</Link>
                    </li>
                <li>About</li>
                <li>Contact</li>
                <li>DashBoard</li>
            </ui>

           {/* Responsive menu */}

           <ui className={` duration-300 md:hidden fixed text-start bg-black z-40 text-white top-[70px] w-full h-screen list-none 
               ${toggle? 'left-[-100%]' : 'left-[0]'}`}>
                <li className='p-5'>Home</li>
                <li className='p-5'>About</li>
                <li className='p-5'>Contact</li>
                <li className='p-5'>DashBoard</li>
            </ui>
            </div>
            
            <button className='bg-white text-[#414141] font-bold py-2 px-4'>
          {location.pathname === '/Registration' ? (
            <Link to='/Login'>Login</Link>
          ) : (
            <Link to='/Registration'>Signup</Link>
          )}
        </button>
        </div>
    </div>
    )
}

export default Navbar