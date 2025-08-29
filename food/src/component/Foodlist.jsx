import React, { useEffect, useState } from "react";
import Card from "./Card";

const FoodList = ({ searchQuery }) => {
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [cart, setCart] = useState([]); // 🛒 cart state

  useEffect(() => {
    fetch("http://localhost:5000/api/foodData")
      .then((res) => res.json())
      .then((data) => {
        setFoods(data);
        setFilteredFoods(data);
      })
      .catch((err) => console.error("Error fetching food:", err));
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredFoods(foods);
    } else {
      setFilteredFoods(
        foods.filter((food) =>
          food.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, foods]);

  // Function to handle add to cart
  const Addtocart = (item) => {
    setCart([...cart, item]); 
  };

  return (
    <div className="p-6">
      {/* Foods Section */}
      <div className="flex flex-wrap gap-4 justify-center">
        {filteredFoods.length > 0 ? (
          filteredFoods.map((food) => (
            <Card key={food._id} food={food} Addtocart={Addtocart} />
          ))
        ) : (
          <p className="text-gray-500 text-lg text-center w-full">
            No dishes found
          </p>
        )}
      </div>

      {/* Cart Section */}
      <div className="mt-8">
        <h2 className="font-bold text-xl"> Cart</h2>
        {cart.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          <ul className="list-disc pl-6">
            {cart.map((item, idx) => (
              <li key={idx}>
                {item.qty} * {item.size} {item.name} = ₹{item.price}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FoodList;
