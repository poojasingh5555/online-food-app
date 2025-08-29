import React from "react";

import Footer from "../component/Footer.jsx";
import Carousel from "../component/Carousel.jsx";
import FoodList from "../component/FoodList.jsx";

const Home = ({searchQuery,setSearchQuery}) => {
  return (
    <>
      <div className="px-4 py-4">
        <Carousel  setSearchQuery={setSearchQuery}/>
      </div>
      <div className="min-h-screen bg-gray-50">
        <h1 className="text-3xl font-bold text-center py-6"> Food Menu</h1>
        <FoodList  searchQuery={searchQuery}/>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
