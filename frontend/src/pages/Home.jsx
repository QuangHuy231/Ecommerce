import React, { useEffect } from "react";
import HeroBanner from "../components/HeroBanner";
import LastestCollection from "../components/LastestCollection";
import BestSeller from "../components/BestSeller";
import OurPolicy from "../components/OurPolicy";
import NewLetterBox from "../components/NewLetterBox";
import { useProductStore } from "../store/productStore";
import ModalSelectSize from "../components/ModalSelectSize";
import { useModalStore } from "../store/modalStore";

const Home = () => {
  const { getLastestProduct, getBestSeller } = useProductStore();
  const { isOpen } = useModalStore();
  useEffect(() => {
    getLastestProduct();
    getBestSeller();
  }, [getBestSeller, getLastestProduct]);

  return (
    <div>
      <HeroBanner />

      <LastestCollection />
      <BestSeller />

      {isOpen && <ModalSelectSize />}
      <OurPolicy />
      <NewLetterBox />
    </div>
  );
};

export default Home;
