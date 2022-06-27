const accept = confirm("BlockChat allows anyone in the world to post anything they want to the blockchain. The owner of this website has no control over what messages will be posted. Proceed at your own risk.");

if (!accept) window.history.back();