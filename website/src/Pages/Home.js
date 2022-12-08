import React from 'react';
const { ethers } = require("ethers");
import abi from "./utils/GWC3Raffle_metadata.json";

function clickMe(){
    alert('You clicked me!');
}

export default function Home() {

    return (
        <div>
            <button onClick={clickMe}>
                Join Raffle
            </button>
        </div>

    )
}