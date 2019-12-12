/** test case from challenge description **/
const testString = '49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d';

/* function for hex-encoded string to binary */
/* the commented-out function below works but I didn't want to make an object for the binary to base64 conversion table, 
so I decided to just use Node's built-in Buffer class */
// const hexToBinary = (hexString) => {
//     const convTable = {
//         '0': '0000',
//         '1': '0001',
//         '2': '0010',
//         '3': '0011',
//         '4': '0100',
//         '5': '0101',
//         '6': '0110',
//         '7': '0111',
//         '8': '1000',
//         '9': '1001',
//         'a': '1010',
//         'b': '1011',
//         'c': '1100',
//         'd': '1101',
//         'e': '1110',
//         'f': '1111'
//     };

//     let binaryArr = [];
//     for (i = 0; i < hexString.length; i++) {
//         binaryArr.push(convTable[hexString[i]])
//     }

//     return binaryArr.join('');
// }

const hexToBase64 = (hexString) => {
    return Buffer.from(hexString, 'hex').toString('base64');
}

// console.log('below two should match:') 
// console.log('SSdtIGtpbGxpbmcgeW91ciBicmFpbiBsaWtlIGEgcG9pc29ub3VzIG11c2hyb29t')
// console.log(hexToBase64(testString));
/* result: WORKS */