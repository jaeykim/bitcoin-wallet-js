var WalletsContent = require('./wallets');

class Withdrawal {
    constructor(password) {
        this.wallet = new WalletsContent();
        validateFormHashed(password).then((hash) => {
            this.wallet.state.sourceWallet = hash;
        }, (e) => {
            console.error('Wrong password entered.');
        });
    }

    call(lists) {
        for (let i = 0; i < lists.length; i++) {
            let e = lists[i];
            this.wallet.send(e.value, e.address, fee, password);
        }
    }
}

module.exports = Withdrawal;
