import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Sample locations data (Replace with your own data)
const locations = [
  {
    id: 1,
    name: 'Mumbai',
    latitude: 19.0760,
    longitude: 72.8777,
    description: 'The financial capital of India.',
    country: 'India',
  },
  {
    id: 2,
    name: 'London',
    latitude: 51.5074,
    longitude: -0.1278,
    description: 'The capital of England.',
    country: 'United Kingdom',
  },
  {
    id: 3,
    name: 'Tokyo',
    latitude: 35.6762,
    longitude: 139.6503,
    description: 'The capital of Japan.',
    country: 'Japan',
  },
  // Add more locations as needed
];

const MapComponent = ({isDarkMode}) => {
  const [geojsonData, setGeojsonData] = useState(null);
  const isMobile = useMediaQuery('(max-width:600px)'); // Check if screen size is mobile

  // Fetch GeoJSON data for country boundaries
  useEffect(() => {
    const fetchGeoJson = async () => {
      const response = await fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json');
      const data = await response.json();
      setGeojsonData(data);
    };

    fetchGeoJson();
  }, []);

  // Function to handle country coloring
  const getColor = (countryName) => {
    const location = locations.find((loc) => loc.country === countryName);
    return location ? '#000000' : '#26583a'; // Dark Green for countries with markers, Light Green for others
  };

  // Style function for GeoJSON layer (land countries)
  const style = (feature) => {
    const countryName = feature.properties.name;

    return {
      fillColor: getColor(countryName), // Get color based on country name
      weight: 1,
      opacity: 1,
      color: 'white',
      fillOpacity: 0.7,
    };
  };

  return (
    <Box
      sx={{
        padding: '20px', // Add padding around the entire map component
        boxSizing: 'border-box', // Include padding in the width/height calculation
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', // Box shadow only at the bottom (0 for left/right, 2px for bottom)
        borderRadius: '8px', // Optional: Add border radius for rounded corners
        marginTop:"5px",
        marginBottom: '5px'
      }}
      className={`${isDarkMode ? 'dark-mode-section' : ''}`}
    >
      {/* Centered title */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 1 }}>
        <Typography variant="h4" gutterBottom>
          World Map with Locations
        </Typography>
      </Box>

      {/* Centered description */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 1 }}>
        <Typography variant="h6"  gutterBottom>
          Click on any marker to view more information.
        </Typography>
      </Box>

      {/* Map Container with conditional styling based on screen size */}
      <Box
        sx={{
          height: 'calc(100vh)', // Adjust for title + description + some spacing
          width: '79%',
          overflowX: 'auto', // Enable horizontal scrolling
          margin: 'auto',
        }}
      >
        <div
          style={{
            width: isMobile ? '300%' : '79%', // Set width to 150% on mobile for horizontal scroll
            minWidth: '100%', // Make sure the map doesn't shrink
            height: '100%',
          }}
        >
          <MapContainer
            center={[10, 0]} // Center the map at a neutral position
            zoom={2} // Global zoom level
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={false}
            zoomControl={false}
            touchZoom={false}
            dragging={false}
          >
            {/* Tile Layer - World map tiles */}
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              noWrap={true}
            />

            {/* GeoJSON Layer for country boundaries */}
            {geojsonData && (
              <GeoJSON
                data={geojsonData}
                style={style} // Apply style to each country based on its name
              />
            )}

            {/* Markers for locations */}
            {locations.map((location) => (
              <Marker
                key={location.id}
                position={[location.latitude, location.longitude]}
                icon={new Icon({
                  iconUrl: `https://cdn-icons-png.flaticon.com/512/684/684908.png`, // Location pin icon URL
                  iconSize: [30, 30], // Resize the icon if needed
                  iconAnchor: [15, 30], // Anchor the icon correctly
                  popupAnchor: [0, -30], // Adjust the popup position if necessary
                })}
              >
                <Popup>
                  <strong>{location.name}</strong>
                  <br />
                  {location.description}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </Box>
    </Box>
  );
};

export default MapComponent;
