import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext.jsx";


const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("authToken");
  const {cart} = useCart()


  const handleLogout = () => {
    localStorage.removeItem("authToken");
    alert("Logged out successfully!");
    navigate("/signin");
  };



  return (
    <div className="shadow-md bg-green-400 dark:bg-gray-900 dark:text-white duration-200">
      <div className="container py-3 sm:py-0">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div>
            <Link
              to="/"
              className="flex justify-center gap-2 text-3xl font-bold italic"
            >
              <img
                className="w-[40px] rounded-full"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwq0TsTnmDRX7x8dsanjxCwV3I-3dsk_qpwm2vBUv2LGlnfr_vVsWWC_kiPj5l_X_W290&usqp=CAU"
                alt="food"
              />
              FoodieZone
            </Link>
          </div>

          {/* Links */}
          <ul className="hidden sm:flex gap-4">
            {isLoggedIn ? (
              <>
              <li>
                  <Link to="/" className="inline-block py-4 px-6 hover:text-primary">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="inline-block py-4 px-6 hover:text-primary">
                    Sign Up
                  </Link>
                </li>
              
              </>
            ) : (
              <>
                <li>
                  <Link to="/home" className="inline-block py-4 px-6 hover:text-primary">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to='/orders' className="inline-block py-4 px-6 hover:text-primary">Cart({cart.length})
                  </Link>
                </li>
                
                
                <li>
                  
                    <button
                    onClick={handleLogout}
                    className="inline-block py-4 px-6 hover:text-primary "
                  >
                    Logout
                  </button>

                
                 
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
