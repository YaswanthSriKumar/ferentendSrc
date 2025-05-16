import React, { useEffect, useRef, useState } from 'react';
import './CardsComponent.css';
import ApiService from "../services/ApiService";
import API_URLS from "../services/ApiUrl"
import { useNavigate } from "react-router-dom";


const CardsComponent = ({isDarkMode}) => {
  const containerRef = useRef(null);
  console.log("is it dark mood :   "+isDarkMode);
  useState()
  const [cardsData,setcardsData]=useState([]);
  useEffect(()=>{
    const fatchData= async()=>{
      try {
        const response= await ApiService.get(API_URLS.GET_SELECTED_SERVICES
          )
        setcardsData(response)
        console.log(response);
      } catch (error) {
        console.error("Error submitting the form:", error);
      }
    };
    fatchData();
  }, [])
console.log(cardsData);
const navigate = useNavigate();

const handleCardClick = (card) => {
  navigate(`/specificservice`, { state: { service: card } });
};

  const scroll = (direction) => {
    const container = containerRef.current;
    const cardWidth = container.firstChild.offsetWidth;
    if (direction === 'left') {
      container.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
  };

  return (
    <div className={`slider-section  ${isDarkMode ? 'dark-mode-section' : 'BaseColours'}`}>
      <h2 className={`section-heading `}>Our Services</h2>
    <div className="slider-wrapper">
      <button className="nav-button left" onClick={() => scroll('left')}>&lt;</button>
      <div className="card-container" ref={containerRef}>
        {cardsData.map((card, index) => (
          <div className={`card ${isDarkMode ? 'card-dark-mode' : ''}`} key={index} onClick={() => handleCardClick(card)}>
            <img src={card.serviceImage} alt={card.serviceName} />
            <h3>{card.serviceName.toUpperCase()}</h3>
            <p>{card.serviceDescription.split(".")[0]}</p>
          </div>
        ))}
      </div>
      <button className="nav-button right" onClick={() => scroll('right')}>&gt;</button>
    </div>
    <div className="view-all-container">
        <button className={`meadiamButton ${isDarkMode ? 'meadiamButton-darkmode' : ''}`}>View All Services</button>
      </div>
    </div>
  );
};



export default CardsComponent;
