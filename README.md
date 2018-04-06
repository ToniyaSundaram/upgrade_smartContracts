# upgrade_smartContracts
A very simple example to upgrade smart contracts without losing the old states. 

This example uses proxy delegate calls to upgrade smart contracts.  For Example. If we contractV1 which is upgraded to contractV2, both the contracts need to define the same memory storage. Proxy will have the address of the implementation contract (i.e the address of the contract which is implemented currently). 

We will use interfaces to decouple inter contract communication say StorageConsumer.sol and StorageStateful.sol. 

# KeyValueStorage.sol [Eternal Storage] 
A persistent and common storage to store the states, which is common for all versions of contract. This contract contains the getters and setters based on the key value architechture. 

# Ownable.sol
This is a contract which updates the owner of the contract. 

# Proxy.sol
This contract doesnot have any idea of the implementation. It will proxy the trasaction using the delegatecall mechanism. This contract has the address of the implemented contract. It uses assembly code to implement delegatecall in fallback. Proxy is a ownable contract which restricts its usage only by its owner.

Using upgradeTo() funciton we can update the address of the currently implemented contract. 

# StoreNumber.sol
This contract acts as an interface to Proxy and user to call the functions. This contract is the only contract which is exposed to the user. 

# NumberLogicV1.sol
This is contractV1 where it sets a number and gets a number. 

# NumberLogicV2.sol
While upgrading our contract, before setting a number we mulitply the number by 20. 

# StorageConsumer.sol
Sets the eternal storage variable to the constructor. 

# StorageStateful.sol
This contract has the global variable for the eternal Storage. 

References:
https://medium.com/rocket-pool/upgradable-solidity-contract-design-54789205276d
https://blog.colony.io/writing-upgradeable-contracts-in-solidity-6743f0eecc88
