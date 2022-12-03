const { ethers } = require('hardhat')

const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners()
  const mintyContractInstanceOwnContext = await ethers.getContractAt(
    'contracts/GCW3MinterWave0.sol:GCW3MinterWave0',
    '0x5fbdb2315678afecb367f032d93f642f64180aa3',
    owner,
  )
  const mintyContractInstanceRandoContext = await ethers.getContractAt(
    'contracts/GCW3MinterWave0.sol:GCW3MinterWave0',
    '0x5fbdb2315678afecb367f032d93f642f64180aa3',
    randomPerson,
  )
  const txR1 = await mintyContractInstanceOwnContext.mintTo(
    randomPerson.address,
    {
      gasLimit: 500_000,
    },
  )
  const txR2 = await mintyContractInstanceOwnContext.tokenURI(1, {
    gasLimit: 500_000,
  })

  console.log(`Transaction Hash: ${txR1.hash}`)

  const metadata_url = txR2
  console.log(`Metadata URL: ${metadata_url}`)

  const metadata = await fetch(metadata_url).then((file) => file.json())
  console.log(`Metadata fetch response: ${JSON.stringify(metadata, null, 2)}`)
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
