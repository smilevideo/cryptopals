/* maps hex values to binary strings */
const hexToBinaryTable = {
    '0': '0000',
    '1': '0001',
    '2': '0010',
    '3': '0011',
    '4': '0100',
    '5': '0101',
    '6': '0110',
    '7': '0111',
    '8': '1000',
    '9': '1001',
    'a': '1010',
    'b': '1011',
    'c': '1100',
    'd': '1101',
    'e': '1110',
    'f': '1111'
};

/* swap keys and values to map in reverse direction */
const binaryToHexTable = {};
for (let key in hexToBinaryTable) {
    binaryToHexTable[hexToBinaryTable[key]] = key;
}

/* function that converts hex string to binary string */
const hexToBinary = (hexString) => {
    let binary = '';
    for (i = 0; i < hexString.length; i++) {
        binary += hexToBinaryTable[hexString[i]];
    }

    return binary;
}

/* function that XORs two binary strings (of equal length) */
const XORbinaries = (binary1, binary2) => {
    let ret = '';

    for (let i = 0; i < binary1.length; i++) {
        if (parseInt(binary1[i], 10) + parseInt(binary2[i], 10) === 1) {
            ret += '1';
        }
        else {
            ret += '0';
        }
    }

    return ret;
}

/* function that converts binary string to hex string */
const binaryToHex = (binaryString) => {
    let hex = '';
    for (let i = 0; i < (binaryString.length / 4); i++) {
        hex += binaryToHexTable[binaryString.slice( i * 4, (i * 4) + 4 )];
    }

    return hex;
}

/* final solution function */
const final = (hexString1, hexString2) => {
    return binaryToHex(XORbinaries(hexToBinary(hexString1), hexToBinary(hexString2)));
}

//test case from challenge description: should return 746865206b696420646f6e277420706c6179
const testHex1 = '1c0111001f010100061a024b53535009181c';
const testHex2 = '686974207468652062756c6c277320657965';

console.log('below two lines should match:')
console.log('746865206b696420646f6e277420706c6179');
console.log(final(testHex1, testHex2));