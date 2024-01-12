//import React from 'react'
import 
{ BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill}
 from 'react-icons/bs'
 import 
 { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } 
 from 'recharts';
  import { useEffect, useState } from 'react';

function Home() {
  const [approvedSellersCount, setApprovedSellersCount] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Fetch the data for approved sellers and update the count
    fetch('http://localhost:5000/api/data/insert-data')
      .then((response) => response.json())
      .then((data) => {
        setCount(data.length);
        const filteredSellers = data.filter((seller) => seller.status === 'active');
        setApprovedSellersCount(filteredSellers.length);
      })
      .catch((error) => console.error('Error fetching approved sellers:', error));
  }, []); // Empty dependency array to run the effect only once on mount

  const profitData = [
    {
      name: 'January',
      Revenue: 5000,  
      Profit: 3000,  
      
    },
    {
      name: 'February',
      Revenue: 6000,  
      Profit: 3400,  
    },
    {
      name: 'March',
      Revenue: 4000,  
      Profit: 3100,  
    },
    {
      name: 'April',
      Revenue: 6200,  
      Profit: 4200,  
    },
    {
      name: 'May',
      Revenue: 8000,  
      Profit: 6300,  
    },
    {
      name: 'June',
      Revenue: 7100,  
      Profit: 5200,  
    },
  
    // Add more data points for other months or time periods
  ];
  
     

  return (
    <main className='main-container'>
        <div className='main-title'>
            <h1>DASHBOARD</h1>
        </div>

        <div className='main-cards'>
            <div className='card' style={{backgroundColor:"#2962ff"}}>
                <div className='card-inner'>
                    <h3>ORGANIZERS</h3>
                    <BsFillArchiveFill className='card_icon'/>
                </div>
                <h1>{approvedSellersCount}</h1>
            </div>
            <div className='card' style={{backgroundColor:"#c9b540"}}>
                <div className='card-inner'>
                    <h3>UPCOMING-EVENTS</h3>
                    <BsFillGrid3X3GapFill className='card_icon'/>
                </div>
                <h1>32</h1>
            </div>
            <div className='card' style={{backgroundColor:"#2e7d32"}}>
                <div className='card-inner'>
                    <h3>CUSTOMERS</h3>
                    <BsPeopleFill className='card_icon'/>
                </div>
                <h1>212</h1>
            </div>
            <div className='card' style={{backgroundColor:"#460404"}}>
                <div className='card-inner'>
                    <h3>PENDING REQUESTS</h3>
                    <BsFillBellFill className='card_icon'/>
                </div>
                <h1>{count}</h1>
            </div>
        </div>

        <div className='charts'>
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={profitData} // Use your profit data here
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                
                <Bar dataKey="Revenue" fill="#82ca9d" />
                <Bar dataKey="Profit" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>

            
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  width={500}
                  height={300}
                  data={profitData} // Use your profit data here
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Profit" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Revenue" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>

        </div>
    </main>
  )
}

export default Home