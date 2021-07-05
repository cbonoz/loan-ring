import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { cancelFlow, getDetails } from "../util/superfluid";
import { Button, Input } from "antd";

function CancelStream(props) {
  const [stream, setStream] = useState();
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState();
  const cancel = async () => {
    setLoading(true);
    try {
      await cancelFlow(stream);
    } catch (e) {
      console.error("error cancelling stream", e);
    }
    setLoading(false);
  };

  useEffect(() => {
    const get = async () => {
      try {
        const res = await getDetails();
        console.log("res", res);
        setDetails(res.data);
      } catch (e) {
        console.error(e);
      }
    };
    get();
  }, []);
  return (
    <div>
      <h3>Existing Streams</h3>
      {details && JSON.stringify(details)}

      <p>Cancel an existing stream:</p>
      <p>Enter the address of the existing contract.</p>

      <Input
        addonBefore={"Cancel stream"}
        placeholder="address"
        value={stream}
        onChange={e => setStream(e.target.value)}
      />

      <Button loading={loading} onClick={cancel}>
        Cancel stream
      </Button>
    </div>
  );
}

export default CancelStream;
