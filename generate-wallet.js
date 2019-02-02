const secureRandom = require('secure-random');
const {ec} = require('elliptic');
var ecdsa = new ec('secp256k1');
const sha256 = require('js-sha256');
const ripemd160 = require('ripemd160');
const base58 = require('bs58');

function generateWallet() {
	// Generate a private key
	const max = Buffer.from("0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364140", 'hex');  
	let isInvalid = true;  
	let privateKey;  
	do {
		privateKey = secureRandom.randomBuffer(32);
	} while (Buffer.compare(max, privateKey) === 1);
	const privateKeyAddr = privateKey.toString('hex');
	console.log('> Private key: ', privateKeyAddr);

	// Generate a corresponding public key
	const keys = ecdsa.keyFromPrivate(privateKey);  
	const publicKey = keys.getPublic('hex');  
	console.log('> Public key created: ', publicKey);

	// Public Key Hash
	let hash = sha256(Buffer.from(publicKey, 'hex'));
	let publicKeyHash = new ripemd160().update(Buffer.from(hash, 'hex')).digest();
	console.log('> Public key hash: ', publicKeyHash);

	// Public Key Address
	const step1 = Buffer.from("00" + publicKeyHash.toString('hex'), 'hex');
	const step2 = sha256(step1);
	const step3 = sha256(Buffer.from(step2, 'hex'));
	const checksum = step3.substring(0, 8);
	const step4 = step1.toString('hex') + checksum;
	const publicKeyAddr = base58.encode(Buffer.from(step4, 'hex'));
	console.log('> Public key address: ', publicKeyAddr);
	
	return {privateKeyAddr, publicKeyAddr};
}

// Wallet Import Format for migration
function createPrivateKeyWIF(privateKey) {
	const step1 = Buffer.from("80" + privateKey, 'hex');
	const step2 = sha256(step1);
	const step3 = sha256(Buffer.from(step2, 'hex'));
	const checksum = step3.substring(0, 8);
	const step4 = step1.toString('hex') + checksum;
	const privateKeyWIF = base58.encode(Buffer.from(step4, 'hex'));
	return privateKeyWIF;
}

module.exports = generateWallet;
