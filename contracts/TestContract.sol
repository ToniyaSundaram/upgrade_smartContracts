pragma solidity ^0.4.24;
import "./KeyValueStorage.sol";
import "./NumberLogicV1.sol";
import "./StoreNumber.sol";

contract TestContract {
    
    function deployMe(KeyValueStorage _storage,uint _num) public{
        NumberLogicV1 num = new NumberLogicV1(_storage,_num);
        StoreNumber proxy = new StoreNumber(_storage);
        proxy.upgradeTo(num);
        setImpl(_storage,proxy);
    }

    function setImpl(KeyValueStorage _storage, StoreNumber proxy) internal {
        _storage.setAddress(keccak256("impl"),proxy);
    }

    function getImpl(KeyValueStorage _storage) public view returns(address){
        return _storage.getAddress(keccak256("impl"));    
    }
}