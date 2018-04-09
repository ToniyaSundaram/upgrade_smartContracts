pragma solidity ^0.4.0;

import "./StorageStateful.sol";

contract NumberLogicV1 is StorageStateful{
    
    function setNumber(uint _number) public {
        _storage.setUint("MyNumber", 20*_number);        
    }
    
}
