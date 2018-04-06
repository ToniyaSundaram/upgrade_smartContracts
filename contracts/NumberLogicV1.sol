pragma solidity ^0.4.0;

import "./StorageStateful.sol";

contract NumberLogicV1 is StorageStateful{
    
    function setNumber(uint _number) {
        _storage.setUint("MyNumber", _number);
        
    }
    
    // function getNumber()public returns(uint){
    //     return _storage.getUint("MyNumber");
    // }
}
