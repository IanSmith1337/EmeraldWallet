import { Link, useMatch, useResolvedPath } from "react-router-dom"
import React, {useEffect, useState} from "react";
//import { ethers } from "ethers";
const { ethers } = require("ethers");
// import abi from "./utils/CareerFair.json";


export default function Navbar() {
    const [currentAccount, setCurrentAccount] = useState("");

    //const contractAddress = "0xe90b023A5d9a9608a1078200eAc9d3A3228D361F";

    //const contractABI = abi.abi;

    const checkIfWalletConnected = async () => {
        try {
        const { ethereum } = window;
        const accounts = await ethereum.request({ method: "eth_accounts" });

        if (accounts.length !== 0) {
            const account = accounts[0];
            console.log("Found an authorized account:", account);
            setCurrentAccount(account);
        } 
        else
            console.log("No authorized account found")
        } catch (error) {
        console.log(error);
        }
    }

    const connectWallet = async () => {
        try {
          const { ethereum } = window;
          if (!ethereum) {
            alert("Need an ETH wallet to connect to!");
          }
          else{
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            console.log("Connected", accounts[0]);
            setCurrentAccount(accounts[0]);
          }
          
        } catch (error) {
          alert("Wallet could not be connected.")
        }
      }

      useEffect(() => {
        checkIfWalletConnected();
      }, [])

    return (
        <nav className="nav">
            <Link to="/" className="site-title">
                CacheMe
            </Link>
            <ul>
                <CustomLink to="/pricing">Home </CustomLink>
                <CustomLink to="/about">About</CustomLink>
                <button onClick={() => connectWallet()}> Connect Wallet </button>
                <>{currentAccount}</>

            </ul>
        </nav>
    )
}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}