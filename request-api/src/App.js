import logo from './logo.svg';
import './App.css';
import React from 'react';

const axios = require('axios');

function App() {

  

  const API_KEY = '5ZXE1WC-EC44GW8-Q8RYHXG-HX4R2BS';
  const requestParams = {
    currency: 'USDC',
    // 100 USDC
    expectedAmount: '100000000',
    payment: {
      type: 'erc20-proxy-contract',
      value: '0x4E64C2d06d19D13061e62E291b2C4e9fe5679b93',
    },
  };

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


    </>
  );
}

export default App;
