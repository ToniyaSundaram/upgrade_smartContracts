var KeyValueStorage = artifacts.require("./KeyValueStorage.sol");
var StoreNumber = artifacts.require("./StoreNumber.sol");
var NumberLogicV1 = artifacts.require("./NumberLogicV1.sol");


module.exports = function(deployer) {

  deployer.deploy(NumberLogicV1);
//   deployer.deploy(KeyValueStorage);
//   deployer.deploy(StoreNumber,KeyValueStorage.address).then(function(){
//     StoreNumber.deployed().then(function(sn){
//         console.log(sn.address);
//         sn.upgradeTo(NumberLogicV1.address).then(function(res){
//         console.log(res);
//         })
//     }) 
// });
};
