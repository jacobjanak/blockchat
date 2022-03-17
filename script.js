// Update counter for GitHub pages.
console.log('Update: 16'); 

// DOM references.
const contractTextDisplay = document.getElementById('contract-text-display');
const enableMetamaskButton = document.getElementById('enable-metamask');
const contractForm = document.getElementById('contract-text-update-form');
const contractTextInput = document.getElementById('contract-text-input');

// User Ethereum wallet public address.
let walletAddress = null;

// Smart contract.
const contract = {

	// Public hex address of the contract.
	address: '0xacB241f59E1a8c7A61f0781aed7Ad067269feb26',

	// Hex address of the write method of the contract.
	writeAddress: '0xfcc74f71',

	// Contract storage contains bytes32 public text.
	storage: { text: null },

	// Read data from the contract.
	read: async function(callback) {
		const text = await ethereum.request({
		  	method: 'eth_getStorageAt',
		  	params: [ this.address, '0x0' ],
		})
		if (callback) callback(text);
	},

	// Update the storage of the smart contract.
	write: async function(data, callback) {
		const txHash = await ethereum.request({
		  	method: 'eth_sendTransaction',
		  	params: [{
			  	to: this.address,
			  	from: walletAddress,
			  	data: this.writeAddress + (data || ''),
			}],
		});
		if (callback) callback(txHash);
	}
}

// Check if user has MetaMask installed.
function hasMetamask () {
	return window.ethereum ? ethereum.isMetaMask : false;
}

// Read data from the smart contract and display it.
if (hasMetamask()) {
	contract.storage.text = contract.read();
	contractTextDisplay.textContent = hexToString(contract.storage.text);
}

// Button to prompt user to enable metamask.
enableMetamaskButton.onclick = function() { 
	// NOTE: Should I check for MetaMask or is ethereum enough?
	if (!hasMetamask()) {
	  	window.alert("Error: MetaMask not detected. Please install MetaMask.");
	  	// TO DO: Create a function to run the page without metamask.
	} else {
		enableMetamask();
		// NOTE: Switch user to Rovan network.
		// wallet_switchEthereumChain
		// chainId: string; // A 0x-prefixed hexadecimal string)
		// chainId: 42, // kovan chain id (maybe 0x42 or 0x2a ?)
	}
}

// Prompt user to enable MetaMask through the extension.
async function enableMetamask() {
	const accounts = await ethereum.request({
		method: 'eth_requestAccounts'
	});
	walletAddress = accounts[0];
	console.log(walletAddress);
}

// Form to update the text in the smart contract.
contractForm.onsubmit = function(event) {
	event.preventDefault();
	const input = contractTextInput.value.trim();

	// Input must be converted to a hex number of length 64.
	let hex = stringToHex(input);
	while (hex.length < 64 + 2) hex += '0';
	console.log(hex)

	// Send to blockchain.
	contract.write(hex, function(txHash) {
		console.log(txHash);
	})
};

// Convert hexadecimal number to string using char codes.
// NOTE: Ignores '0x'.
function hexToString(hex) {
    let str = '';
    for (let i = 0; i < hex.length; i += 2) {
        let v = parseInt(hex.substr(i, 2), 16);
        if (v) str += String.fromCharCode(v);
    }
    return str;
}

// Convert string to hexadecimal number using char codes.
// NOTE: Accepts weird characters, which is bad.
function stringToHex(str) {
	let hex = '0x';
	for (let i = 0; i < str.length; i++) {
		let v = str.charCodeAt(i).toString(16);
	}
	return hex;
}
