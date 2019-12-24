const crypto = require('crypto');
const fs = require('fs');
const readline = require('readline');


const testKeyBuffer = Buffer.from('YELLOW SUBMARINE', 'utf8');
const decipher = crypto.createDecipheriv('aes-128-ecb', testKeyBuffer, '');

let rl = readline.createInterface({
    input: fs.createReadStream('./data.txt')
});

let testInput = '';
rl.on('line', line => {
    testInput += line;
})
rl.on('close', line => {
    //convert the base-64 input string into utf8
    const testBuffer = Buffer.from(testInput, 'base64');

    let decrypted = decipher.update(testBuffer).toString('utf8');
    decrypted += decipher.final().toString('utf8');
    console.log(decrypted);
})