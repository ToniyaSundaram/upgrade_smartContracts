pragma solidity ^0.4.0;

import "./StorageStateful.sol";

contract NumberLogicV2 is StorageStateful{
    uint number;
    function setNumber(uint _number) {
        _number = 20*_number;
        _storage.setUint("MyNumber", _number);        
    }
    
    function getNumber()public returns(uint){
        return _storage.getUint("MyNumber");
    }
}
