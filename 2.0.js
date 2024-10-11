import bs58 from "bs58";
const uInt8Array = new Uint8Array([72, 101, 100, 100, 111]);
const bytes = [72, 101, 108, 108, 111];
const ascii = "hello";
// const binRep = new TextEncoder().encode('E');
function bytesToAscii(byteArr) {
  return byteArr.map((byte) => String.fromCharCode(byte)).join("");
}
function asciiToBytes(asciiString) {
  return new Uint8Array([...asciiString].map((char) => char.charCodeAt(0)));
}
function byteArrayToHex(byteArray) {
  let hex = "";
  byteArray.map((i) => (hex += i.toString(16).padStart(2, "0")));
  return hex;
}
function base64Encode(uInt8Array) {
  return Buffer.from(uInt8Array).toString("base64");
}
function base58Encode(uInt8Array) {
  return bs58.encode(uInt8Array);
}
function base64Decode(encodedString) {
  let binaryString = atob(encodedString);
  let uint8Array = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    uint8Array[i] = binaryString.charCodeAt(i);
  }
  return uint8Array;
}
console.log(bytesToAscii(bytes));
console.log(asciiToBytes(ascii));
console.log(byteArrayToHex(uInt8Array));
console.log(base64Encode(uInt8Array));
console.log(base58Encode(uInt8Array));
console.log(base58Encode([...uInt8Array, 24]));
const encodedString = base64Encode(uInt8Array);
const decodedArray = base64Decode(encodedString);
console.log(
  "encoded string: ",
  encodedString,
  "decoded Uint8Array: ",
  decodedArray
);

// for(let i =0; i<=100; i++){
// console.log(`${i} = ${i.toString(16)}`)
// }
