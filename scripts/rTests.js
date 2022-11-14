const { ethers } = require('hardhat')
const main = async () => {
  const [
    owner,
    randomPerson,
    randomPerson1,
    randomPerson2,
    randomPerson3,
  ] = await hre.ethers.getSigners()
  const raffleFactory = await hre.ethers.getContractFactory('GCW3Raffle')
  const raffleContract = await raffleFactory.deploy()
  await raffleContract.deployed()

  /* Basic Info test.
      console.log('Contract deployed to:', raffleContract.address)
      console.log('Contract deployed by:', owner.address)
      console.log('Random Address:', randomPerson.address)
      console.log('Random Address:', randomPerson1.address)
      console.log('Random Address:', randomPerson2.address)
      console.log('Random Address:', randomPerson3.address)
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

  /* Test mismatch between tickets bought and payment sent.
    let user = await raffleContract.addUser()
    await user
    let balance = await ethers.provider.getBalance(owner.address)
    console.log(balance)
    // this should be enough for 50 tickets...
    const buyTXoptions = { value: ethers.utils.parseEther('0.5') }
    // but the call is only buying 6.
    await raffleContract.buyTickets(6, buyTXoptions)
    */

  /* Test valid buyTickets call
    let user = await raffleContract.addUser()
  await user
  let balance = await ethers.provider.getBalance(owner.address)
  console.log(ethers.BigNumber.from(c).toNumber())
  const buyTXoptions = { value: ethers.utils.parseEther('0.5') }
  await raffleContract.buyTickets(50, buyTXoptions)
  let c = await raffleContract.getTicketCount()
  console.log(ethers.BigNumber.from(c).toNumber())
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

  // -------------------------------
  // The BIG BOI Test
  // Use this test to test the usual execution of a drawing of the raffle.
  // -------------------------------
  // const pullWinners = async function (num, wA, contract) {
  //   let wins = await contract.getWinnersFromRaffle()
  //   let count = wins.length + num
  //   while (wins.length < count) {
  //     try {
  //       var addr = wA[Math.floor(Math.random() * wA.length)]
  //       await contract.setWinnersFromRaffle(addr)
  //       wins = await contract.getWinnersFromRaffle()
  //     } catch (error) {
  //       continue
  //     }
  //   }
  //   return wins
  // }
  // let user = await raffleContract.addUser()
  // await user
  // let user2 = await raffleContract.connect(randomPerson).addUser()
  // await user2
  // let user3 = await raffleContract.connect(randomPerson1).addUser()
  // await user3
  // let user4 = await raffleContract.connect(randomPerson2).addUser()
  // await user4
  // let user5 = await raffleContract.connect(randomPerson3).addUser()
  // await user5
  // var buyTXoptions = { value: ethers.utils.parseEther('0.1') }
  // await raffleContract.buyTickets(10, buyTXoptions)
  // buyTXoptions = { value: ethers.utils.parseEther('0.2') }
  // await raffleContract.connect(randomPerson).buyTickets(20, buyTXoptions)
  // buyTXoptions = { value: ethers.utils.parseEther('0.3') }
  // await raffleContract.connect(randomPerson1).buyTickets(30, buyTXoptions)
  // buyTXoptions = { value: ethers.utils.parseEther('0.4') }
  // await raffleContract.connect(randomPerson2).buyTickets(40, buyTXoptions)
  // buyTXoptions = { value: ethers.utils.parseEther('0.5') }
  // await raffleContract.connect(randomPerson3).buyTickets(50, buyTXoptions)
  // await raffleContract.calcWeightedArrayFromRaffle()
  // let weighted = await raffleContract.getWeightedFromRaffle()
  // const wArray = await weighted
  // var winnersList = await pullWinners(2, wArray, raffleContract)
  // console.log(' ')
  // if (winnersList.length > 0) {
  //   console.log('Drawing #1:')
  //   winnersList.forEach((win) => {
  //     console.log(win)
  //   })
  // }
  // console.log(' ')
  // var winnersList = await pullWinners(2, wArray, raffleContract)
  // if (winnersList.length > 0) {
  //   console.log('Drawing #2:')
  //   winnersList.forEach((win) => {
  //     console.log(win)
  //   })
  // }
}

const runMain = async () => {
  try {
    await main()
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

runMain()
