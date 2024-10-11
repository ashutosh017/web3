import crypto from 'crypto'

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



