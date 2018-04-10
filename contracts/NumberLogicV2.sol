pragma solidity ^0.4.0;

import "./StorageStateful.sol";

contract NumberLogicV2 is StorageStateful{
    function getNumber()public returns(uint){
        return _storage.getUint("MyNumber");
    }
}
