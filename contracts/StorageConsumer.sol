pragma solidity ^0.4.18;

import "./KeyValueStorage.sol";
import "./StorageStateful.sol";

contract StorageConsumer is StorageStateful {
  constructor(KeyValueStorage storage_) public {
    _storage = storage_;
  }
}
