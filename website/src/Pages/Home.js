import React from 'react'
import abi from './utils/GCW3Raffle.json'
import ReactDOM from 'react-dom';
import Countdown from 'react-countdown';
const { ethers } = require('ethers')
const { useState, useEffect } = require('react')

export default function Home() {
  // Raffle Contract.
  const contractAddress = '0x57b376e2087acae095440da50d443468b797c903'
  const contractABI = abi.abi
  const [text, setText] = useState('')
  const [admin, setAdmin] = useState(false)
  const [registered,setRegistered] = useState('')

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
      const {ethereum} = window
      const address = await ethereum.request({method: "eth_accounts"});
      console.log(address)
      if (address.length == ' 0xA24b6Cab97696c22954DAEbd4747C2B57839FB2F') 
        setAdmin(true)
      else
        console.log("Regular user")
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

        setRegistered(await raffleContract.getWeightedFromRaffle())
      }
    } catch (error) {
      console.log(error)
    }
  }

  const pullWinners = async function (num, wA, contract) {
    let wins = await contract.getWinnersFromRaffle()
    let count = wins.length + num
    while (wins.length < count) {
      try {
        var addr = wA[Math.floor(Math.random() * wA.length)]
        await contract.setWinnersFromRaffle(addr)
        wins = await contract.getWinnersFromRaffle()
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
        
        await raffleContract.calcWeightedArrayFromRaffle()
        let weighted = await raffleContract.getWeightedFromRaffle()
        const wArray = await weighted
        var winnersList = await pullWinners(1, wArray, raffleContract)
        console.log(' ')
        if (winnersList.length > 0) {
          console.log('Drawing #1 Winners:')
          winnersList.forEach((win) => {
            //Min to goes here.
            console.log(win)
          })
        }
        
      }
    
    } catch (error) {
      console.log('error')
    }
  }

  useEffect(() => {
    checkIfAdmin();
  }, [])

  useEffect(() => {
    getRegistered();
  }, [])

  
  //remember to flip admin.
  return (
    <div>
      {!admin && (<div>
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
            <label>Enter the amount of tickets you want and click here.</label>
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
      </div>)}
      {admin && (<div>
        <button onClick={awardAndMint}> Select Winners and Min Nfts</button>
        <h1> Currently Registered:</h1>
        <p>{registered}</p>
      </div>)}
    </div>
  )
}
