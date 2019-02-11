var WalletsContent = require('./wallets');
var Withdrawal = require('./withdrawal');

var wallet = undefined;

function start() {
    return new Promise((resolve, reject) => {
        wallet = new WalletsContent();
        resolve();
    });
}

start().then(() => {
//    wallet.reload();
});

/*
var newWallet = wallet.create("test2", "1234");
console.log(newWallet);
*/

