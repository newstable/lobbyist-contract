async function main() {
    const Token = await ethers.getContractFactory("Pool");
    const token = await Token.deploy("0xbC7a300977383B531383e50c76A2bD6dB3Aa9051", 100000);

    console.log("Token address:", token.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });