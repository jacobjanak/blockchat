// const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
// const account = accounts[0];
// console.log(account)

document.getElementById("enableMetamask").onclick = function() {
	window.ethereum.request({ method: 'eth_requestAccounts' })
	.then(accounts => {
		const account = accounts[0];
		console.log(account)
	})
}

