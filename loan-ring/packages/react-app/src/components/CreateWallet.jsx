import React, { useState } from "react";

import { Button } from "antd";
import { createWallet } from "../util/bgo";

export default function CreateWallet(props) {
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);
  const onCreate = async () => {
    setLoading(true);
    try {
      const res = await createWallet();
      setResult(res);
    } catch (e) {
      console.error("error creating wallet", e);
      alert("Error creating wallet: " + e);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h3>Don't have a wallet? No problem.</h3>
      <p>Generate a crytocurrency wallet to begin accepting payments/loans in ethereum. </p>
      <Button loading={loading} onClick={onCreate}>
        Create Wallet
      </Button>
      <hr />
      {result && JSON.stringify(result)}
    </div>
  );
}
