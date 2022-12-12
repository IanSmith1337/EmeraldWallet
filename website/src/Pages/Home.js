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
  const [registered, setRegistered] = useState('No one registered.')
  const [admin, setAdmin] = useState(false)

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
          registerList.push(<p key={add}>{add}</p>)
        })
        setRegistered(registerList)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const calcWeighted = async () => {
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
      }
    } catch (error) {
      console.log('error')
    }
  }

  const draw = async () => {
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

        var wArray = await raffleContract.getWeightedFromRaffle()
        console.log(wArray)
        var addr = wArray[Math.floor(Math.random() * wArray.length)]
        await raffleContract.setWinnersFromRaffle(addr)
      }
    } catch (error) {
      console.log('error')
    }
  }

  const mint = async () => {
    const { ethereum } = window

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()

      const minterContract = new ethers.Contract(
        contractAddressMinter,
        contractABIMinter,
        signer,
      )

      const raffleContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer,
      )

      var winList = await raffleContract.getWinnersFromRaffle()

      winList.forEach((win) => {
        console.log(win.toString())
        minterContract.mintTo(win)
      })
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
          <div className="containers" style={{ height: '50%' }}>
            <span></span>
            <button
              onClick={() => {
                if (!admin) {
                  setAdmin(true)
                }
              }}
            >
              Open Admin Console
            </button>
            <span></span>
          </div>
        </div>
      )}
      {admin && (
        <div className="containers">
          <strong>
            <h2>Admin Panel</h2>
          </strong>
          <button onClick={calcWeighted}>Calc weighted</button>
          <button onClick={draw}>draw</button>
          <button onClick={mint}>mint</button>
          <button onClick={reset}> Reset Raffle</button>
          <h1>Currently Registered:</h1>
          <div>{registered}</div>
          <button
            onClick={() => {
              if (admin) {
                setAdmin(false)
              }
            }}
          >
            Close Admin Console
          </button>
        </div>
      )}
    </div>
  )
}
