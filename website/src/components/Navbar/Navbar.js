import { Link, useMatch, useResolvedPath } from "react-router-dom"
import React, {useEffect, useState} from "react";
const { ethers } = require("ethers");


export default function Navbar() {
    const [currentAccount, setCurrentAccount] = useState("No account connected.");
    const [color, toggleColor] = useState("red-text");
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
            toggleColor("green-text")
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
                <p className={color}>●</p>
                <p className="small-size">{currentAccount.substring(0,10)}..</p>
                <CustomLink to="/about">About</CustomLink>
                <button onClick={() => connectWallet()}> Connect Wallet </button>
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