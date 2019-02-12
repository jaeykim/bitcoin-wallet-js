var WalletsContent = require('./wallets');

var wallet = new WalletsContent();

var newWallet = wallet.create("test3", "1234");

/*
setTimeout(() => {
    wallet.send(0.0000003, 'mrG9FnbqJtMHEqdYjyw5Jc6AiM4jTMr5Sj', 100000, "1234");
}, 1000);
*/
