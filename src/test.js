var WalletsContent = require('./wallets');

var wallet = new WalletsContent();

wallet.create("test5", "1234").then((w) => {
    console.log(w);
});

/*
setTimeout(() => {
    wallet.send(0.0000003, 'mrG9FnbqJtMHEqdYjyw5Jc6AiM4jTMr5Sj', 100000, "1234");
}, 1000);
*/
