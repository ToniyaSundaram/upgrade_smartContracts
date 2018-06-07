pragma solidity ^0.4.0;

import "./KeyValueStorage.sol";
import "./StorageStateful.sol";

contract NumberLogicV1 is StorageStateful{
    
    constructor(KeyValueStorage _storage,uint _number) public {
        _storage.setUint(keccak256("MyNumber"), 20*_number);        
    }
    
    function getNumber(KeyValueStorage _storage)public view returns(uint){
        return _storage.getUint(keccak256("MyNumber"));
    }
    
}
