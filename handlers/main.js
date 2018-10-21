const ABI = require("./abi.js");
const EVM = require("./evm.js");

class BlockchainEvents {

	constructor() {
		var Web3 = require('web3');
		this.web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
		this.coinbase = "0x627306090abaB3A6e1400e9345bC60c78a8BEf57";
	}

	addEvent(__address, __timestamp, __user, __type, __metadata) {
		const statusCode = new Promise((resolve, reject) => {
			var Log = new this.web3.eth.Contract(ABI.Log)
			var entPromise = Log.deploy({
				data: '0x' + EVM.Log["object"],
				arguments: [__type, __timestamp, __user, __metadata]
			}).send({
				from: this.coinbase,
				gas: 12000000,
			})
				.then((receipt) => {
					console.log('New Log Address', receipt['_address'])
					var DataObject = new this.web3.eth.Contract(ABI.DataObject, __address, { from: this.coinbase });
					DataObject.methods.addEvent(receipt['_address']).send()
						.then((response) => {
							console.log('EVENT OK')
							resolve(receipt['_address'])
						})
						.catch((error) => {
							console.log('Error in Event')
							console.log(error)
							resolve('Error')
						})

				})
				.catch((error) => {
					console.log(error)
					resolve(error)
				})

		})
		return statusCode;
	}

	deployNewContract(mongoID) {
		const statusCode = new Promise((resolve, reject) => {
			var DataObject = new this.web3.eth.Contract(ABI.DataObject);
			var entPromise = DataObject.deploy({
				data: '0x' + EVM.DataObject["object"],
				arguments: [mongoID]
			}).send({
				from: this.coinbase,
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

	getLogList(__address) {
		const statusCode = new Promise((resolve, reject) => {
			var DataObject = new this.web3.eth.Contract(ABI.DataObject, __address, { from: this.coinbase });
			DataObject.methods.getLogList().call()
				.then((response) => {
					console.log('EVENT OK in getLogList')
					console.log(response)
					resolve(response)
				})
				.catch((error) => {
					console.log('Error in Event')
					console.log(error)
					resolve(error)
				})
		})
		return statusCode;
	}

	getLogData(logAddress) {
		const statusCode = new Promise((resolve, reject) => {
			var logContract = new this.web3.eth.Contract(ABI.Log, logAddress, { from: this.coinbase });
			logContract.methods.getUser.call()
				.then((user) => {
					console.log(user)
				})
		})
		return statusCode;
	}
}

const blockchainEvents = new BlockchainEvents();

module.exports = blockchainEvents;