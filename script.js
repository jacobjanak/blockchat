$(document).ready(function() {

	// Update counter for GitHub pages.
	console.log('Update: 20');

	// Enable all tooltips.
	$('[data-toggle="tooltip"]').tooltip();

	// User Ethereum wallet public address.
	let walletAddress = '';

	// Smart contract.
	const contract = {
		chainId: '0x2a', // Kovan test network.
		address: '0xacB241f59E1a8c7A61f0781aed7Ad067269feb26', // Contract public address
		writeAddress: '0xfcc74f71', // Hex address of the write method of the contract.
		storage: { text: null }, // Contract storage contains only bytes32 public text.

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

	// Read data from the smart contract and display it.
	if (!hasMetamask()) {
		$('#contract-text-display').text("No Ethereum Wallet Detected");
	} else if (ethereum.chainId != contract.chainId) {
		$('#contract-text-display').text("Wrong Ethereum network");
	} else {
		getContractData();
	}

	// Button to prompt user to enable metamask.
	$('.connect-wallet').on('click', function() { 
		// NOTE: Should I check for MetaMask or is ethereum enough?
		if (!hasMetamask()) {
		  	window.alert("Error: MetaMask not detected. Please install MetaMask.");
		  	// TO DO: Create a function to run the page without metamask.
		} else {
			enableMetamask(function() {
				$('#contract-text-display').text("Wrong Ethereum network");
				if (ethereum.chainId != contract.chainId) {
					switchChain(contract.chainId, getContractData)
				}
			});
		}
	})

	// Button to show/hide the text update form.
	$('#change-text').on('click', function() {
		$('#form-container').toggle();
	})

	// Form to update the text in the smart contract.
	$('#contract-text-update-form').on('submit', function(e) {
		e.preventDefault();
		const input = $('#contract-text-input').val().trim();

		// Input must be converted to a hex number of length 64.
		let hex = stringToHex(input);
		while (hex.length < 64) hex += '0';
		console.log(hex)

		// Send to blockchain.
		contract.write(hex, function(txHash) {
			console.log(txHash);
			// TO DO: Give user some feedback.
		})
	});

	$('#contract-text-input').on('input', function() {
		const input = $('#contract-text-input').val();
		$('#char-count').text(input.length);
	})

	// Check if user has MetaMask installed.
	function hasMetamask () {
		return window.ethereum ? ethereum.isMetaMask : false;
	}

	// Read the contract data and update the DOM.
	function getContractData() {
		contract.read(function(hex) {
			contract.storage.text = hex;
			const str = hexToString(contract.storage.text);

			// Dynamically set font size according to text length.
			// let fontSize = Math.ceil(100 / str.length);
			// if (fontSize > 20) fontSize = 20;
			// else if (fontSize < 2) fontSize = 2; // Should never happen.
			// fontSize = fontSize + 'vw';

			// Update DOM.
			$('#contract-text-display').text(str); // .css({ fontSize });
		});
	}

	// Prompt user to enable MetaMask through the extension.
	async function enableMetamask(callback) {
		const accounts = await ethereum.request({
			method: 'eth_requestAccounts'
		});
		walletAddress = accounts[0];
		
		// Update DOM.
		$('.connect-wallet').hide();
		$('#submit').show();
		$('#wallet-address').text(walletAddress.slice(-4));
		$('#wallet-display').show();
		if (callback) callback();
	}

	async function switchChain(chainId, callback) {
		const x = await ethereum.request({
			method: 'wallet_switchEthereumChain',
			params: [{ chainId }],
		});
		console.log(x);
		if (callback) callback();
	}

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
	// NOTE: Ignores weird characters, which is bad.
	function stringToHex(str) {
		let hex = '';
		for (let i = 0; i < str.length; i++) {
			let v = str.charCodeAt(i).toString(16);
			if (v.length == 2) hex += v;
		}
		return hex;
	}

});