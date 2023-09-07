import { useEffect, useState } from 'react';
// import Web3 from "web3";
import './App.css';
const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");
require('dotenv').config();

const runApp = async () => {
  await Moralis.start({
    apiKey: process.env.MORALIS_API_KEY,
    // ...and any other configuration
  });
  const [walletAddress, setWalletAddress] = useState("");
  // const [web3Instance, setWeb3Instance] = useState(null);
  // const [balance, setBalance] = useState('');

  useEffect(() => {
    getCurrentWalletConnected();
    addWalletListener();
  }, []);
  const connectWallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        /* MetaMask is installed */
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      } catch (err) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
    }
  };

  const getCurrentWalletConnected = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          console.log(accounts[0]);
        } else {
          console.log("Connect to MetaMask using the Connect button");
        }
      } catch (err) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
    }
  };

  const addWalletListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      });
    } else {
      /* MetaMask is not installed */
      setWalletAddress("");
      console.log("Please install MetaMask");
    }
  };
  return (
    <div>
      <nav className="nav-bar">
        <button className="btn" onClick={connectWallet}>
          {
            (walletAddress && walletAddress.length > 0) ? `Connected: ${walletAddress.substring(0, 6)}...${walletAddress.substring(38)}` : "Connect Wallet"
          }
        </button>
        {/* <p className="account-balance">Account Balance (Ether): {balance}</p> */}
      </nav>

    </div>


    // FETCHING USER ACCOUNT BALANCE
    // useEffect(() => {
    //   const setWeb3Instance = async () => {
    //     if (web3Instance && walletAddress) {
    //       try {
    //         web3Instance.eth.getBalance(walletAddress, (err, balance) => {
    //           if (!err) {
    //             console.log("Account Balance (Wei):", balance);
    //             // Convert Wei to Ether if needed
    //             const balanceInEther = web3Instance.utils.fromWei(balance, 'ether');
    //             console.log("Account Balance (Ether):", balanceInEther);
    //             setBalance(balanceInEther); // Update state with Ether balance
    //           } else {
    //             console.error("Error fetching balance:", err);
    //           }
    //         });
    //       } catch (error) {
    //         console.error("Error fetching balance:", error);
    //       }
    //     }
    //     else {
    //       console.log("Could not fetch");
    //     }
    //   }
    //   setWeb3Instance();
    // }, [web3Instance, walletAddress]);

  );
}

export default App;
