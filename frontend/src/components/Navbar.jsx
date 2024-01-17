import { useContext, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Ronglogo from "../assets/ronglogo.jpg";
import { UserContext } from "../context/UserContext";
import Menu from "./Menu";

const Navbar = () => {
  const [prompt, setPrompt] = useState("");
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const { userId } = useContext(UserContext);
  const handleSearch = () => {
    if (prompt) {
      navigate(`/search/${prompt}`);
    }
  };

  const showMenu = () => {
    setMenu(!menu);
  };

  const { user } = useContext(UserContext);

  return (
    <div className="bg-black flex items-center justify-between px-5 md:px-[30px] py-5">
      <Link to="/" className="flex items-center">
        <img src={Ronglogo} alt="Rong Logo" className="h-8 cursor-pointer" />
      </Link>
        <div className="flex justify-center items-center space-x-1 ml-6 relative"> {/* Increased margin to ml-4 */}
          <p onClick={handleSearch} className="cursor-pointer">
            <BsSearch className="text-red-100 h-5 w-5" />
          </p>
          <input
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()} 
              className="outline-none px-6 bg-gray-700 text-stone-50 text-left h-7 rounded"
              placeholder="Search Events ..."
              type="text"
          />
        </div>
      <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4 hover:text-gray-500">
        {user ? (
          <h3>
            <Link to={`/profile/${userId}`} className="text-white">Profile</Link>
          </h3>
        ) : (
          <h3>
            <Link to="/login" className="text-white">Login</Link>
          </h3>
        )}
        {user ? (
          <div onClick={showMenu}>
            <p className="cursor-pointer relative">
              <FaBars className="text-white" />
            </p>
            {menu && <Menu />}
          </div>
        ) : (
          <h3>
            <Link to="/register" className="text-white">Register</Link>
          </h3>
        )}
      </div>
      <div onClick={showMenu} className="md:hidden text-lg">
        <p className="cursor-pointer relative">
          <FaBars className="text-white" />
        </p>
        {menu && <Menu />}
      </div>
    </div>
  );
};

export default Navbar;
