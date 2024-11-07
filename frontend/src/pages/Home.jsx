import React, { useEffect } from "react";
import HeroBanner from "../components/HeroBanner";
import LastestCollection from "../components/LastestCollection";
import BestSeller from "../components/BestSeller";
import OurPolicy from "../components/OurPolicy";
import NewLetterBox from "../components/NewLetterBox";
import { useProductStore } from "../store/productStore";
import Loading from "../components/Loading";
import { useModalStore } from "../store/modalStore";
import ModalSelectSize from "../components/ModalSelectSize";

const Home = () => {
  const { getLastestProduct, getBestSeller, isLoading } = useProductStore();
  const { isOpen } = useModalStore();
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
      {isOpen && <ModalSelectSize />}
      <OurPolicy />
      <NewLetterBox />
    </div>
  );
};

export default Home;
