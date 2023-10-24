import { useContext } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import HomeFeeds from "../components/HomeFeeds";
import Navbar from "../components/Navbar";
import { UserContext } from "../context/UserContext";
import About from "../components/about";
const Home = () => {
  const { user } = useContext(UserContext);

  // Define hardcoded data for events

  return (
    <>
      <Navbar />
      <About/>

      <div className="px-8 md:px-[200px] min-h-[80vh]">
          <Link to={user ? ` ` : "/login"}>
              <HomeFeeds/>
            </Link>
      </div>
      <Footer />
    </>
  );
};

export default Home;
