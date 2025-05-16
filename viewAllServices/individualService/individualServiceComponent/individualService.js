import { useParams } from "react-router-dom";
import HeroComponent from '../herogallaryComponent/heroComponent'
import WhatWeOffer from "../whatWeOfferComponent/WhatWeOffer"
import Capability from "../CapabilityComponent/CapabilityComponent"
import ProcessFlow from "../processFlowComponent/ProcessFlowComponent"
import Application from "../applicationComponent/ApplicationComponent"
import Testimonials from  "../testimonialsComponent/TestimonialsComponent"
import FAQ from "../FAQsComponent/FAQsComponent"
const IndividualService = ({isDarkMode}) => {

    const { id } = useParams(); // Get service ID from URL
    return (
      <div className="home-container">
       <HeroComponent/>
       <WhatWeOffer/>
       <Capability/>
       <ProcessFlow/>
       <Application/>
       <Testimonials/>
       <FAQ/>
      </div>
    );
  };
  
  export default IndividualService;
  