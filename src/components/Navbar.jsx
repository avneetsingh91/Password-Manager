import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-purple-200 flex justify-around px-4 h-14 items-center w-full'>
        <div className="logo font-bold text-2xl">
            Pass<span>Op//</span>
        </div>
      <ul>
        <li className='flex gap-3 cursor-pointer '>
            <a href='/' className='hover:font-bold'>Home</a>
            <a href='#' className='hover:font-bold'>About</a>
            <a href='#' className='hover:font-bold'>Contact</a>
        </li>
        </ul> 
    </nav>
  )
}

export default Navbar
