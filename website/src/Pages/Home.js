import React from 'react';
import abi from "./utils/GCW3Raffle.json";
const { ethers } = require("ethers");
const {useState} = require("react");

export default function Home() {

    // Raffle Contract.
    const contractAddress = "0x57b376e2087acae095440da50d443468b797c903"
    const contractABI = abi.abi;
    const [text, setText] = useState("");
    const register = async() => {

        try {
          const { ethereum } = window;
    
        if (ethereum){
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const raffleContract = new ethers.Contract(contractAddress, contractABI, signer);
          
          await raffleContract.addUser()

        }
      } catch (error) {
        console.log("error")
      }
      }

    return (
        <div>
          <div className='containers'>
            <button className='btns' onClick={register}>
                Join Raffle
            </button>
            <button className='btns' onClick={''}> 
                Buy Tickets
            </button>
            <p className='formfield'>
            <label className ='black-text' for='textarea'>Amount of Tickets: </label>
            <textarea id='textarea' className ='txts' onChange={(e) => setText(e.target.value)} value={text}></textarea>
            </p>
          </div>
        </div>

    )
}