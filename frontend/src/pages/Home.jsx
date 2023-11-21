import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import HomeFeeds from "../components/HomeFeeds";
import Navbar from "../components/Navbar";
import { UserContext } from "../context/UserContext";

const Home = () => {
  const { user } = useContext(UserContext);
  const path = useLocation().pathname;
  return (
    <>
      <Navbar />
      <div className="px-8 md:px-[100px] min-h-[80vh] mt-20">
        <div className="text-2xl font-semibold mb-4">
          {path === "/" ? "Top Events" : null}
        </div>
        <Link to={user ? ` ` : "/login"}>
          <HomeFeeds />
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default Home;