import React, { useEffect } from "react";
import HeroBanner from "../components/HeroBanner";
import LastestCollection from "../components/LastestCollection";
import BestSeller from "../components/BestSeller";
import OurPolicy from "../components/OurPolicy";
import NewLetterBox from "../components/NewLetterBox";
import { useProductStore } from "../store/productStore";
import Loading from "../components/Loading";

const Home = () => {
  const { getLastestProduct, getBestSeller, isLoading } = useProductStore();
  useEffect(() => {
    getLastestProduct();
    getBestSeller();
  }, [getBestSeller, getLastestProduct]);

  return (
    <div>
      <HeroBanner />

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <LastestCollection />
          <BestSeller />
        </>
      )}

      <OurPolicy />
      <NewLetterBox />
    </div>
  );
};

export default Home;
