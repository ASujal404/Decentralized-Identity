// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title DIDRegistry
 * @dev A smart contract for managing Decentralized Identities (DIDs)
 * @author Sujal Belkhode
 */
contract DIDRegistry {
    
    struct DIDRecord {
        string name;
        string email;
        string did;
        uint256 timestamp;
        bool exists;
    }
    
    // Mapping from address to DID record
    mapping(address => DIDRecord) private didRecords;
    
    // Mapping from DID to address (for reverse lookup)
    mapping(string => address) private didToAddress;
    
    // Array to store all registered addresses
    address[] public registeredAddresses;
    
    // Events
    event DIDRegistered(address indexed user, string did, uint256 timestamp);
    event DIDUpdated(address indexed user, string did, uint256 timestamp);
    
    /**
     * @dev Register a new DID for the caller
     * @param _name User's full name
     * @param _email User's email address
     * @param _did Generated DID string
     */
    function registerDID(
        string memory _name,
        string memory _email,
        string memory _did
    ) public {
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(bytes(_email).length > 0, "Email cannot be empty");
        require(bytes(_did).length > 0, "DID cannot be empty");
        require(didToAddress[_did] == address(0), "DID already exists");
        
        // If user already has a DID, remove the old mapping
        if (didRecords[msg.sender].exists) {
            delete didToAddress[didRecords[msg.sender].did];
        } else {
            // Add to registered addresses array if new user
            registeredAddresses.push(msg.sender);
        }
        
        // Create new DID record
        didRecords[msg.sender] = DIDRecord({
            name: _name,
            email: _email,
            did: _did,
            timestamp: block.timestamp,
            exists: true
        });
        
        // Create reverse mapping
        didToAddress[_did] = msg.sender;
        
        emit DIDRegistered(msg.sender, _did, block.timestamp);
    }
    
    /**
     * @dev Get DID record for the caller
     * @return DIDRecord struct containing user's information
     */
    function getMyDID() public view returns (DIDRecord memory) {
        require(didRecords[msg.sender].exists, "DID not found");
        return didRecords[msg.sender];
    }
    
    /**
     * @dev Get DID record for a specific address
     * @param _address Address to lookup
     * @return DIDRecord struct containing user's information
     */
    function getDIDByAddress(address _address) public view returns (DIDRecord memory) {
        require(didRecords[_address].exists, "DID not found");
        return didRecords[_address];
    }
    
    /**
     * @dev Get address associated with a DID
     * @param _did DID string to lookup
     * @return address associated with the DID
     */
    function getAddressByDID(string memory _did) public view returns (address) {
        address userAddress = didToAddress[_did];
        require(userAddress != address(0), "DID not found");
        return userAddress;
    }
    
    /**
     * @dev Check if an address has a registered DID
     * @param _address Address to check
     * @return bool indicating if DID exists
     */
    function hasDID(address _address) public view returns (bool) {
        return didRecords[_address].exists;
    }
    
    /**
     * @dev Get total number of registered DIDs
     * @return uint256 count of registered DIDs
     */
    function getTotalDIDs() public view returns (uint256) {
        return registeredAddresses.length;
    }
    
    /**
     * @dev Get all registered addresses (for admin purposes)
     * @return address[] array of all registered addresses
     */
    function getAllRegisteredAddresses() public view returns (address[] memory) {
        return registeredAddresses;
    }
}