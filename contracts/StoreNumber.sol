pragma solidity ^0.4.0;
import "./KeyValueStorage.sol";
import "./StorageConsumer.sol";
import "./Proxy.sol";

contract StoreNumber is StorageConsumer, Proxy {
    constructor(KeyValueStorage storage_)
    public
    StorageConsumer(storage_)
    {
        storage_.setAddress("owner",msg.sender);
    }
}