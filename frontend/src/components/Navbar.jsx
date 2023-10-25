import { useContext, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Ronglogo from "../assets/ronglogo.jpg";
import { UserContext } from "../context/UserContext";
import Menu from "./Menu";

const Navbar = () => {
  const [prompt, setPrompt] = useState("");
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const showMenu = () => {
    setMenu(!menu);
  };

  const { user } = useContext(UserContext);

  return (
    <div className="bg-black flex items-center justify-between px-6 md:px-[40px] py-4">
      <Link to="/" className="flex items-center">
        <img src={Ronglogo} alt="Rong Logo" className="h-8 cursor-pointer" />
      </Link>
      {path === "/" && (
        <div className="flex justify-center items-center space-x-1 ml-2"> {/* Increased margin to ml-4 */}
          <p
            onClick={() =>
              navigate(prompt ? "?search=" + prompt : navigate("/"))
            }
            className="cursor-pointer text-white hover:text-blue-500" // Added styling here
          >
            <BsSearch className="text-white text-xl" /> {/* Increased icon size */}
          </p>
          <input
            onChange={(e) => setPrompt(e.target.value)}
            className="outline-none px-3"
            placeholder="Search an event"
            type="text"
          />
        </div>
      )}
      <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
        {user ? (
          <h3>
            <Link to="/profile" className="text-white">Profile</Link>
          </h3>
        ) : (
          <h3>
            <Link to="/login" className="text-white">Login</Link>
          </h3>
        )}
        {user ? (
          <div onClick={showMenu}>
            <p className="cursor-pointer relative">
              <FaBars className="text-white text-xl" /> {/* Increased icon size */}
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
          <FaBars className="text-white text-xl" /> {/* Increased icon size */}
        </p>
        {menu && <Menu />}
      </div>
    </div>
  );
};

export default Navbar;
