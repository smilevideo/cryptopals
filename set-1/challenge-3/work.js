const hexCipher = '1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736';
const hexBuff = Buffer.from(hexCipher, 'hex')

let message = '';
let max = 0;
let key = null;

for (let j = 0; j < 256; j++) {
    const check = [];
    for (let i = 0; i < hexBuff.length; i++) {
        check.push(hexBuff[i] ^ j);
    }

    const origBuffer = Buffer.from(check);

    //looking for the largest number of alphanumeric or space characters
    const charCount = origBuffer.toString('utf8').split(/[a-zA-Z ]/).length;
    if (charCount > max) {
        max = charCount;
        message = origBuffer.toString('utf8');
        key = j;
    }
}

console.log(key, message);

//answer: 88 or 120 or 344 or 376