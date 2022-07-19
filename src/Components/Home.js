import "./Home.css";
import Img1 from "../Images/logo.png";
import Img2 from "../Images/ape.png";

import React, { useEffect, useState } from "react";
import abi from "./abi.json";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Countdown from "react-countdown";

export default function Home() {
  const REACT_APP_CONTRACT_ADDRESS =
    "0xA36f35383C7a51db62B4bf5cd0ff7D536b777Ebb";
  const SELECTEDNETWORK = "4";
  const SELECTEDNETWORKNAME = "Ethereum";
  const [walletConnected, setWalletConnected] = useState(false);
  const [address, setAddress] = useState("Connect with Web3");
  const [timePeriod, setTimePeriod] = useState(Date.now() + 1000000);

  const Completionist = () => <span>Claim Period is over!</span>;
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <span>
          {days}d {hours}h {minutes}m {seconds}s
        </span>
      );
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  const initialize = async () => {
    if (!checkNetwork()) return false;
    window.web3 = new Web3(window.ethereum);
    const web3 = window.web3;

    const ct = new web3.eth.Contract(abi, REACT_APP_CONTRACT_ADDRESS);
    let t = await ct.methods.start_timestamp_60days().call();
    setTimePeriod(Number(t * 1000) + Number(5184000000));
  };

  async function checkNetwork() {
    window.web3 = new Web3(window.ethereum);
    const web3 = window.web3;
    if ((await web3.eth.net.getId()) == SELECTEDNETWORK) return true;
    toast.error('Enable "' + SELECTEDNETWORKNAME + '" network!');
    return false;
  }

  const loadweb3BAYC = async () => {
    if (!checkNetwork()) return false;

    if (await detectEthereumProvider()) {
      window.web3 = new Web3(window.ethereum);
      const web3 = window.web3;
      const ct = new web3.eth.Contract(abi, REACT_APP_CONTRACT_ADDRESS);

      let metamaskAddress = await web3.eth.getAccounts();
      metamaskAddress = metamaskAddress[0];

      await toast.promise(
        ct.methods.BAYC_Holders_Claim().send({ from: metamaskAddress }),
        {
          pending: "Claim in Progress!!",
          success: "Claim Success!!",
          error: "Claim Failed!!",
        }
      );
    } else {
      toast.error(
        "Non-Ethereum browser detected. Please use a crypto wallet such as MetaMask!"
      );
      return false;
    }
  };
  const loadweb3MAYC = async () => {
    if (!checkNetwork()) return false;

    if (await detectEthereumProvider()) {
      window.web3 = new Web3(window.ethereum);
      const web3 = window.web3;
      const ct = new web3.eth.Contract(abi, REACT_APP_CONTRACT_ADDRESS);

      let metamaskAddress = await web3.eth.getAccounts();
      metamaskAddress = metamaskAddress[0];

      await toast.promise(
        ct.methods.MAYC_Holders_Claim().send({ from: metamaskAddress }),
        {
          pending: "Claim in Progress!!",
          success: "Claim Success!!",
          error: "Claim Failed!!",
        }
      );
    } else {
      toast.error(
        "Non-Ethereum browser detected. Please use a crypto wallet such as MetaMask!"
      );
      return false;
    }
  };

  const connectWallet = async () => {
    if (!checkNetwork()) return false;
    window.web3 = new Web3(window.ethereum);
    const web3 = window.web3;

    await window.ethereum.enable();

    const ct = new web3.eth.Contract(abi, REACT_APP_CONTRACT_ADDRESS);
    let status = await ct.methods.paused().call();

    let metamaskAddress = await web3.eth.getAccounts();
    metamaskAddress = metamaskAddress[0];
    setAddress(
      String(metamaskAddress).substring(0, 7) +
        "...." +
        String(metamaskAddress).substring(
          metamaskAddress.length - 5,
          metamaskAddress.length
        )
    );

    if (status) {
      toast.error("Contract is Paused!");
      return false;
    } else if (status == 2) {
      setWalletConnected(true);
    }
  };
  return (
    <div>
      <div className="container-fluid sec1">
        <div className="row pt-3 align-items-center">
          <div className="col-md-2">
            <img className="w-100 logo" src={Img1} />
          </div>
          <div className="col-md-7"></div>
          <div className="col-md-2 text-center">
            <button className="button" onClick={() => connectWallet()}>
              {address}
            </button>
          </div>
          <div className="col-md-1"></div>
        </div>
        <div className="row token">
          <div className="col-md-1"></div>
          <div className="col-md-3">
            <h4 className="head">INVESTORS &gt; TOKEN CLAIM</h4>
            <h3 className="ape pt-5">Apes together strong.</h3>
          </div>
          <div className="col-md-7">
            <img className="w-100 ss" src={Img2} />
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
      <div className="container">
        <div className="row pt-5">
          <div className="col-md-9">
            <h2 className="mac">BAYC x MAYC x Elan</h2>
            <p className="txt pt-3">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem veritatis aperiam,
              eaque ipsa quae ab illo inventore veritatis et quasi architecto
              beatae vitae dicta sunt explicabo. Sed ut perspiciatis unde omnis
              iste natus error sit voluptatem accusantium doloremque laudantium,
              totam rem veritatis aperiam, eaque ipsa quae ab illo inventore
              veritatis et quasi architecto beatae vitae dicta sunt explicabo
              <br />
              <br />
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem veritatis aperiam,
              eaque ipsa quae ab illo inventore veritatis et quasi architecto
              beatae vita
            </p>
            <p className="con pt-5">Verified Smart Contract Address 0x......</p>
            <h4 className="math pt-5">The Math</h4>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">NFT</th>
                  <th scope="col">Elan Token Allocated per NFT</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Bored Ape Yacth Club</th>
                  <td>2,500 Elan Token</td>
                </tr>
                <tr>
                  <th scope="row">Mutant Ape Yacht Club</th>
                  <td>1,287.1338 Elan Token</td>
                </tr>
              </tbody>
            </table>
            <p className="txt1 pt-3">
              • There will be Ethereum Network Gas Fees Incurred to claim Elan
              Token
              <br />• This is a one-time claim that will identify all eligible
              NFTs in your wallet, in the order that they appear. There will not
              be an option to deselect an eligible NFT if it is present in your
              wallet. If you wish to claim for one of your NFTs but not another,
              you will need to move them to separate wallets. <br /> • There is
              a 60-day claim period for BAYC and MAYC. After this, unclaimed
              tokens will be sent to the main Elan wallet.
              <br />• The airdrop claim tokens associated with any NFT can only
              be claimed once. In order to check whether a certain BAYC or MAYC
              has claimed its tokens, use the below checker.
            </p>
            <h5 className="time">Time Left to Claim</h5>
            <h5 className="timee pt-2">
              <Countdown date={timePeriod} renderer={renderer} />
              {/* 60d 21h 23m 30s */}
            </h5>
            <div className="pt-4">
              <button className="button" onClick={() => loadweb3BAYC()}>
                Claim Elan Tokens for BAYC
              </button>{" "}
              <br />
              <br />
              <button className="button" onClick={() => loadweb3MAYC()}>
                Claim Elan Tokens for MAYC
              </button>
            </div>
            <p className="con pt-5">
              Verified Smart Contract Address{" "}
              <a
                href="https://rinkeby.etherscan.io/address/0xa36f35383c7a51db62b4bf5cd0ff7d536b777ebb#readContract"
                target="_blank"
              >
                0xA36f35383C7a51db62B4bf5cd0ff7D536b777Ebb
              </a>
            </p>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
      <div className="container-fluid sec1">
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <h2 className="mac text-white pt-5">NFT Claim Check</h2>
              <p className="txt pt-3">
                Enter the Token ID to see if a Bored Ape or Mutant Ape NFT is
                eligible for a one-time claim of Elan Tokens.
              </p>
              <h1 className="change">Change the World with us.</h1>
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
