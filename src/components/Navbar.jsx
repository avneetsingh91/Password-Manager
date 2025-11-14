
import { FaGithub } from "react-icons/fa";
const Navbar = () => {
  return (
    <nav className='bg-purple-200 flex justify-around px-4 h-14 items-center w-full'>
        <div className="logo font-bold text-2xl">
            Pass<span>Op//</span>
        </div>
      <ul>
        <li className='flex gap-3 cursor-pointer '>
          <a href="https://github.com/avneetsingh91/Password-Manager"><FaGithub size={45} /></a> 
        </li>
        </ul> 
    </nav>
  )
}

export default Navbar
