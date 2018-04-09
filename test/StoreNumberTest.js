import _ from 'lodash' // importing extend library from javascript
import { expect } from 'chai'   // importing mocha chai library for unit testing 
import { web3 } from './helpers/w3' // importing w3 script from helpers to import w3 functions
import expectRevert from './helpers/expectRevert'   


const accounts = web3.eth.accounts  

const KeyValueStorage = artifacts.require("KeyValueStorage"); //eternal storage contract
const NumberLogicV1 = artifacts.require("NumberLogicV1"); //Implementation v1
const NumberLogicV2 = artifacts.require("NumberLogicV2"); //Implementation v2
const StoreNumber = artifacts.require("StoreNumber");   //Interface of the contract

describe('Testing store Number upgradability', async ()=>{
    
    it('should create an upgrade storeNumber implemntations',async()=>{
        const keyValueStorage = await KeyValueStorage.new()
        const numberLogicV1  = await NumberLogicV1.new()

        //deploying an instance of Store Number contract 
        let storeNumber = await StoreNumber.new(keyValueStorage.address)
        console.log('KeyValueStorage.address',KeyValueStorage.address);
        //Sets the storeNumber's proxy to NumberLogicV1 which is the first implentation
        await storeNumber.upgradeTo(numberLogicV1.address)
        
        //checking whether the v1 address is set
        console.log('numberLogicV1',numberLogicV1.address)
        console.log(await storeNumber.implementation.call())
        expect(await storeNumber.implementation.call()).to.equal(numberLogicV1.address);

        //extends truffle object to include NumberLogicV1 functions, which 
        // will now be excecuted via proxy
        storeNumber = _.extend(storeNumber,NumberLogicV1.at(storeNumber.address))

        //Testing NumberLogicV1 contract
        await storeNumber.setNumber(5)
         
        //deploys the NumberLogicV2
        const numberLogicV2 = await NumberLogicV2.new()
        
        //Sets the storeNumber's Proxy to NumberLogicV2 which is the sencond implementation
        await storeNumber.upgradeTo(numberLogicV2.address)

        //extends the truffle object to include the NumberLogicV2 functions, which
        //will now be excecuted via proxy
        storeNumber = _.extend(storeNumber,NumberLogicV2.at(storeNumber.address))

        //Testing the NumberLogicV2
        var number = await storeNumber.getNumber.call()
       expect(number.toNumber()).to.equal(100)


    })

})