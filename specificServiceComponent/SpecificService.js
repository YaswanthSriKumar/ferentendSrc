import React from "react";
import { useLocation } from "react-router-dom";
import "./SpecificService.css";

const SpecificService = () => {
    const location = useLocation();
    const { service } = location.state || {};
    
    if (!service) {
      return <p>Service data not found!</p>;
    }
  
    return (
        <div className="service-container">
        {/* Service Name - Centered at Top */}
        <h2 className="service-name">{service.serviceName}</h2>
      
        {/* Image + Description Section */}
        <div className="service-content">
          {/* Image on Left */}
          <img src={service.serviceImage} alt={service.serviceName} className="service-image" />
      
          {/* Description on Right */}
          <div className="service-details">
            <h3 className="description-title">Service Description: </h3>
            <p className="description-text">{service.serviceDescription}</p>
          </div>
        </div>
      
        {/* Full-Width Button at Bottom */}
        <button className="avail-button">Avail Service</button>
      </div>
      
    );
  };
  
  export default SpecificService;
  