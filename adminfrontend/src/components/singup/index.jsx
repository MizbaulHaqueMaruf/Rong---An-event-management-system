import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    number: "",
    email: "",
    role:"",
    password: "",
  });
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5000/api/admins/signup";
      const { data: res } = await axios.post(url, data);
      navigate("/admin-login");
      console.log(res.message);
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
    <div>
      
      <div style={{backgroundColor:'#2b333a'}}>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <div
            style={{
              background: "rgb(7 19 47)",
              width: "640px",
              padding: "20px",
              border: "1px solid #ccc",
              borderRadius: "20px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h1
              style={{
                fontSize: "24px",
                color: "white",
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              Create Account
            </h1>
            <input
              type="text"
              placeholder="Enter Your Name"
              name="name"
              onChange={handleChange}
              value={data.name}
              required
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
            <input
              type="text"
              placeholder="Enter Your Number"
              name="number"
              onChange={handleChange}
              value={data.number}
              required
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
            <input
              type="email"
              placeholder="Enter Your Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
            <input
              type="text"
              placeholder="Enter Your Role"
              name="role"
              onChange={handleChange}
              value={data.role}
              required
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
            <input
              type="password"
              placeholder="Enter Your Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
            {error && (
              <div
                style={{
                  color: "red",
                  marginBottom: "10px",
                }}
              >
                {error}
              </div>
            )}
            <button
              type="submit"
              style={{
                marginLeft: "190px",
                width: "35%",
                background: "black",
                color: "white",
                padding: "10px",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
