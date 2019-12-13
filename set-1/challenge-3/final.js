const hexCipher = '1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736';
const hexBuff = Buffer.from(hexCipher, 'hex')

let message = '';
let max = 0;
let key = null;

for (let i = 0; i < 256; i++) { //loop from 0 to 255 to check all possible 1-byte values
    //create buffer of the cipher XOR'd with the current iteration's key
    const check = [];
    for (let j = 0; j < hexBuff.length; j++) {
        check.push(hexBuff[j] ^ i);
    }
    const origBuffer = Buffer.from(check);

    //looking for the largest number of alphanumeric or space characters
    const charCount = origBuffer.toString('utf8').split(/[a-zA-Z ]/).length;
    if (charCount > max) {
        max = charCount;
        message = origBuffer.toString('utf8');
        key = i;
    }
}

console.log(key, message);
//output: 88 Cooking MC's like a pound of bacon