// Update counter for GitHub pages.
console.log('Update: 13'); 

// Ethereum wallet public address.
let account = null;

// Address of the smart contract.
contractAddress = "0xacB241f59E1a8c7A61f0781aed7Ad067269feb26";

// Button to prompt user to enable metamask.
document.getElementById('enableMetamask').onclick = function() { 
	// NOTE: Should I check for MetaMask or is ethereum enough?
	if (!hasMetamask()) {
	  	window.alert("Error: MetaMask not detected. Please install MetaMask.");
	  	// TO DO: Create a function to run the page without metamask.
	} else {
		enableMetamask();
		// NOTE: Switch user to Rovan network.
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
	const methodHash = '0xfcc74f71';
	const data = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaccbb9';
	const txHash = await ethereum.request({
	  	method: 'eth_sendTransaction',
	  	params: [{
		  	to: '0xacb241f59e1a8c7a61f0781aed7ad067269feb26',
		  	from: account,
		  	data: methodHash + data,
		}],
	});

	console.log(txHash);
}

document.getElementById('readData').onclick = function() {
	readData();
}

async function readData() {
	const data = await ethereum.request({
	  	method: 'eth_getStorageAt',
	  	params: [ '0xacb241f59e1a8c7a61f0781aed7ad067269feb26', '0x0' ],
	})
	
	console.log(data);
}
