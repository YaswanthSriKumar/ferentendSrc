import React from 'react';
import './home.css'; // Import CSS for styling
import VideoCarousel from "../video component/VideoCarousel"
import CardsComponent from "../card-component/CardsComponent"
import Portfolio from "../Portfolio-component/Portfolio"
import Footer from "../footerComponet/footer"
import MapComponent from "../map-component/mapComponent"
import AboutUs from '../aboutUsComponent/aboutus';
import ProductGrid from '../product-component/Product'
const Home = ({isDarkMode}) => {

  return (
    <div className="home-container">
     <VideoCarousel isDarkMode={isDarkMode}/>
     <CardsComponent isDarkMode={isDarkMode}/>
     <Portfolio isDarkMode={isDarkMode}/>
     <ProductGrid isDarkMode={isDarkMode}/>
     <MapComponent isDarkMode={isDarkMode}/>
     <AboutUs isDarkMode={isDarkMode}/>
     <Footer isDarkMode={isDarkMode}/>
     
    </div>
  );
};

export default Home;
