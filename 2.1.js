import crypto from 'crypto'
import * as ed from '@noble/ed25519'

const key = crypto.randomBytes(32)
const iv = crypto.randomBytes(16)


// Symetric Encryption

function encrypt(text){
    const cipher = crypto.createCipheriv('aes-256-cbc',key,iv);
    let encrypted = cipher.update(text,'utf8','hex');
    encrypted += cipher.final('hex')
    return encrypted;
}


function decrypt(encryptedText){
    const decipher = crypto.createDecipheriv('aes-256-cbc',key,iv);
    let decrypted = decipher.update(encryptedText,'hex','utf8');
    decrypted+=decipher.final('utf8')
    return decrypted;
}

const textToEncrypt = "Hello World";
const encryptedText = encrypt(textToEncrypt);
const decryptedText = decrypt(encryptedText);

console.log("original text: ",textToEncrypt,"\necrypted text: ",encryptedText,"\ndecrypted text: ",decryptedText);

// Asymetric Encryption

async function main(){
    const privKey = ed.utils.randomPrivateKey();

    const message = new TextEncoder().encode('hello world')

    const pubKey = await ed.getPublicKeyAsync(privKey);

    const signature = await ed.signAsync(message, privKey);

    const isValid = await ed.verifyAsync(signature,message,pubKey);

    console.log(isValid);

}
main();