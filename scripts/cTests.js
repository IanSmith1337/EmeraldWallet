const { ethers } = require('hardhat');
const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const raffleFactory = await hre.ethers.getContractFactory("Raffle");
    const raffleContract = await raffleFactory.deploy();
    await raffleContract.deployed();


    /* Basic Info test.
    console.log("Contract deployed to:", raffleContract.address);
    console.log("Contract deployed by:", owner.address);
    console.log("Random Address:", randomPerson.address);
    */
    

    /*Test same user in raffle more than once.
    await raffleContract.addUser();
    await raffleContract.addUser();
    */

    /* Balance test for a user buying tickets.
    await raffleContract.addUser();
    let balance = await ethers.provider.getBalance(owner.address);
    console.log(balance)
    await raffleContract.buyTickets(6);
    balance = await ethers.provider.getBalance(owner.address);
    console.log(balance)
    */

    /* Reset Test
    await raffleContract.addUser();
    let balance = await ethers.provider.getBalance(owner.address);
    await raffleContract.buyTickets(6);
    await raffleContract.setWinnersFromRaffle(owner.address);
    await raffleContract.reset();

    // Needed in contract functions.
    Add console.log("Added User"); to addUser().
    Add,
    require(registeredUsers.length > 0, "No one registered after reset.");
        for (uint256 index = 0; index < registeredUsers.length; index++) {
            console.log(registeredUsers[index]);
        }
    to reset().
    */

};

const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();