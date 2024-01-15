import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:5000/api/admins/login";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data);
			window.location = "/admin-dash";
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<div style={{backgroundColor:'#2b333a'}}>
		<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
		  <div style={{background: 'rgb(7 19 47)', width: '640px', padding: '20px', border: '1px solid #ccc', borderRadius: '20px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
			<form onSubmit={handleSubmit}>
			  <h1 style={{ fontSize: '24px',color:'white', textAlign: 'center', marginBottom: '20px' }}>Login to Admin Panel</h1>
			  <input
				type="email"
				placeholder="Email"
				name="email"
				onChange={handleChange}
				value={data.email}
				required
				style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
			  />
			  <input
				type="password"
				placeholder="Password"
				name="password"
				onChange={handleChange}
				value={data.password}
				required
				style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
			  />
			  {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
			  <button
				type="submit"
				style={{marginLeft: '190px', width: '35%', background: 'black', color: 'white', padding: '10px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}
			  >
				Sign In
			  </button>
			</form>
			
		  </div>
		</div>
	  </div>
	  
	);
};

export default Login;


/* 
<div style={{ textAlign: 'center', marginTop: '20px' }}>
			  <h1 style={{ fontSize: '20px' }}>New Here ?</h1>
			  <Link to="/signup">
				<button
				  type="button"
				  style={{ background: 'green', color: 'white', padding: '10px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}
				>
				  Sign Up
				</button>
			  </Link>
			</div>

			*/