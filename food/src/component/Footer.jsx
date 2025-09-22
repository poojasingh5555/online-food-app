import React  from 'react'
import {Link} from "react-router-dom"

const Footer = () => {
  return (
    <div>
      

<footer className="bg-green-400 rounded-lg shadow-sm m-4 dark:bg-gray-100">
    <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span className="text-sm text-gray-500 sm:text-center dark:text-black">© 2023 <a href="https://flowbite.com/" class="hover:underline">Flowbite™</a>. All Rights Reserved.
    </span>
    <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 gap-6 sm:mt-0">
        <li>
      <Link to="" className="hover:underline me-4 md:me-6">About
      </Link>
        </li>
        
        <li>
         <Link to="" className="hover:underline me-4 md:me-6">Privacy policy
         </Link>
        </li>
       
        <li>
           <Link to="" className="hover:underline me-4 md:me-6">Liceance
           </Link>
        </li>
        
        
        <li>
            <Link to="/contact" className="hover:underline me-4 md:me-6">
            ContactUs</Link>
        </li>
    </ul>
    </div>
</footer>

    </div>
  )
}

export default Footer
