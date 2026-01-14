
import React from "react";
import { useCart } from "./CartContext.jsx";
import axios from "axios";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price, 0);
   const handleorder =  async () => {
    if (cart.length === 0){
        alert("cart is empty");
        return;
    };
    try{
        const orderData = {
        items: cart,
        totalPrice: total,
        orderDate: new Date(),
      };
       await axios.post("https://online-food-app-csne.onrender.com/rest/order", orderData);

      alert(" Order placed successfully!");
      clearCart();

    }catch(err){
        console.err(err);
        alert("failed to placed to order")
    }

   }

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md mt-6">
      <h2 className="text-lg font-bold mb-3"> Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty</p>
      ) : (
        <>
          <ul>
            {cart.map((item, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center border-b py-2"
              >
                <div>
                  {item.name} ({item.size})  * {item.qty}
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-medium">₹{item.price}</span>
                  <button
                    onClick={() => removeFromCart(item._id, item.size)}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-3 font-semibold">Total: ₹{total}</p>

          <button
            onClick={clearCart}
            className="mt-3 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
          >
            Clear Cart
          </button>
          <button  onClick ={handleorder}
            className="mt-3 w-full bg-amber-500 text-white py-2 rounded-lg hover:bg-yellow-600"
          >Ordernow
           
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
