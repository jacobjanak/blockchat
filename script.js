// Update counter for GitHub pages.
console.log('Update: 5'); 

// Ethereum wallet public address.
let account = null;

// Address of the smart contract.
contractAddress = "0xacB241f59E1a8c7A61f0781aed7Ad067269feb26";

// ABI of the smart contract.
const abi = [
	{
		"inputs": [],
		"name": "getText",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "t",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "t",
				"type": "bytes32"
			}
		],
		"name": "setText",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "text",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

// Button to prompt user to enable metamask.
document.getElementById('enableMetamask').onclick = function() { 
	if (!hasMetamask()) {
	  	window.alert("Error: MetaMask not detected. Please install MetaMask.");
	  	// TO DO: create a function to run the page without metamask.
	} else {
		enableMetamask();
	}
}

// Check if user has any Ethereum wallet extension.
function hasEthereum () {
	return typeof window.ethereum !== 'undefined';
}

// Check if user has MetaMask installed.
function hasMetamask () {
	return hasEthereum() ? ethereum.isMetaMask : false;
}

// Prompt user to enable MetaMask through the extension.
async function enableMetamask() {
	const accounts = await ethereum.request({
		method: 'eth_requestAccounts'
	});
	account = accounts[0];
	console.log(account);
}

document.getElementById('sendTransaction').onclick = function() {
	sendTransaction();
}

async function sendTransaction() {

	const transactionParameters = {
	  	to: '0xacb241f59e1a8c7a61f0781aed7ad067269feb26',
	  	from: account,
	  	data: '0xfcc74f71aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaccbbb',
	};

	console.log(transactionParameters);

	// txHash is a hex string
	// As with any RPC call, it may throw an error
	const txHash = await ethereum.request({
	  	method: 'eth_sendTransaction',
	  	params: [ transactionParameters ],
	});
	
	console.log(txHash);
}

document.getElementById('readData').onclick = function() {
	readData();
}

async function readData() {

	const transactionParameters = {
	  	to: '0xacb241f59e1a8c7a61f0781aed7ad067269feb26',
	  	from: account,
	  	data: '0xe00fe2eb',
	};

	console.log(transactionParameters);

	// txHash is a hex string
	// As with any RPC call, it may throw an error
	ethereum.request({
	  	method: 'eth_sendTransaction',
	  	params: [ transactionParameters ],
	})
	.then((result) => {
		console.log(result)
	})
	.catch((error) => {
		console.log("Error")
		console.log(error)
	})
	
	console.log(txHash);
}
