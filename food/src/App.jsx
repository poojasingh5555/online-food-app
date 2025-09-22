import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Navbar from "./component/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Cart from "./component/Cart.jsx";
import Footer from "./component/Footer.jsx";

import ContactUs from "./pages/ContactUs.jsx";

import SignIn from "./pages/Signin.jsx";
import Signup from "./pages/Signup.jsx";





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
          <SignIn />
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
