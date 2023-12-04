const crypto = require("crypto");
const path = require("path");
const fs = require("fs");
const { writeFileSync } = require('fs')
const { generateKeyPairSync } = require('crypto')
const passphrase = "mySecret"

const encryptStringWithRsaPublicKey = function(toEncrypt, relativeOrAbsolutePathToPublicKey) {
    const absolutePath = path.resolve(relativeOrAbsolutePathToPublicKey);
    const publicKey = fs.readFileSync(absolutePath, "utf8");
    const buffer = Buffer.from(toEncrypt);
    const encrypted = crypto.publicEncrypt(publicKey, buffer);
    return encrypted.toString("base64");
};

const decryptStringWithRsaPrivateKey = function(toDecrypt, relativeOrAbsolutePathtoPrivateKey) {
    const absolutePath = path.resolve(relativeOrAbsolutePathtoPrivateKey);
    const privateKey = fs.readFileSync(absolutePath, "utf8");
    const buffer = Buffer.from(toDecrypt, "base64");
    const decrypted = crypto.privateDecrypt(
        {
            key: privateKey.toString(),
            passphrase: passphrase,
        },
        buffer,
    )
    return decrypted.toString("utf8");
};

// const generateKeys = () => {
//     const { publicKey, privateKey } = generateKeyPairSync('rsa', 
//     {
//             modulusLength: 4096,
//             namedCurve: 'secp256k1', 
//             publicKeyEncoding: {
//                 type: 'spki',
//                 format: 'pem'     
//             },     
//             privateKeyEncoding: {
//                 type: 'pkcs8',
//                 format: 'pem',
//                 cipher: 'aes-256-cbc',
//                 passphrase: passphrase
//             } 
//     });
//     const dir = './keys';

//     if (!fs.existsSync(dir)){
//          fs.mkdirSync(dir);
//     }
//     if (fs.existsSync('keys/private.pem')) {
//         writeFileSync('keys/private.pem', privateKey)

//     }
//     writeFileSync('keys/public.pem', publicKey)
// }

// generateKeys();

const a = encryptStringWithRsaPublicKey("hello", "keys/public.pem")
console.log({a})
const b = decryptStringWithRsaPrivateKey(a, "keys/private.pem");
console.log({b})
