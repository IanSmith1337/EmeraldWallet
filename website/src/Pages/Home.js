import React from 'react'
import abi from './utils/GCW3RaffleV2.json'
import abi2 from './utils/GCW3MinterWave0V2.json'
const { ethers } = require('ethers')
const { useState, useEffect } = require('react')

export default function Home() {
  // Raffle Contract.
  const contractAddress = '0xC0FE64678c97B62D24F33D414686cbAba7471E79'
  const contractAddressMinter = '0x9849a8C5060Ab5E69827b5B044B8E09E90692754'
  const contractABI = abi.abi
  const contractABIMinter = abi2.abi
  const [text, setText] = useState('')
  const [admin, setAdmin] = useState(false)
  const [registered, setRegistered] = useState('No one registered.')
  const [winners, setWinners] = useState('No winners.')

  const register = async () => {
    try {
      const { ethereum } = window

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const raffleContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer,
        )

        await raffleContract.addUser()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const buyTicket = async (text) => {
    let numTickets = parseInt(text)
    console.log(numTickets)
    try {
      const { ethereum } = window

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const raffleContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer,
        )
        var paymentAmount = 0.01 * Number.parseInt(text)
        var buyTXoptions = {
          value: ethers.utils.parseEther(paymentAmount.toString()),
        }
        await raffleContract.buyTickets(numTickets, buyTXoptions)
      }
    } catch (error) {
      console.log('error')
    }
  }

  const checkIfAdmin = async () => {
    try {
      const { ethereum } = window
      const address = await ethereum.request({ method: 'eth_accounts' })
      console.log(address)
      if (address.length === ' 0xA24b6Cab97696c22954DAEbd4747C2B57839FB2F')
        setAdmin(true)
      else console.log('Regular user')
    } catch (error) {
      console.log('error')
    }
  }

  const getRegistered = async () => {
    try {
      const { ethereum } = window

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const raffleContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer,
        )
        var regs = await raffleContract.getAllFromRaffle()
        var registerList = []
        regs.forEach((add) => {
          registerList.push(add + '\n')
        })
        setRegistered(registerList)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const pullWinners = async function (num, wA, contract, minter) {
    let wins = await contract.getWinnersFromRaffle()
    let current = 0
    let end = num
    let max = minter.getSupply()
    while (current < end && wins.length < max) {
      try {
        var addr = wA[Math.floor(Math.random() * wA.length)]
        await contract.setWinnersFromRaffle(addr)
        wins = await contract.getWinnersFromRaffle()
        current++
      } catch (error) {
        continue
      }
    }
    return wins
  }

  const awardAndMint = async () => {
    try {
      const { ethereum } = window

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const raffleContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer,
        )
        const minterContract = new ethers.Contract(
          contractAddressMinter,
          contractABIMinter,
          signer,
        )

        await raffleContract.calcWeightedArrayFromRaffle()
        let weighted = await raffleContract.getWeightedFromRaffle()
        const wArray = await weighted
        var winnersList = await pullWinners(
          1,
          wArray,
          raffleContract,
          minterContract,
        )

        console.log(winnersList)
        if (winnersList.length > 0) {
          console.log('Drawing #1 Winners:')
          winnersList.forEach((win) => {
            console.log(' hi ', win.toString())
            minterContract.mintTo(win)
          })
          setWinners(winnersList.toString())
        }
      }
    } catch (error) {
      console.log('error')
    }
  }

  const reset = async () => {
    try {
      const { ethereum } = window

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const raffleContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer,
        )
        await raffleContract.reset()
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkIfAdmin()
  }, [])

  useEffect(() => {
    getRegistered()
  }, [])

  //remember to flip admin.
  return (
    <div>
      {!admin && (
        <div>
          <div className="row">
            <div className="containers">
              <h2>Welcome to Web3 Geocaching!</h2>
              <h3>How to use the site:</h3>
              <h4>Connect Wallet.</h4>
              <h4>Sign up for raffle.</h4>
              <h4>Buy tickets for a higher chance to win.</h4>
              <h4>Reap the rewards of a GeoCoin NFT.</h4>
            </div>
          </div>
          <div className="row">
            <div className="containers3">
              <label>Click here to join raffle.</label>
              <button className="btns" onClick={register}>
                Join Raffle
              </button>
            </div>
            <div className="containers2">
              <label>
                Enter the amount of tickets you want and click here.
              </label>
              <button className="btns" onClick={() => buyTicket(text)}>
                Buy Tickets
              </button>
              <p className="formfield">
                <label className="black-text" htmlFor="textarea">
                  Amount of Tickets:{' '}
                </label>
                <textarea
                  id="textarea"
                  className="txts"
                  onChange={(e) => setText(e.target.value)}
                  value={text}
                ></textarea>
              </p>
            </div>
          </div>
        </div>
      )}
      {!admin && (
        <div>
          <button onClick={awardAndMint}> Select Winners and Mint Nfts</button>
          <button onClick={reset}> Reset Raffle</button>
          <h1>Currently Registered:</h1>
          <p>{registered}</p>
          <h1>Winners:</h1>
          <p>{winners}</p>
        </div>
      )}
    </div>
  )
}
