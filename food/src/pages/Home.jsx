import React from "react";

import Footer from "../component/Footer.jsx";
import Carousel from "../component/Carousel.jsx";
import Card from "../component/Card.jsx";


const Home = ({searchQuery,setSearchQuery}) => {
  return (
    <>
   
      <div className="px-4 py-4">
        <Carousel  setSearchQuery={setSearchQuery}/>
      </div>
      <div>
      <Card/>
    </div>
     
      <div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
