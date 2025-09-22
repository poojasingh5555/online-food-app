import { useState } from "react";
import { useCart } from "./CartContext.jsx";
import { useNavigate } from "react-router-dom";

const Carditem = ({ food }) => {
  const [size, setSize] = useState("half");
  const [qty, setQty] = useState(1);

  const { addToCart } = useCart();
  const navigate = useNavigate();



const price = food.price[size] * qty;

  const handleAddToCart = () => {
    addToCart(food, size, qty);
    navigate("/orders");
  };

return (
  <div className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition">
    <img
      src={food.image}
      alt={food.name}
      className="w-full h-40 object-cover rounded-lg"
    />
    <h2 className="text-xl font-semibold mt-3">{food.name}</h2>
    <p className="text-gray-600 text-sm">{food.description}</p>

    {/* Select Half/Full */}
    <select
      value={size}
      onChange={(e) => setSize(e.target.value)}
      className="mt-3 w-full border rounded-lg px-2 py-1"
    >
      <option value="half">Half — ₹{food.price.half}</option>
      <option value="full">Full — ₹{food.price.full}</option>
    </select>

    {/* Select Quantity */}
    <select
      value={qty}
      onChange={(e) => setQty(Number(e.target.value))}
      className="mt-2 w-full border rounded-lg px-2 py-1"
    >
      {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
        <option key={num} value={num}>
          {num}
        </option>
      ))}
    </select>

    {/* Show Final Price */}
    <p className="mt-2 font-bold">Total: ₹{price}</p>

    {/* Add to Cart Button */}
    <button
      className="mt-3 w-full bg-amber-400 py-2 rounded-xl font-medium hover:bg-amber-500"
      onClick={handleAddToCart}
    >
      Add to Cart
    </button>
  </div>
)};
export default Carditem;
