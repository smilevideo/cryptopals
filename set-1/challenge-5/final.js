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

    return Buffer.from(arr).toString('hex');
}

//test data from problem description
const testString = 
`Burning 'em, if you ain't quick and nimble
I go crazy when I hear a cymbal`;

const testKey = 'ICE';

console.log(XORencrypt(testString, testKey));
//output: 
// 0b3637272a2b2e63622c2e69692a23693a2a3c6324202d623d63343c2a26226324272765272a282b2f20430a652e2c652a3124333a653e2b2027630c692b20283165286326302e27282f

//compared to expected output on website, line break is not preserved, but not sure how to fix this or if it's even an issue
// 0b3637272a2b2e63622c2e69692a23693a2a3c6324202d623d63343c2a26226324272765272
// a282b2f20430a652e2c652a3124333a653e2b2027630c692b20283165286326302e27282f