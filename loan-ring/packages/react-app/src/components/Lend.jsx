import { Button, Slider } from "antd";
import { Radio, Layout } from "antd";

import React, { useEffect, useState } from "react";
import { Steps } from "antd";
import { useContractLoader } from "../hooks";
import { ethers } from "ethers";
import { Select } from "antd";
import { Input } from "antd";
import Discover from "./Discover";
import { displayValue } from "../util";
import { TARGET_NETWORK } from "../constants";
import { TELLOR_ADDRESSES } from "../util/tellor";
import Address from "./Address";

const { TextArea } = Input;
const { Option } = Select;
const { Step } = Steps;
const { Header, Footer, Sider, Content } = Layout;

export const Lend = ({ name, signer, provider, address, blockExplorer }) => {
  const [tokens, setTokens] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [params, setParams] = useState({
    amount: undefined,
    companies: [],
    purpose: "",
    frequency: "one_time",
  });
  const [deployedAddress, setDeployedAddress] = useState();
  const contracts = useContractLoader(provider);

  const adjustStep = async offset => {
    const nextStep = currentStep + offset;
    if (nextStep === 0) {
      if (params.companies.length === 0) {
        return;
      }
    } else if (nextStep == 2) {
      await deploy();
      return;
    }
    setCurrentStep(nextStep);
  };

  const deploy = async () => {
    const { abi, bytecode } = contracts.LoanRingContract;

    // Create an instance of a Contract Factory
    let factory = new ethers.ContractFactory(abi, bytecode, signer);

    const amount = ethers.utils.parseEther(params.amount);

    const coins = (params.coins || ["ETH"]).join(",");

    const addresses = [];
    for (let i in params.companies) {
      const w = ethers.Wallet.createRandom();
      addresses.push(w.address);
    }

    const tellorAddress = TELLOR_ADDRESSES.get(TARGET_NETWORK.name, TELLOR_ADDRESSES["kovan"]);

    let contract;
    try {
      contract = await factory.deploy(params.purpose, amount, coins, addresses, tellorAddress);
    } catch (e) {
      alert("Error creating loan: " + e.toString());
      return;
    }

    console.log("address", contract.address);
    setDeployedAddress(contract.address);
    setCurrentStep(2);
  };

  const { companies } = params;

  const getBody = () => {
    switch (currentStep) {
      case 0:
        const isRecurring = params.frequency === "recurring";
        return (
          <div>
            <h1>Lending to: ({companies.length}):</h1>
            {companies.map((x, i) => {
              return <li key={i}>{x.title || JSON.stringify(x)}</li>;
            })}
            <hr />
            <br />
            <h2>Enter the name for the loan.</h2>
            <TextArea
              showCount
              rows={1}
              placeholder="Loan purpose"
              value={params.purpose}
              onChange={e => {
                const newParams = { ...params, purpose: e.target.value };
                console.log("new", newParams);
                setParams(newParams);
              }}
            />
            <br />
            <Input
              suffix={"Ether"}
              size="large"
              placeholder="0.05"
              value={params.amount}
              onChange={e => setParams({ ...params, amount: e.target.value })}
            />
            <br />
            <p>Loan details:</p>

            <Radio.Group onChange={e => setParams({ ...params, frequency: e.target.value })} value={params.frequency}>
              <Radio value={"one_time"}>One time</Radio>
              <Radio value={"recurring"}>Recurring</Radio>
            </Radio.Group>

            {isRecurring && (
              <div>
                <p>Select frequency of recurring deposit</p>
                {/* TODO */}
              </div>
            )}

            {/* <p>Allowed currencies:</p>
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="Select allowed currencies"
              defaultValue={params.coins}
              onChange={coins => setParams({ ...params, coins })}
            >
              {tokens.map(t => {
                return <Option key={t.symbol}>{t.symbol}</Option>;
              })}
            </Select> */}

            {/* <Slider marks={coinMarks} step={10} defaultValue={37} /> */}
          </div>
        );
      case 1:
        // https://docs.ethers.io/v4/api-contract.html#deploying-a-contract
        const keys = Object.keys(params);
        return (
          <div>
            <h1>Preview Loan:</h1>
            {keys.map((k, i) => {
              return (
                <p key={i}>
                  <b>{k}</b>: {displayValue(params[k])}
                </p>
              );
            })}
          </div>
        );
      case 2:
        const payUrl = `${window.location.origin}/send?loan=${deployedAddress}`;
        return (
          <div>
            <h1>Contract Created!</h1>
            <p>
              <b>
                <Address address={deployedAddress} blockExplorer={blockExplorer} />
              </b>
            </p>
            <p>
              Loan url:{" "}
              <a href={payUrl} target="_blank">
                {payUrl}
              </a>
            </p>
          </div>
        );
    }
  };

  const setCompanies = companies => {
    const ids = companies.map(x => x.id);
    const addedCompany = companies[companies.length - 1];
    const matchingId = ids.indexOf(addedCompany.id);
    if (matchingId !== companies.length - 1) {
      // occurs earlier in list.
      companies = companies.filter(x => addedCompany.id !== x.id);
    }
    console.log("companies", companies, matchingId, addedCompany.id);
    setParams({ ...params, companies });
  };

  const onReady = () => {
    adjustStep(1);
  };

  if (currentStep === -1) {
    return (
      <div className="container">
        <Discover companies={params.companies} setCompanies={setCompanies} onReady={onReady} />;
      </div>
    );
  }

  return (
    <div className="container">
      <Layout>
        <Sider>
          <br />
          <br />
          <br />
          <Steps direction="vertical" current={currentStep}>
            <Step title="Create Loan" description="How much do you want to lend?" />
            <Step title="Deploy" description="Initiate loan" />
            <Step title="Complete" description="Loan will be granted to first party" />
          </Steps>
          ,
        </Sider>
        <Layout>
          <Header>
            <h1>Create new loan</h1>
          </Header>
          <Content className="content">{getBody()}</Content>
          <Footer>
            <Button onClick={() => adjustStep(-1)}>Back</Button>
            {currentStep != 2 && (
              <Button onClick={() => adjustStep(1)}>
                {currentStep == 2 ? "Done" : currentStep == 1 ? "Deploy" : "Next"}
              </Button>
            )}
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};
