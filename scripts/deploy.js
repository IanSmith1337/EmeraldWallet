const main = async () => {
  const [deployer] = await hre.ethers.getSigners()
  const accountBalance = await deployer.getBalance()

  console.log('Deploying contracts with account: ', deployer.address)
  console.log('Account balance: ', accountBalance.toString())

  const GCW3MintFactory = await hre.ethers.getContractFactory('GCW3MinterWave0')
  console.log("Factory created.")
  const GCW3MintContract = await GCW3MintFactory.deploy()
  
  await GCW3MintContract.deployed()

  // const GCW3RaffleFactory = await hre.ethers.getContractFactory('GCW3Raffle')
  // const GCW3RaffleContract = await GCW3RaffleFactory.deploy()
  // await GCW3RaffleContract.deployed()

  console.log('Minter address: ', GCW3MintContract.address)
  // console.log('Raffler address: ', GCW3RaffleContract.address)
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
