# Bitcoin wallet library for Node.js

This is the JavaScript library for Bitcoin wallet wrapping bitcoinjs-lib.

## Installation
To enable our launchpadrepository please run:
```bash
$ git clone https://github.com/jaeykim/bitcoin-wallet-js.git
$ cd bitcoin-wallet-js
$ npm install
```

## Change the network
The default network is Bitcoin testnet.
If you want to use the mainnet, please modify the env.json file.
```JavaScript
{
    "network": "bitcoin"
}
```

## Instruction
How to use?

### Initialize
Initialization is done by make a WalletsContent object.
```JavaScript
var WalletsContent = require('./wallets');
var wallet = new WalletsContent();
```

### Create a wallet
To create a wallet,
* name (string)
* password (string)

are required.
```JavaScript
var newWallet = wallet.create([name], [password]);
```

### Send a transaction
To send a transaction, 
* value (number, BTC)
* address (string)
* fee (number, satoshi)
* password (string)

are required.
```JavaScript
wallet.send([value], [address], [fee], [password]);
```

### Reload wallets to update data
Reload fetches data from **blockchain.info**
```JavaScript
wallet.reload();
```
