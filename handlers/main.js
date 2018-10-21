var Web3 = require('web3');
//var web3 = new Web3(new Web3.providers.WebsocketProvider('ws://host.docker.internal:8545'));
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
//var web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8545'));
const ABI = require("./abi.js");
const EVM = require("./evm.js");


function addEvent(__address, __timestamp, __user, __type, __metadata) {
	const statusCode = new Promise((resolve, reject) => {
		var accounts = web3.eth.getAccounts()
			.then((accountlist) => {
				var Log = new web3.eth.Contract(ABI.Log)
				var entPromise = Log.deploy({
					data: '0x' + EVM.Log["object"],
					arguments: [__type, __timestamp, __user, __metadata]
				}).send({
					from: accountlist[0],
					gas: 12000000,
				})
					.then((receipt) => {
						console.log('New Log Address', receipt['_address'])
						var DataObject = new web3.eth.Contract(ABI.DataObject, __address, { from: accountlist[0] });
						DataObject.methods.addEvent(receipt['_address']).send()
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
						resolve(receipt['_address'])

					})
					.catch((error) => {
						console.log(error)
						resolve(error)
					})
			})
			.catch((error) => {
				console.log("Coinbase undefined")
				resolve(error)
			})

	})
	return statusCode;
}

function deployNewContract(mongoID) {

	const statusCode = new Promise((resolve, reject) => {
		var accounts = web3.eth.getAccounts()
			.then((accountlist) => {
				var DataObject = new web3.eth.Contract(ABI.DataObject);
				var entPromise = DataObject.deploy({
					data: '0x' + EVM.DataObject["object"],
					arguments: [mongoID]
				}).send({
					from: accountlist[0],
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
			.catch((error) => {
				console.log("Coinbase undefined")
				resolve(error)
			})

	})
	return statusCode;
}

//deployNewContract("12345465");
addEvent("0x8CdaF0CD259887258Bc13a92C0a6dA92698644C0", 12, "Sergi", 1, "METADATA")