const crypto = require('crypto');

/**
 * Generates an RSA key pair for WhatsApp Flows encryption.
 * @returns {Object} An object containing the publicKey and privateKey.
 */
function generateKeyPair() {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem'
        }
    });

    return { publicKey, privateKey };
}

module.exports = { generateKeyPair };