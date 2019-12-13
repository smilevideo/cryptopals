/** works but I didn't want to make an object for the binary to base64 conversion table, 
 * so I decided to just use Node's built-in Buffer class -- see final.js */

 
/* function for hex-encoded string to binary */
const hexToBinary = (hexString) => {
    const convTable = {
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

    let binaryArr = [];
    for (i = 0; i < hexString.length; i++) {
        binaryArr.push(convTable[hexString[i]])
    }

    return binaryArr.join('');
}