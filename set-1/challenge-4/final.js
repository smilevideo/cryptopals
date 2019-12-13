const fs = require('fs');
const readline = require('readline');

let rl = readline.createInterface({
    input: fs.createReadStream('./data.txt')
});

let line_no = 0;
let cipher_line = null;
let cipher_message = '';
let cipher_max = 0;
let cipher_key = null;

rl.on('line', line => {
    line_no++;
    const lineBuff = Buffer.from(line, 'hex');
    
    for (let i = 0; i < 256; i++) { //loop from 0 to 255 to check all possible 1-byte values
        //create buffer of the line XOR'd with the current iteration's key
        const check = [];
        for (let j = 0; j < lineBuff.length; j++) {
            check.push(lineBuff[j] ^ i);
        }
        const lineXORBuff = Buffer.from(check);
    
        //looking for the largest number of alphanumeric or space characters
        const charCount = lineXORBuff.toString('utf8').split(/[a-zA-Z ]/).length;
        if (charCount > cipher_max) {
            cipher_max = charCount;
            cipher_message = lineXORBuff.toString('utf8');
            cipher_key = i;
            cipher_line = line_no;
        }
    }
})

rl.on('close', line => {
    console.log(`Line number: ${cipher_line}`);
    console.log(`Message: ${cipher_message}`);
    console.log(`Cipher Key: ${cipher_key}`);
});

//Output:
// Line number: 171
// Message: Now that the party is jumping
// Cipher Key: 53    