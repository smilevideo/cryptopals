/* converts a hex string to a base64 string */
const hexToBase64 = (hexString) => {
    return Buffer.from(hexString, 'hex').toString('base64');
}

/* test case from challenge description */
const testString = '49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d';

console.log('below two should match:') 
console.log('SSdtIGtpbGxpbmcgeW91ciBicmFpbiBsaWtlIGEgcG9pc29ub3VzIG11c2hyb29t')
console.log(hexToBase64(testString));
/* result: WORKS */