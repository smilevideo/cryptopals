//function to compute bit edit distance between two strings
const editDistance = (string1, string2) => {
    const buff1 = Buffer.from(string1, 'utf8');
    const buff2 = Buffer.from(string2, 'utf8');

    let sum = 0;
    for (let i = 0; i < buff1.length; i++) {
        const xor = (buff1[i] ^ buff2[i]).toString(2);

        for (let i = 0; i < xor.length; i++) {
            sum += parseInt(xor[i], 10);
        }
    }
    
    return sum;
}

// test case from challenge page
/*
const testStr1 = 'this is a test';
const testStr2 = 'wokka wokka!!!';
console.log(editDistance(testStr1, testStr2));
*/
// outputs 37, as expected


//function input: unicode string that has been repeating-key xor-encrypted
//function output: a probable key size by computing normalized edit distances
const findKeySize = (string) => {
    let min = Infinity;
    let ret = null;
    for (let keySize = 2; keySize <= 40; keySize++) { //challenge says to try values from 2 to 40
        //compute edit distances between as many consecutive keySize-sized blocks as the input string allows
        let blockCount = Math.floor(string.length / keySize) - 1;

        //find the average normalized edit distance
        let avg = 0;
        for (let i = 0; i < blockCount; i++) {
            avg += (editDistance(string.slice(i * keySize, (i + 1) * keySize),
                string.slice((i + 1) * keySize, (i + 2) * keySize )))
                / keySize; //normalize distance by dividing by key size
        }
        avg /= blockCount;

        if (avg < min) {
            min = avg;
            ret = keySize;
        }
    }

    return ret;
}


//function to break ciphertext into blocks of input length
const divideIntoBlocks = (string, blockLength) => {
    const blockCount = Math.ceil(string.length / blockLength);

    let ret = [];
    for (let i = 0; i < blockCount; i++) {
        ret.push(string.slice(i * blockLength, (i + 1) * blockLength));
    }

    return ret;
}


//function to transpose blocks 
const transposeBlocks = (blockArray) => {
    let ret = [];

    for (let i = 0; i < blockArray[0].length; i++) {
        let str = '';

        for (let j = 0; j < blockArray.length; j++) {
            str += blockArray[j][i];
        }

        ret.push(str);
    }

    return ret;
}


//function to find the key by solving each block as single-char XOR and return array of each key byte
const findRepeatingKey = (blockArray) => {
    let ret = [];

    for (let i = 0; i < blockArray.length; i++) {
        const buff = Buffer.from(blockArray[i], 'utf8');
        let max = 0;
        let key = null;

        for (let j = 0; j < 256; j++) {
            const check = [];
            for (let k = 0; k < buff.length; k++) {
                check.push(buff[k] ^ j);
            }
            const origBuffer = Buffer.from(check);
            
            const charCount = origBuffer.toString('utf8').split(/[a-zA-Z ]/).length;
            if (charCount > max) {
                max = charCount;
                key = j;
            }
        }

        ret.push(key);
    }

    return Buffer.from(ret).toString('utf8');
}


/*** functions written for challenge 5 ***/
//function to create a repeating-key buffer with given length
const createKeyBuffer = (key, size) => {
    let str = '';
    for (let i = 0; i < size; i++) {
        str += key[i % key.length];
    }

    return Buffer.from(str, 'utf8')
}

//function to XOR-encrypt a string with a given key
const XORencrypt = (message, key) => {
    const messageBuff = Buffer.from(message, 'utf8');
    const keyBuff = createKeyBuffer(key, messageBuff.length); 

    const arr = [];
    for (let i = 0; i < messageBuff.length; i++) {
        arr.push(messageBuff[i] ^ keyBuff[i]);
    }

    return Buffer.from(arr).toString('utf8');
}
/*** end code from challenge 5 ***/


//take the raw text input and decrypt it
const fs = require('fs');
const readline = require('readline');
let rl = readline.createInterface({
    input: fs.createReadStream('./data.txt')
});

let testInput = '';
rl.on('line', line => {
    testInput += line;
})
rl.on('close', line => {
    //convert the base-64 input string into utf8
    const testString = Buffer.from(testInput, 'base64').toString('utf8');

    //find the encryption key
    const keySize = findKeySize(testString);
    const key = findRepeatingKey(transposeBlocks(divideIntoBlocks(testString, keySize)));

    //decrypt the cipher
    const decrypted = XORencrypt(testString, key);
    console.log(decrypted);
})