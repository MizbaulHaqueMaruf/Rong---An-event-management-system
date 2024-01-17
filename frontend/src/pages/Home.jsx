import { useEffect } from "react";
import { useLocation, useState } from "react-router-dom";
import Footer from "../components/Footer";
import HomeFeeds from "../components/HomeFeeds";
import Navbar from "../components/Navbar";

const Home = () => {
  const path = useLocation().pathname;
  const referrer = document.referrer;
  const activeTab = useState("Top Events");
  useEffect(() => {
    if (referrer.includes("localhost:5137/payment/success")) {
      alert("Email has been sent!"); 
    }
  }, [referrer]);

  return (
    <>
      <Navbar />
      <div className="px-8 md:px-[100px] min-h-[80vh] mt-20">
        <div className="text-2xl font-semibold mb-4">
          {path === "/" ? {activeTab} : null}
        </div>
          <HomeFeeds />
      </div>
      <Footer />
    </>
  );
};

export default Home;
