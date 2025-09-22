import React, { useEffect, useState } from "react";
import Carditem from "./Carditem.jsx";


const Card = () => {
  const [foods, setFoods] = useState([]);
  

 

  useEffect(() => {
    fetch("http://localhost:5000/api/foodData")
      .then((res) => res.json())
      .then((data) => setFoods(data))
      .catch((err) => console.error("Error fetching foods:", err));
  }, []);

  return (
    <div className="p-6">
      {/* Food Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {foods.map((food) => (
          <div key={food._id}>
            <Carditem food={food}  />
          </div>
        ))}
      </div>

     
    </div>
  );
};

export default Card;
