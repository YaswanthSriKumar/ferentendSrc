import React from 'react';
import Nav from './nav-component/nav';
import Home from './home-component/home';
import { Route, Routes } from 'react-router-dom'; // Import Routes and Route
import AdminNav from './adminFolder/adminNavComponent/adminNavBar'
import ServiceDashbord from './adminFolder/servicedashboard/ServiceDashbord'
import ProductDashboard from './adminFolder/productdashbord/ProductDashbord'
import PrivateRoute from "./services/TokenValidationService"
import Login from "./login-Component/login"
import PortfolioDashboard from "./adminFolder/portfolioDashbord/PortfolioDashbord"
import SpecificService from "./specificServiceComponent/SpecificService"
import AllServices from './viewAllServices/AllServicesComponent/AllServices';
import IndividualService from './viewAllServices/individualService/individualServiceComponent/individualService'
import SubServiceDashboard from './adminFolder/subserviceDashbord/SubserviceDashbord'
import Footer from "./footerComponet/footer" 
import AllProducts from "./viewAllProducts/viewAllProductsComponent/viewAllProductComponent"
const Main = ({ toggleDarkMode, isDarkMode }) => {
  console.log("is it dark mood in main :   "+isDarkMode);
  return (
    

    <div className={`main-content ${isDarkMode ? 'dark-mode-main' : ''}`}>
      <Routes>
        <Route path="/" element={<><Nav toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} /><Home isDarkMode={isDarkMode} /></>} />
        <Route path="/admin" element={<Login />} />
        <Route path="/serviceDashbord" element={<PrivateRoute><AdminNav /><ServiceDashbord /></PrivateRoute>} />
        <Route path="/productDashbord" element={<PrivateRoute><AdminNav /><ProductDashboard /></PrivateRoute>} />
        <Route path="/portfolioDashbord" element={<PrivateRoute><AdminNav /><PortfolioDashboard /></PrivateRoute>} />
        <Route path="/subsevrvice" element={<PrivateRoute><AdminNav /><SubServiceDashboard /></PrivateRoute>} />

        <Route path="/specificservice" element={<SpecificService />} />
        <Route path="/allservices" element={<><Nav toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} /><AllServices /></>} />
        <Route path="/allproducts" element={<><Nav toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} /><AllProducts /></>} />

        <Route path="/service/:id" element={<><Nav toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} /><IndividualService /><Footer/></>} />


      </Routes>
    </div>
  );
};

export default Main;
