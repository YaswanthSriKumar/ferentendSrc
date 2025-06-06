import React, { useEffect, useRef, useState } from 'react';
import './CardsComponent.css';
import ApiService from "../services/ApiService";
import API_URLS from "../services/ApiUrl";
import { useNavigate } from "react-router-dom";

const CardsComponent = ({ isDarkMode }) => {
  const containerRef = useRef(null);
  const [cardsData, setCardsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ApiService.get(API_URLS.GET_SELECTED_SERVICES);
        setCardsData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCardClick = (card) => {
    navigate(`/specificservice`, { state: { service: card } });
  };

  const scroll = (direction) => {
    const container = containerRef.current;
    if (container && container.firstChild) {
      const cardWidth = container.firstChild.offsetWidth;
      if (direction === 'left') {
        container.scrollBy({ left: -cardWidth, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    }
  };

  // Render a loading message if data is still being fetched.
  if (isLoading) {
    return (
      <div className={`slider-section ${isDarkMode ? 'dark-mode-section' : 'BaseColours'}`}>
        <h2 className="section-heading">Our Services</h2>
        <div className="loading">Loading...</div>
      </div>
    );
  }

  // If there is no data, show a "No services available" message.
  if (!cardsData || cardsData.length === 0) {
    return (
      <div className={`slider-section ${isDarkMode ? 'dark-mode-section' : 'BaseColours'}`}>
        <h2 className="section-heading">Our Services</h2>
        <div className="no-services">No services available</div>
      </div>
    );
  }

  // Otherwise, show the cards slider.
  return (
    <div className={`slider-section ${isDarkMode ? 'dark-mode-section' : 'BaseColours'}`}>
      
      <h2 className="section-heading">Our Services</h2>
      <div className="view-all-container">
        <button className={`meadiamButton ${isDarkMode ? 'meadiamButton-darkmode' : ''}`}>
          View All Services
        </button>
      </div>
      <div className="slider-wrapper">
        <button className="nav-button left" onClick={() => scroll('left')}>&lt;</button>
        <div className="card-container" ref={containerRef}>
          {cardsData.map((card, index) => (
            <div
              className={`card ${isDarkMode ? 'card-dark-mode' : ''}`}
              key={index}
              onClick={() => handleCardClick(card)}
            >
              <img src={card.serviceImage} alt={card.serviceName} />
              <h3>{card.serviceName.toUpperCase()}</h3>
            </div>
          ))}
        </div>
        <button className="nav-button right" onClick={() => scroll('right')}>&gt;</button>
      </div>
      
    </div>
  );
};

export default CardsComponent;
