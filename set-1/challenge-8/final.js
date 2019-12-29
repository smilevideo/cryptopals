const crypto = require('crypto');
const fs = require('fs');
const readline = require('readline');


const rl = readline.createInterface({
    input: fs.createReadStream('./data.txt')
});

let lineNum = 0;
const possibleECBs = [];
rl.on('line', line => {
    lineNum++;

    //divide each hex line into blocks of 32 characters (16 bytes)
    const lineArr = [];
    for (let i = 0; i < line.length / 32; i++) {
        lineArr.push(line.slice(i * 32, (i + 1) * 32));
    }

    //count number of times any block is repeated 
    const uniqueCount = lineArr.filter((value, index, array) => {
        return array.indexOf(value) === index;
    }).length;
    const repeatCount = lineArr.length - uniqueCount;

    //output any lines with repeated blocks
    // --if there are any it's probably ecb
    if (repeatCount > 0) {
        possibleECBs.push(lineArr);
    }
})

rl.on('close', line => {
    console.log(possibleECBs);
})