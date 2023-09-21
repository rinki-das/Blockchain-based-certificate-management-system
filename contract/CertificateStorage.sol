
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract CertificateStorage {
    address public owner;
    mapping(address => string) public certificateHashes;

    constructor() {
        owner = msg.sender;
    }

    function storeCertificateHash(string memory hash) public {
        require(msg.sender == owner, "Only the contract owner can store hashes.");
        certificateHashes[msg.sender] = hash;
    }

    function getCertificateHash() public view returns (string memory) {
        return certificateHashes[msg.sender];
    }
}
