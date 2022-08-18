import './App.css';
import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
require("dotenv").config();
const API_KEY = 'tobeadded';

const axios = require('axios');


function App() {

  
  const requestParams = {
    currency: 'USDC',
    // 100 USDC
    expectedAmount: '100000000',
    payment: {
      type: 'erc20-proxy-contract',
      value: '0x4E64C2d06d19D13061e62E291b2C4e9fe5679b93',
    },
  };

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchResult = async () => {
      const result = await axios.get('https://api.request.network/requests/', {
        headers: { Authorization: API_KEY },
      });
      console.log(result);
      setRequests(result.data);
    };
    fetchResult();
  }, []);

  async function createRequest() {
    
      const request = await axios.post('https://api.request.network/requests', requestParams, {
        headers: { Authorization: API_KEY },
      });
  
      if (request.data?.requestId) {
        console.log(request.data);
        console.log(`https://pay.request.network/${request.data.requestId}`);
      } else {
        console.log(`Error, something went wrong fetching the requestId.`);
      }
    } 

  
  

  
  return (
    <>
    <div className="App">
      Try Request API
    </div>
    <br />
    <div className="requestButton">
      <button onClick={createRequest}>Create request</button>

    </div>
    <div>
    <h2>The most basic list of payment requests</h2>
      <ul>
        {requests.map((request) => {
          return (
            <li key={request.requestId}>
              {request.requestInput.expectedAmount} {request.requestInput.currency}
            </li>
          );
        })}
      </ul>
    </div>


    </>
  );
}

export default App;
