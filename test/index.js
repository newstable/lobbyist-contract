const { expect } = require("chai");
const { ethers } = require("hardhat");
const { delay, fromBigNum, toBigNum, saveFiles, sign } = require("./utils.js");

describe("Pool deploy and test", () => {
    var owner;
    var userWallet;

    var Pool, TestToken;
    // mode
    var isDeploy = false;

    describe("Create UserWallet", function () {
        it("Create account", async function () {
            [owner, userWallet] = await ethers.getSigners();
            console.log(fromBigNum(await ethers.provider.getBalance(owner.address)));
            console.log(fromBigNum(await ethers.provider.getBalance(userWallet.address)));
            console.log(owner.address, userWallet.address);
        });
    });

    describe("deploy contract", function () {

        // it("TestToken token deploy", async function () {
        //     const Factory = await ethers.getContractFactory("Token");
        //     TestToken = await Factory.deploy("TestTokenIUM", "TestTokenIUM");
        //     await TestToken.deployed();
        // });

        it("Pool contract", async function () {
            const Factory = await ethers.getContractFactory("Pool");
            Pool = await Factory.deploy(
                owner.address,
                toBigNum("25000", 0) //2.5%
            );
            await Pool.deployed();
        });
    });

    // if (!isDeploy) {
    //     describe("Pool test", function () {
    //         it("createPool", async function () {
    //             var tx = await TestToken.approve(Pool.address, toBigNum("1000000"));
    //             await tx.wait();

    //             const pooldata = {
    //                 proposalId: "test",
    //                 name: "test",
    //                 description: "this is test pool",
    //                 platformType: "QiDAO",
    //                 outcome: "yes",
    //                 rewardCurrency: TestToken.address,
    //                 rewardAmount: toBigNum("1000000"),
    //                 creator: owner.address,
    //                 isClosed: false,
    //             }

    //             tx = await Pool.createPool(pooldata);
    //             await tx.wait();
    //         })

    //         it("closePool", async function () {
    //             const voters = [owner.address, userWallet.address];
    //             const voteAmounts = [toBigNum("100", 0), toBigNum("300", 0)]
    //             var tx = await Pool.closePool("0x00", voters, voteAmounts);
    //             await tx.wait();
    //         })

    //         it("claim", async function () {
    //             let TestTokenBalance1 = await TestToken.balanceOf(owner.address);
    //             expect(TestTokenBalance1).to.be.equal((toBigNum(10 ** 12).sub(toBigNum(1000000)).add(toBigNum(1000000 * 0.025))));

    //             let userInfo = await Pool.rewardInfos(owner.address, "0");
    //             expect(userInfo).to.be.equal(toBigNum(1000000 * 0.975).div("4"));
    //             var tx = await Pool.claim("0");
    //             await tx.wait();
    //             userInfo = await Pool.rewardInfos(owner.address, "0");
    //             expect(userInfo).to.be.equal(toBigNum(0));

    //             let TestTokenBalance2 = await TestToken.balanceOf(owner.address);
    //             expect(TestTokenBalance2.sub(TestTokenBalance1)).to.be.equal(toBigNum(1000000 * 0.975).div(4))
    //         })
    //     });
    // }

    describe("Save contracts", function () {
        it("save abis", async function () {
            const abis = {
                Pool: artifacts.readArtifactSync("Pool").abi,
                // ERC20: artifacts.readArtifactSync("ERC20").abi
            };
            await saveFiles("abis.json", JSON.stringify(abis, undefined, 4));
        });
        it("save addresses", async function () {
            var addresses = {
                Pool: Pool.address,
                // TestToken: TestToken.address
            };
            await saveFiles(
                "addresses.json",
                JSON.stringify(addresses, undefined, 4)
            );
        });
    });
})