const main = async () => {
  const [deployer] = await hre.ethers.getSigners()
  const accountBalance = await deployer.getBalance()

  console.log('Deploying contracts with account: ', deployer.address)
  console.log('Account balance: ', accountBalance.toString())

  const GCW3Factory = await hre.ethers.getContractFactory('GCW3Minter')
  const GCW3Contract = await GCW3Factory.deploy()
  await GCW3Contract.deployed()

  console.log('Minter address: ', GCW3Contract.address)
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
