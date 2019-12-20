let keySize = 2;

//function to compute edit distance between two strings
const editDistance = (string1, string2) => {
    const buff1 = Buffer.from(string1, 'utf-8');
    const buff2 = Buffer.from(string2, 'utf-8');

    let sum = 0;
    for (let i = 0; i < buff1.length; i++) {
        const xor = (buff1[i] ^ buff2[i]).toString(2);

        for (let i = 0; i < xor.length; i++) {
            sum += parseInt(xor[i], 10);
        }
    }
    
    return sum;
}

// test case from challenge description; expected output: 37
const testStr1 = 'this is a test';
const testStr2 = 'wokka wokka!!!';

console.log(editDistance(testStr1, testStr2));