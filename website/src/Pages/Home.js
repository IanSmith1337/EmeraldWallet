import React from 'react'
import abi from './utils/GCW3Raffle.json'
const { ethers } = require('ethers')
const { useState } = require('react')

export default function Home() {
  // Raffle Contract.
  const contractAddress = '0x57b376e2087acae095440da50d443468b797c903'
  const contractABI = abi.abi
  const [text, setText] = useState('')
  const [registered, setRegistered] = useState(false)
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


        const user = await ethereum.request({ method: "eth_requestAccounts" })
        const currentUserInContract = await raffleContract.registeredUsers(
          user[0],
        )
        console.log(currentUserInContract)
        if (currentUserInContract > 0) {
          console.log(currentUserInContract)
        } else {
          await raffleContract.addUser().then(setRegistered(true))
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
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
        {console.log(registered)}
        {!registered ? (
          <div className="containers3">
            <label>Click here to join raffle.</label>
            <button className="btns" onClick={register}>
              Join Raffle
            </button>
          </div>
        ) : (
          <div className="containers2">
            <label>Enter the amount of tickets you want and click here.</label>
            <button className="btns" onClick={''}>
              Buy Tickets
            </button>
            <p className="formfield">
              <label className="black-text" for="textarea">
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
        )}
      </div>
    </div>
  )
}
