import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Navbar from "./component/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Cart from "./component/Cart.jsx";
import Footer from "./component/Footer.jsx";

import ContactUs from "./pages/ContactUs.jsx";

import Signin from "./pages/signin.jsx";
import Signup from "./pages/signup.jsx";





function App() {
  const router = createBrowserRouter([
    {
      path: "/",
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
      path: "/signin",
      element: (
        <>
          <Navbar />
          <Signin />
        </>
      ),
    },
    {
      path: "/signup",
      element: (
        <>
          <Navbar />
          <Signup />
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
