import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { create as ipfsHttpClient } from 'ipfs-http-client';
import Web3 from 'web3'; // Import web3.js
import './ManageCertificates.css'; // Change the CSS file name

const client = ipfsHttpClient('https://ipfs.io/ipfs/'); // Use a public IPFS gateway

// Define your contract ABI and address
const contractABI = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_hash",
        "type": "string"
      }
    ],
    "name": "setIPFSHash",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "ipfsHash",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];
const contractAddress = '0x17ec65F3D701ff70E54eC31DBc9EF420A9eC9A64'; // Replace with your contract's address

function MyFileUploader() {
  const [file, setFile] = useState(null);
  const [ipfsHash, setIpfsHash] = useState('');
  const [ethHash, setEthHash] = useState('');
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    // Check if MetaMask is installed and connected
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
    } else {
      console.error('MetaMask is not installed. Please install it to use this app.');
    }
  }, []);

  const loadEthHash = async () => {
    try {
      const contract = new web3.eth.Contract(contractABI, contractAddress);
      const ethHash = await contract.methods.ipfsHash().call();
      setEthHash(ethHash);
    } catch (error) {
      console.error('Error loading Ethereum hash:', error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    try {
      const apiKey = '95674e07f54f9891745c'; // Replace with your Pinata API key
      const apiSecret = '4d2ce731c8fcb8754acac8cfbd4bda5a4ac431de110c3fdb2b315715ddaaef56'; // Replace with your Pinata API secret

      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(
        'https://api.pinata.cloud/pinning/pinFileToIPFS',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'pinata_api_key': apiKey,
            'pinata_secret_api_key': apiSecret,
          },
        }
      );

      // Update the state with the IPFS hash
      const ipfsHash = response.data.IpfsHash;
      setIpfsHash(ipfsHash);

      // Store the IPFS hash on the Ethereum blockchain
      const accounts = await web3.eth.getAccounts();
      const contract = new web3.eth.Contract(contractABI, contractAddress);
      await contract.methods.setIPFSHash(ipfsHash).send({
        from: accounts[0],
      });

      alert('File uploaded successfully to IPFS and stored on Ethereum!');
    } catch (error) {
      console.error('Error:', error);
      alert('Error uploading to IPFS or storing on Ethereum. Please try again later.');
    }
  };

  const connectToMetaMask = async () => {
    try {
      // Request MetaMask to connect
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      alert('Connected to MetaMask!');
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
    }
  };

  return (
    <div className="MyFileUploader">
      <h1>Upload File to IPFS and Ethereum</h1>

      <button onClick={connectToMetaMask}>Connect to MetaMask</button>

      <label htmlFor="fileInput">Select a file (Image or PDF)</label>
      <input
        type="file"
        id="fileInput"
        accept=".jpg, .jpeg, .png, .gif, .pdf"
        onChange={handleFileChange}
      />
      <button onClick={handleUpload}>Upload to IPFS and Ethereum</button>

      {/* Display the IPFS and Ethereum hashes */}
      {ipfsHash && (
        <div>
          <p>IPFS Hash:</p>
          <a href={`https://ipfs.io/ipfs/${ipfsHash}`} target="_blank" rel="noopener noreferrer">
            {ipfsHash}
          </a>
        </div>
      )}

      {ethHash && (
        <div>
          <p>Ethereum Hash:</p>
          <span>{ethHash}</span>
        </div>
      )}
    </div>
  );
}

export default MyFileUploader;

