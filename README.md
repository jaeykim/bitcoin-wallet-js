# Bitcoin wallet library for Node.js

This is the JavaScript library for Bitcoin wallet wrapping bitcoinjs-lib.

## Installation
To enable our launchpadrepository please run:
```JavaScript
$ git clone https://github.com/jaeykim/bitcoin-wallet-js.git
$ npm install
```

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
