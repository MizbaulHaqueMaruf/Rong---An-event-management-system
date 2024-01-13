import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BeatLoader } from 'react-spinners';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Success = () => {
  const params = useParams().id;
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Transaction ID is:", params);

    fetch(`http://localhost:5000/ticketAPI/ticket/createPDF/${params}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        fetch('http://localhost:5000/ticketAPI/ticket/sendEmail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then(() => {
            
          })
          .catch((error) => console.error('Error in the second backend route:', error));
      })
      .catch((error) => console.error("Sending Ticket:", error))
      .finally(() => {
          setSuccess(true);
          alert('Ticket sent successfully');
          navigate('/');
      });
  }, [params, success, navigate]);

  return (
    <div style={{ textAlign: 'center'}}>
      <Navbar />
      {!success &&(
      <div style={{ fontSize: '40px', fontWeight: 'bold', color: 'black', marginBottom: '150px' , marginTop: '50px' }}>
        Sending Ticket to Your Mail...
        <BeatLoader color="#000" size={30} />
      </div>
      )}
      {success &&(
          <div style={{ fontSize: '40px', fontWeight: 'bold', color: 'black', marginBottom: '150px' , marginTop: '50px' }}>
          Mail Has Sent
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Success;
