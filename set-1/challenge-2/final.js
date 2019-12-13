/* takes two hex strings and XORs them, returning the output as a hex string */
const hexXOR = (hexString1, hexString2) => {
    let arr = [];
    const buff1 = Buffer.from(hexString1, 'hex');
    const buff2 = Buffer.from(hexString2, 'hex');

    for (let i = 0; i < buff1.length; i++) {
        arr.push(buff1[i] ^ buff2[i]);
    }

    return Buffer.from(arr).toString('hex');
}

const testHex1 = '1c0111001f010100061a024b53535009181c';
const testHex2 = '686974207468652062756c6c277320657965';

console.log('below two lines should match:')
console.log('746865206b696420646f6e277420706c6179');
console.log(hexXOR(testHex1, testHex2));