import React from "react";
import HeroBanner from "../components/HeroBanner";
import Title from "../components/Title";
import LastestCollection from "../components/LastestCollection";
import BestSeller from "../components/BestSeller";
import OurPolicy from "../components/OurPolicy";
import NewLetterBox from "../components/NewLetterBox";

const Home = () => {
  return (
    <div>
      <HeroBanner />
      <LastestCollection />
      <BestSeller />
      <OurPolicy />
      <NewLetterBox />
    </div>
  );
};

export default Home;
