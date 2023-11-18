import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import './navbar.css'

function Navbar() {
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle("responsive_nav");
	};

	return (
		<header>
			<h3>Your Event, Our Expertise</h3>
			<nav ref={navRef}>
                <a href="/#">Home</a>
				<a href="/#">About</a>
				<a href="/#">Services</a>
				<a href="/#">Contact us</a>
				<a href="/login">Login</a>
                <a href="/register">Don't have an account? Click here</a>
               
				
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button>
			</nav>
            <div className="reg" style={{ textAlign:'right', marginLeft:'00px' }}>
                    
                </div>
			<button
				className="nav-btn"
				onClick={showNavbar}>
				<FaBars />
			</button>
		</header>
	);
}

export default Navbar;
