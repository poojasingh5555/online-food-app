import React, { useState } from "react";
import {useNavigate} from "react-router-dom"

const Card = ({ food,Addtocart}) => {
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("half");
   const navigate = useNavigate();


  // If your DB has different prices for half/full
  const finalPrice = food.price[size] * qty;
   const handleAddToCart = () => {
    // Add the food to cart with selected qty + size
    Addtocart({ ...food, price: finalPrice, qty, size });
    alert("sucessful")

    // Redirect to Cart page
    navigate("/cart");
  };

  return (
    <div className="px-4 py-6">
      <div className="max-w-sm bg-slate-100 border h-100 rounded-2xl shadow-lg">
        
        <img
          className="w-[400px] h-50 py-2 object-cover rounded-2xl px-4"
          src={food.image}
          alt={food.name}
        />

        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{food.name}</div>
          <p className="text-gray-700 text-base">{food.description}</p>
        </div>

        <div className="px-6 py-2 flex items-center justify-between">
          {/* Quantity Selector */}
          <select
            className="h-10 border rounded px-2"
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
          >
            {Array.from({ length: 6 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>

          {/* Size Selector */}
          <select
            className="h-10 border rounded px-2"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          >
            <option value="half">Half</option>
            <option value="full">Full</option>
          </select>

          {/* Price */}
          <div className="font-bold text-lg">₹{finalPrice}</div>
           <button
  onClick= {handleAddToCart}
  className="mt-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
>
  Add to Cart
</button>

        </div>
      </div>
    </div>
  );
};

export default Card;
