var Web3 = require('web3');
//var web3 = new Web3(new Web3.providers.WebsocketProvider('ws://host.docker.internal:8545'));
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
//var web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8545'));
const ABI = require("./abi.js");
const EVM = require("./evm.js");
const NODE = "0x627306090abaB3A6e1400e9345bC60c78a8BEf57"


function addEvent(__address, __timestamp, __user, __type, __metadata) {
	const statusCode = new Promise((resolve, reject) => {
		var DataObject = new web3.eth.Contract(ABI.DataObject, __address, { from: NODE });
		DataObject.methods.addEvent(__timestamp, __user, __type, __metadata).send()
			.then((response) => {
				console.log('EVENT OK')
				console.log(response)
				resolve(response)
			})
			.catch((error) => {
				console.log('Error in Event')
				console.log(error)
				resolve('Error')
			})
	})
	return statusCode;
}

function deployNewContract(mongoID) {

	const statusCode = new Promise((resolve, reject) => {
		var DataObject = new web3.eth.Contract(ABI.DataObject);
		var entPromise = DataObject.deploy({
			data: '0x' + EVM.DataObject["object"],
			arguments: [mongoID]
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

//deployNewContract("10293");
addEvent("0x8CdaF0CD259887258Bc13a92C0a6dA92698644C0", 12, "Sergi", 1, "METADATA")