import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./component/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Signup from "./pages/SignUp.jsx";
import Signin from "./pages/Signin.jsx";
import Addtocart from "./pages/Addtocart.jsx";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);

  // Function to add item to cart
  const addToCart = (food) => {
    setCart((prev) => [...prev, food]); // Add new food to cart array
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar cartCount={cart.length} />
          <Home
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            addToCart={addToCart}
          />
        </>
      ),
    },
    {
      path: "/signin",
      element: (
        <>
          <Navbar cartCount={cart.length} />
          <Signin />
        </>
      ),
    },
    {
      path: "/signup",
      element: (
        <>
          <Navbar cartCount={cart.length} />
          <Signup />
        </>
      ),
    },
    {
      path: "/cart",
      element: (
        <>
          <Navbar cartCount={cart.length} />
          <Addtocart cart={cart} />
        </>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
