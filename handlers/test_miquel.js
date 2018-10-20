var Web3 = require('web3');
//var web3 = new Web3(new Web3.providers.WebsocketProvider('ws://host.docker.internal:8545'));
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
const ABI = require("./abi.js");
const EVM = require("./evm.js");
const NODE = "0x627306090abaB3A6e1400e9345bC60c78a8BEf57"

function deployNewContract(){
	const statusCode = new Promise((resolve, reject)=>{ 
		var DataObject = new web3.eth.Contract(ABI.DataObject);
		var entPromise = DataObject.deploy({
			data: '0x'+EVM.DataObject["object"]
		}).send({
			from: NODE,
			gas: 12000000, 
		})
		.then((receipt) => {
			console.log('New DataObject Address', receipt['_address'])
			resolve(receipt['_address'])
		})
		.catch((error) => {
			console.log('Error deploying new DataObject', error)
			resolve(error)
		})
	})
	return statusCode;
}

deployNewContract();
