import React, { useState, useEffect } from "react";
import { Magic } from "magic-sdk";
import { SolanaExtension } from "@magic-ext/solana";
import * as web3 from "@solana/web3.js";
import { Button } from '../layout/layout.styled';

const magic = new Magic("pk_test_2C4813383AE9B307", {
  extensions: {
    solana: new SolanaExtension({
      rpcUrl: "https://testnet.solana.com"
    })
  }
});

export default function App() {
  const [email, setEmail] = useState("");
  const [publicAddress, setPublicAddress] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [sendAmount, setSendAmount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userMetadata, setUserMetadata] = useState({});
  const [txHash, setTxHash] = useState("");
  const [sendingTransaction, setSendingTransaction] = useState(false);

  useEffect(() => {
    magic.user.isLoggedIn().then(async (magicIsLoggedIn) => {
      setIsLoggedIn(magicIsLoggedIn);
      if (magicIsLoggedIn) {
        const metadata = await magic.user.getMetadata()
        setPublicAddress(metadata.publicAddress);
        setUserMetadata(metadata);
      }
    });
  }, [isLoggedIn]);

  const login = async () => {
    await magic.auth.loginWithMagicLink({ email });
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await magic.user.logout();
    setIsLoggedIn(false);
  };

  const handlerSendTransaction = async () => {
    setSendingTransaction(true);
    const metadata = await magic.user.getMetadata();
    const transaction = web3.SystemProgram.transfer({
      fromPubkey: metadata.publicAddress,
      toPubkey: destinationAddress,
      lamports: sendAmount
    });

    const tx = await magic.solana.sendAndConfirmTransaction(transaction);
    setSendingTransaction(false);

    setTxHash(tx);

    console.log("send transaction", tx);
  };

  const handleSignTransaction = async () => {
    setSendingTransaction(true);
    const metadata = await magic.user.getMetadata();
    const transaction = web3.SystemProgram.transfer({
      fromPubkey: metadata.publicAddress,
      toPubkey: destinationAddress,
      lamports: sendAmount
    });

    const tx = await magic.solana.signTransaction(transaction);
    setSendingTransaction(false);

    setTxHash('Check your Signed Transaction in console!');

    console.log("Signed transaction", tx);
  }

  return (
    <div className="text-center">
      {!isLoggedIn ? (
        <div className="container">
          <h1>Please sign up or login</h1>
          <input
            type="email"
            name="email"
            required
            placeholder="Enter your email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <Button onClick={login}>Send</Button>
        </div>
      ) : (
        <div>
          <div className="container">
            <h1>Current user: {userMetadata.email}</h1>
            <Button onClick={logout}>Logout</Button>
          </div>
          <div className="container">
            <h1>Solana address</h1>
            <div className="info">{publicAddress}</div>
          </div>
          <div className="container">
            <h1>Send Transaction</h1>
            {txHash ? (
              <div>
                <div>Send transaction success</div>
                <div className="info">{txHash}</div>
              </div>
            ) : sendingTransaction ? (
              <div className="sending-status">Sending transaction</div>
            ) : (
              <div />
            )}
            <input
              type="text"
              name="destination"
              className="full-width"
              required
              placeholder="Destination address"
              onChange={(event) => {
                setDestinationAddress(event.target.value);
              }}
            />
            <input
              type="text"
              name="amount"
              className="full-width"
              required
              placeholder="Amount in LAMPORTS"
              onChange={(event) => {
                setSendAmount(event.target.value);
              }}
            />
            <Button id="btn-send-txn" onClick={handlerSendTransaction}>
              Send Transaction
            </Button>
            <Button id="btn-send-txn" onClick={handleSignTransaction}>
              Sign Transaction
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
