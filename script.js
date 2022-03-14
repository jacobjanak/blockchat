let account = null;

// Check if Metamask is installed.
const hasEthereum = typeof window.ethereum !== 'undefined';
const hasMetamask = hasEthereum ? ethereum.isMetaMask : false;
if (!hasEthereum || !hasMetamask) {
  	window.alert('Error: Metamask not detected. Please install Metamask.');
  	// NOTE: create a function to run the page without metamask
}

// Button to prompt user to enable metamask.
document.getElementById('enableMetamask').onclick = function() {
	enableMetamask();
}

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
	  	nonce: '0x00', // ignored by MetaMask
	  	gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
	  	gas: '0x2710', // customizable by user during MetaMask confirmation.
	  	to: '0xacb241f59e1a8c7a61f0781aed7ad067269feb26', // Required except during contract publications.
	  	from: account, // must match user's active address.
	  	value: '0x00', // Only required to send ether to the recipient from the initiating external account.
	  	data: '0xfcc74f71aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaccbbb', // Optional, but used for defining smart contract creation and interaction.
	  	chainId: '0x3', // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
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
