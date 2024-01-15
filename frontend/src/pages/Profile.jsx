/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProfileOrders from "../components/ProfileOrders";
import UpdateForm from "../components/UpdateForm";
import { UserContext } from "../context/UserContext";
import { URL } from "../url";

const Profile = () => {
  const param = useParams().id;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  const itemsPerPage = 7;
  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const fetchProfile = async () => {
    try {
      const res = await axios.get(URL + "/userAPI/Customer/" + user._id);
      setFirstName(res.data.firstName);
      setLastName(res.data.lastName);
      setEmail(res.data.email);
      //setPassword(res.data.password)
    } catch (err) {
      console.log(err);
    }
  };

  const handleUserUpdate = async (updatedFirstName, updatedLastName, updatedPassword) => {
    setUpdated(false);
    try {
      console.log(updatedFirstName, updatedLastName, email);
      const res = await axios.put(
        URL + `/userAPI/Customer/${user._id}`,
        { firstName: updatedFirstName, lastName: updatedLastName, email, password: updatedPassword },
        { withCredentials: true }
      );
      console.log(res.data);
      setUpdated(true);
    } catch (err) {
      console.log(err);
      setUpdated(false);
    }
  };

  const handleUserDelete = async () => {
    try {
      const res = await axios.delete(
        URL + "/userAPI/Customer/" + user._id,
        { withCredentials: true }
      );
      console.log(res);
      setUser(null);
      navigate("/");
      // console.log(res.data)
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUserOrders = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/userAPI/Customer/getOrders/" + user._id
      );
      console.log(res.data);
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [param]);

  useEffect(() => {
    fetchUserOrders();
  }, [param]);

  return (
    <div>
      <Navbar />
      <div className="min-h-[80vh] px-8 md:px-[200px] mt-8 flex md:flex-row flex-col-reverse md:items-start items-start">
        <div className="flex flex-col md:w-[70%] w-full mt-8 md:mt-0">
          <h1 className="text-xl font-bold mb-4">Due Orders:</h1>
          {currentOrders.length === 0 ? (
            <p className="text-2xl font-bold text-times-new-roman">
              You do not have any Unpaid Orders
            </p>
          ) : (
            <>
              {currentOrders.map((order) => (
                <ProfileOrders key={order._id} order={order} />
              ))}
              <div className="flex justify-center mt-4">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => paginate(i + 1)}
                    className={`mx-1 px-3 py-1 bg-gray-200 hover:bg-gray-300 ${
                      currentPage === i + 1 && "bg-gray-400"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="md:sticky md:top-12  flex justify-start md:justify-end items-start md:w-[30%] w-full md:items-end ">
          <div className=" flex flex-col space-y-4 items-start bg-zinc-100 p-6 rounded">
            <h1 className="text-xl font-bold mb-6">Profile</h1>
            <p className="text-base font-times-new-roman text-black mb-4 font-bold position-relative">
            {firstName} {lastName} 
            </p>
            <p className="text-base font-times-new-roman text-black mb-2 font-bold position-relative">
             {email}
            </p>
            <p> </p>
            <div className="flex items-center space-x-4 mt-8">
              <button
                onClick={() => setIsUpdateFormVisible(true)}
                className="text-white text-sm font-semibold bg-black px-2 py-1 hover:text-black hover:bg-gray-400 rounded"
              >
                Update
              </button>
              <button
                onClick={handleUserDelete}
                className="text-white text-sm font-semibold bg-black px-2 py-1 hover:text-black hover:bg-gray-400 rounded"
              >
                Delete
              </button>
            </div>
            {updated && (
              <h3 className="text-green-500 text-sm text-center mt-4">
                User updated successfully!
              </h3>
            )}
          </div>
        </div>
        {isUpdateFormVisible && (
          <UpdateForm
            handleClose={() => setIsUpdateFormVisible(false)}
            handleConfirmUpdate={handleUserUpdate}
            // Pass other necessary props to the UpdateForm component
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
