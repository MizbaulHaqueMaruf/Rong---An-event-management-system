import React from 'react'
import Card from './Card'
import cardImage from './img/img1.png';
import cardImage2 from './img/img2.png'
function RequestPage() {

   
  return (
    <div >
        <h1 style={{color:'1d2634', padding:"20px"}}>PENDING EVENT REQUESTS</h1>
        <div className="main-cards">


      <Card
        title="Banglalink Ennovators"
        description="Join us for an exciting adventure in the heart of the city! Our upcoming event, 'City Explorer,' will take you on a journey through historic landmarks!"
        buttonText="Accept"
        link="/new-card-1"
        imgSrc={cardImage}
        imgAlt="Image 1"
      />

<Card
        title="SIH Hackathon"
        description="Join us for an exciting adventure in the heart of the city! Our upcoming event, 'City Explorer,' will take you on a journey through historic landmarks!"
        buttonText="Accept"
        link="/new-card-1"
        imgSrc={cardImage2}
        imgAlt="Image 1"
      />
      


      {/* Add more Card components as needed */}
    </div>
    </div>
  )
}

export default RequestPage