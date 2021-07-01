import React, { useState } from "react";

import { Button } from "antd";
import { createWallet } from "../util/bgo";

export default function BusinessPage(props) {
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);
  const onCreate = async () => {
    setLoading(true);
    alert("TODO");

    setLoading(false);
  };

  return (
    <div className="container">
      <h3>Create a new listing to be discovered for lending opportunities.</h3>
      <Button loading={loading} onClick={onCreate}>
        Create new listing
      </Button>
    </div>
  );
}
