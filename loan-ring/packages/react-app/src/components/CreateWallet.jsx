import React, { useState } from "react";

import { Button, Input } from "antd";
import { createWallet } from "../util/bgo";

export default function CreateWallet(props) {
  const [result, setResult] = useState();
  const [passphrase, setPassphrase] = useState();
  const [loading, setLoading] = useState(false);
  const onCreate = async () => {
    if (!passphrase) {
      alert("Passphrase is required for creating a new wallet.");
      return;
    }

    setLoading(true);
    try {
      const res = await createWallet(passphrase);
      setResult(res);
    } catch (e) {
      console.error("error creating wallet", e);
      alert("Error creating wallet: " + e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h3>Don't have a wallet? No problem.</h3>
      <p>Generate a crytocurrency wallet to begin accepting payments/loans in ethereum. </p>

      <Input
        addonBefore={"Specify Passphrase"}
        placeholder="Your wallet passphrase"
        value={passphrase}
        onChange={e => setPassphrase(e.target.value)}
      />
      <br />

      <Button loading={loading} onClick={onCreate}>
        Create Wallet
      </Button>
      <hr />
      {result && JSON.stringify(result)}


      <div>

        <p>Cancel an existing stream:</p>
        <p>Enter the address of the existing contract.</p>
      </div>
    </div>



  );
}
