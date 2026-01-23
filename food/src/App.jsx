import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Navbar from "./component/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Cart from "./component/Cart.jsx";
import Footer from "./component/Footer.jsx";

import ContactUs from "./pages/ContactUs.jsx";

import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";




function App() {
  const router = createBrowserRouter([
    {
      path: "/home",
      element: (
        <>
          <Navbar />
          <Home />
        </>
      ),
    },
    {
      path:"/orders",
      element:(
        <>
        <Navbar/>
        <Cart/>
        </>
      )

    },
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <Login />
        </>
      ),
    },
    {
      path: "/signup",
      element: (
        <>
          <Navbar />
          <Register />
        </>
      ),
    },{

      path: "/contact",
      element : (
        <>
        <Footer/>
        <ContactUs/>
        </>
      )
    }
   
  ]);

  return (
  
      <RouterProvider router={router} />
    
  );
}

export default App;
