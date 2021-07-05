import { Input, Select } from "antd";
import { Option } from "antd/lib/mentions";
import { Button } from "antd/lib/radio";
import React, { useState, useEffect } from "react";
import { capitalize, displayValue } from "../util";
import { getContracts, getQuote } from "../util/insure";

export default function InsureLoan() {
  const [quote, setQuote] = useState();
  const [address, setAddress] = useState();
  const [amount, setAmount] = useState();
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const fetchQuote = async () => {
    setLoading(true);
    try {
      const res = await getQuote(address, amount);
      setQuote(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  /* ex:   "0x7fC77b5c7614E1533320Ea6DDc2Eb61fa00A9714":{
    "name": "Curve BTC Pools",
    "type": "protocol",
    "dateAdded": "2020-06-20",
    "deprecated": true
  },*/
  const init = async () => {
    try {
      const { data } = await getContracts();
      const results = Object.keys(data)
        .map(address => ({ address, ...data[address] }))
        .filter(x => (x.supportedChains || []).indexOf("ethereum") !== -1 && !x.deprecated);
      setContracts(results);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    init();
  }, []);

  const purchase = async () => {
    // TODO
    alert("Quote purchased");
  };

  return (
    <div className="container padding-small">
      <p>
        If the company leverages any of the below listed protocols, you may want to insure it in the off case that a
        company may not pay it back.
      </p>
      <p>Supported ethereum contracts below:</p>

      <Select
        showSearch
        style={{ width: 400 }}
        placeholder="Select contract"
        optionFilterProp="children"
        onChange={x => setAddress(x)}
        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
        {contracts.map((x, i) => {
          return (
            <Option key={i} value={x.address}>
              {x.name}
            </Option>
          );
        })}
      </Select>
      <br />

      <Input
        addonBefore={"Insurable address"}
        placeholder="Select contract above"
        disabled={true}
        value={address}
        onChange={e => setAddress(e.target.value)}
      />

      <Input
        addonBefore={"Loan amount"}
        placeholder="Enter loan amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />

      <Button loading={loading} onClick={fetchQuote}>
        Get Quote
      </Button>

      <br />

      {quote && (
        <div className="padding-small">
          <hr />
          <br />
          {Object.keys(quote).map((k, i) => {
            return (
              <p key={i}>
                <b>{capitalize(k)}</b>: {displayValue(k, quote[k])}
              </p>
            );
          })}
          <br />
          <a className="padding-small" href={"app.nexusmutual.com"} target="_blank">
            Purchase via NexusMutual
          </a>
        </div>
      )}
    </div>
  );
}
