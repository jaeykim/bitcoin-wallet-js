var Constants = require('./logic/constants');
var Hasher = require('./logic/hasher.util');
var Wallet = require('./logic/wallet.class');
var bnet = require('./logic/network');

// Helper Functions

const validateFormHashed = (password) => {
    return new Promise((res, rej) => {
        Hasher.hash(password).then((hash) => {
            res(hash);
        }, (e) => {
            rej(e);
        });
    });
};

const formatAmount = (amount) => {
    const nf = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    return nf.format(amount);
};

class WalletsContent {
    constructor() {
        this.state = {
            price: 1.0,
            fee: 0.0,
            total: 0.0,
            wallets: [],
            sendingPayment: false,
            sourceWallet: null,
        };

        bnet.api.getPrice('USD').then((r) => {
            this.state.price = r.sell;
        }).catch((e) => {
            console.log(e);
        });

        bnet.api.getFee().then((fee) => {
            console.log(fee);
            this.state.fee = fee;
        }).catch((e) => {
            console.log('Could not get fee ', e);
        });
        Wallet.all().then((wallets) => {
            wallets.forEach((w) => {
                w.on(Wallet.Events.Updated, () => {
                    //const newTotal = this.state.wallets.reduce((a, c) => a + c.coins, 0);
                    //console.log(`newTotal: ${newTotal}`);
                    console.log(`${w.address}: ${w.coins}`);
                });
                w.update();
            });
        }, (e) => {
            console.log(e);
            console.error('Could not load wallets from database');
        });
    }

    setState(prop) {

    }

    getWallets() {
        return this.state.wallets;
    }

    create(name, password) {
        validateFormHashed(password).then((hash) => {
            const mnemonic = Wallet.generate();
            const wallet = Wallet.create(name, mnemonic).encrypt(hash);
            this.__addWallet(wallet, mnemonic);
        });
    }

    __addWallet(wallet, mnemonic) {
        wallet.save().then(() => {
            console.log(Constants.Messages.Wallet.Created);
            console.log(Constants.Messages.Wallet.Mnemonic, mnemonic);
        }, (e) => {
            console.error(Constants.Messages.Wallet.Failed, e.toString());
        });
    }

    send(bitcoin, address, fee, password) {
        validateFormHashed(password).then((hash) => {
            if (!this.state.sourceWallet.matches(hash)) {
                console.error('Wrong password entered.');
                return;
            }
            this.state.sourceWallet.send(
                bitcoin, address, fee, password
            ).then(() => {
                console.log(Constants.Messages.Transactions.Sent);
                this.Reload();
            }, (e) => {
                const info = { title: Constants.Messages.Transactions.NOTSent };
                const substring = Constants.ReturnValues.Fragments.MinimumFeeNotMet;
                if (e.toString().includes(substring)) {
                    info.content = Constants.Messages.Errors.FeeNotMet;
                }
                console.error(info);
            });

        }, (e) => {
            console.log(e);
            console.error('Bad format for password entered');
        });
    }

    reload() {
        this.state.wallets.forEach(w => w.update());
    }
}

module.exports = WalletsContent;
