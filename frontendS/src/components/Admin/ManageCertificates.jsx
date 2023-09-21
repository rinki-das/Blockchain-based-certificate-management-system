import React, { useState } from 'react';
import axios from 'axios';
import { create as ipfsHttpClient } from 'ipfs-http-client';
import './ManageCertificates.css';

const client = ipfsHttpClient('https://ipfs.io/ipfs/'); // Use a public IPFS gateway

function Manage() {
  const [file, setFile] = useState(null);
  const [ipfsHash, setIpfsHash] = useState(''); // State to store the IPFS hash

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    try {
      const apiKey = '95674e07f54f9891745c';
      const apiSecret = '4d2ce731c8fcb8754acac8cfbd4bda5a4ac431de110c3fdb2b315715ddaaef56';

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
      setIpfsHash(response.data.IpfsHash);

      alert('File uploaded successfully to IPFS!');
    } catch (error) {
      console.error('Error uploading to Pinata:', error);
      alert('Error uploading to Pinata. Please try again later.');
    }
  };

  return (
    <div className="certi">
      <h1>Upload File to IPFS</h1>
      <label htmlFor="fileInput">Select a file (Image or PDF)</label>
      <input
        type="file"
        id="fileInput"
        accept=".jpg, .jpeg, .png, .gif, .pdf"
        onChange={handleFileChange}
      />
      <button onClick={handleUpload}>Upload to IPFS</button>

      {/* Display the IPFS hash if available */}
      {ipfsHash && (
        <div>
          <p>IPFS Hash:</p>
          <a href={`https://ipfs.io/ipfs/${ipfsHash}`} target="_blank" rel="noopener noreferrer">
            {ipfsHash}
          </a>
        </div>
      )}
    </div>
  );
}

export default Manage;
