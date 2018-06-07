const KeyValueStorage = artifacts.require("KeyValueStorage"); //eternal storage contract
const NumberLogicV1 = artifacts.require("NumberLogicV1"); //Implementation 
const StoreNumber = artifacts.require("StoreNumber");   //Proxy contract
const TestContract = artifacts.require("./TestContract"); //Testcontract to deploy the proxy style


contract('Testing Deploymemnt via contract', function() {

    let keyValueStorage;
    let testContract;
    let luckyNumber=20;
    let impl;
    let proxy;
    let proxyInstance;
    let implInstance;

    before('Deploying Storage',async function(){
        keyValueStorage = await KeyValueStorage.new();
        console.log("Storage", keyValueStorage.address);
    })

    //TEST CASE 1
    it("Deploying the test contract",async function(){
        testContract = await  TestContract.new();  
        console.log("Test contract address", testContract.address);

        //Deploying the StoreNumber contract in proxy style via a function in testcontract
        //In this step we can the luckNumber number is set in the NumberLogicV1 constructor
        await  testContract.deployMe(keyValueStorage.address,luckyNumber); 
        
        //getting the address of the deployed proxy to access the storeNumber contract and its implementation
        proxy = await  testContract.getImpl(keyValueStorage.address);
        console.log("THis is the implementation of storeNumber",proxy);

        //Create an instance for StoreNumber/Proxy contract by using its address
        proxyInstance = await StoreNumber.at(proxy);

        //Copy NumberLogic functions to ProxyInsantce
        proxyInstance = _.extend(proxyInstance,NumberLogicV1.at(proxy))

        //getting the stored number which was set during deployment
        let result = await proxyInstance.getNumber.call(keyValueStorage.address);

        //Now the result should be our lucky number 
        console.log("Lucky number which was set ", result.toNumber());


    })

    //TEST CASE 2
    it("Directly get the stored number from the address which was implemented in Proxy", async function(){

        // this will return the proxy implementation address which was upgraded in TestContract while deploying
        
        impl = await proxyInstance.implementation.call();
        implInstance = await NumberLogicV1.at(impl)
        let result = await implInstance.getNumber.call(keyValueStorage.address)
        console.log("Lucky number", result.toNumber())
        console.log("This means that Deployment in test contract works fine, and the value is also set in the constructor so that I am able to get the value here");
        

        
    })

})