import { Button, Slider } from "antd";
import { Layout } from "antd";

import React, { useEffect, useState } from "react";
import { Steps } from "antd";
import { useContractLoader } from "../hooks";
import { ethers } from "ethers";
import { Select } from "antd";
import { Input } from "antd";
import Discover from "./Discover";

const { TextArea } = Input;
const { Option } = Select;
const { Step } = Steps;
const { Header, Footer, Sider, Content } = Layout;

const typeMarks = ["One time purchase", "Subscription (monthly)", "Subscription (daily)"];

const timeMarks = {
  2: "Standard",
  1: "Fast",
  0: "Instant",
};

export const Lend = ({ name, signer, provider, address, blockExplorer }) => {
  const [tokens, setTokens] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [params, setParams] = useState({
    amount: undefined,
    companies: [],
    purpose: "",
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

    let contract = await factory.deploy(params.purpose, amount, params.coins.join(","));

    console.log("address", contract.address);
    setDeployedAddress(contract.address);
    setCurrentStep(2);
  };

  const { companies } = params;

  const getBody = () => {
    switch (currentStep) {
      case 0:
        return (
          <div>
            <h1>Selected ({companies.length}):</h1>
            {companies.map((x, i) => {
              return <li key={i}>{x.title || JSON.stringify(x)}</li>;
            })}
            <p>Enter the name for the loan.</p>
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
                  <b>{k}</b>: {Array.isArray(params[k]) ? params[k].join(", ") : params[k]}
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
              <b>{deployedAddress}</b>
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
