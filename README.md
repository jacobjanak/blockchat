# BlockChat

[jacobjanak.github.io/BlockChat/](https://jacobjanak.github.io/BlockChat/)

This is a website that interfaces with a dapp (decentralized application). I created this dapp on the Ethereum blockchain. Someone with technical experience could interact with the dapp directly through ethereum, but this website makes the technology accessible to everyone.

The dapp itself is extremely simple. You can see the code in [contract.sol](contract.sol). You can also view it via [Etherscan](https://kovan.etherscan.io/address/0xacb241f59e1a8c7a61f0781aed7ad067269feb26). It is on the Kovan test network, meaning that you do not have to own real ETH in order to use my website. All this contract does is it will store a string containing up to 64 bytes (or 32 characters) on the blockchain. The only purpose of this dapp is for me to gain experience in blockchain development.

How to use:
- Install [MetaMask Wallet](https://metamask.io/download/) (or some other Ethereum browser-based wallet).
- Use [ethdrop.dev](https://ethdrop.dev/) to get free test ETH.
- Visit the [BlockChat website](https://jacobjanak.github.io/BlockChat/).
- Click 'Connect Wallet'.
- If you are not on the right Ethereum network, the site will automatically prompt you to switch.
- Enter any text you want up to 32 characters into the form.
- Click 'Update Blockchain'.
- Accept the transaction through your wallet and pay the gas fee.
- Wait about 5 seconds.
- Your text is now on the blockchain!
