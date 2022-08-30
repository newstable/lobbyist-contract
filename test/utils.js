
const { ethers } = require("hardhat");
const fs = require('fs');
/**
 * set delay for delayTimes
 * @param {Number} delayTimes - timePeriod for delay
 */
function delay(delayTimes) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(2);
        }, delayTimes);
    });
}

/**
 * change data type from Number to BigNum 
 * @param {Number} value - data that need to be change
 * @param {Number} d - decimals
 */
function toBigNum(value, d=18) {
    return ethers.utils.parseUnits(String(value), d);
}

/**
 * change data type from BigNum to Number
 * @param {BigNum} value - data that need to be change
 * @param {Number} d - decimals
 */
function fromBigNum(value, d = 18) {
    return ethers.utils.formatUnits(value, d);
}

/**
 * save file to build direct
 * @param {string} fileName - saved file name
 * @param {string} data - saved data
 */
const saveFiles = async (fileName, data) => {
    const fs = require("fs");
    const contractsDir = "./build/";

    if (!fs.existsSync(contractsDir)) {
        fs.mkdirSync(contractsDir);
    }

    fs.writeFileSync(
        contractsDir + fileName,
        data
    );
    console.log("export file", fileName);
}

/**
 * sign data with signer
 * @param {string} data - sign data
 */
const sign = async (data) => {
    const { tokenId, level, signer } = data;
    try {
        let messageHash = ethers.utils.solidityKeccak256(["uint", "uint"], [tokenId, level]);
        let signature = await signer.signMessage(ethers.utils.arrayify(messageHash));
        return signature
    } catch (err) {
        console.log(err)
        return null
    }
}

module.exports = { delay, toBigNum, fromBigNum, saveFiles, sign };