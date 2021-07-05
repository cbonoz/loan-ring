import { Button, Slider } from "antd";
import { Radio, Layout } from "antd";

import React, { useEffect, useState } from "react";
import { Steps } from "antd";
import { useContractLoader } from "../hooks";
import { ethers } from "ethers";
import { Select } from "antd";
import { Input } from "antd";
import Discover from "./Discover";
import { capitalize, displayValue } from "../util";
import { TARGET_NETWORK } from "../constants";
import { TELLOR_ADDRESSES } from "../util/tellor";
import { ConnextModal } from "@connext/vector-modal";

import Address from "./Address";
import { ETH_TOKEN } from "../util/infura";
import { createFlow, RATE_MAP } from "../util/superfluid";

const { TextArea } = Input;
const { Option } = Select;
const { Step } = Steps;
const { Header, Footer, Sider, Content } = Layout;

export const Lend = ({ name, signer, injectedProvider, provider, address, blockExplorer }) => {
  // const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currency, setCurrency] = useState("eth (rinkeby)");

  const [currentStep, setCurrentStep] = useState(2); //-1);
  const [params, setParams] = useState({
    amount: 0.1,
    companies: [],
    purpose: "My first loan",
    frequency: "one_time",
    rate: "day",
  });
  const [deployedAddress, setDeployedAddress] = useState("0xa0095D2bC3Fbd153d64c9B9df5D49827511D5c3d");
  const contracts = useContractLoader(provider);

  const startFlow = async () => {
    const flowRate = parseInt(ethers.utils.parseEther(params.amount.toString()) / RATE_MAP[params.rate]);
    await createFlow(deployedAddress, "0xdd5462a7db7856c9128bc77bd65c2919ee23c6e1", flowRate);
  };

  const adjustStep = async offset => {
    const nextStep = currentStep + offset;
    if (nextStep === 0) {
      if (params.companies.length === 0) {
        return;
      }
    } else if (nextStep == 2) {
      await deploy();
    }
    setCurrentStep(nextStep);
  };

  const deploy = async () => {
    setLoading(true);
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

    const tellorAddress = TELLOR_ADDRESSES[TARGET_NETWORK.name] || TELLOR_ADDRESSES["kovan"];

    let contract;
    try {
      contract = await factory.deploy(params.purpose, amount, coins, addresses, tellorAddress);
    } catch (e) {
      alert("Error creating loan: " + JSON.stringify(e));
      return;
    } finally {
      setLoading(false);
    }

    console.log("deployed contract, address", contract.address);
    setDeployedAddress(contract.address);
  };

  const { companies } = params;

  const infuraUrl = TARGET_NETWORK.rpcUrl;

  const getBody = () => {
    switch (currentStep) {
      case 0:
        const isRecurring = params.frequency === "recurring";
        return (
          <div>
            <hr />
            <h1>Lending to:</h1>
            {companies.map((x, i) => {
              return <li key={i}>{x.title || JSON.stringify(x)}</li>;
            })}
            <br />
            <h3>Enter the name or description for the loan:</h3>
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

            <br />
            <p>Select frequency of the loan:</p>

            <Radio.Group onChange={e => setParams({ ...params, frequency: e.target.value })} value={params.frequency}>
              <Radio value={"one_time"}>One time</Radio>
              <Radio value={"recurring"}>Recurring</Radio>
            </Radio.Group>

            <br />
            <br />

            <Input
              suffix={"Ether"}
              size="large"
              placeholder="0.05"
              value={params.amount}
              onChange={e => setParams({ ...params, amount: e.target.value })}
            />

            {isRecurring && (
              <div>
                <Radio.Group onChange={e => setParams({ ...params, rate: e.target.value })} value={params.rate}>
                  <Radio value={"day"}>Day</Radio>
                  <Radio value={"week"}>Week</Radio>
                  <Radio value={"month"}>Month</Radio>
                </Radio.Group>
              </div>
            )}

            <p className="padding-small">
              Don't worry - clicking next won't create any charge yet. When you deploy the contract, you'll have the
              option to either fund it one time, or set up a recurring loan based on your selection.
            </p>
          </div>
        );
      case 1:
        // https://docs.ethers.io/v4/api-contract.html#deploying-a-contract
        const keys = Object.keys(params);
        return (
          <div>
            <h1>Preview Loan:</h1>
            {keys.map((k, i) => {
              if (params.frequency === "one_time" && k === "rate") {
                return null; // skip showing rate for one time payments.
              }
              return (
                <p key={i}>
                  <b>{capitalize(k)}</b>: {displayValue(k, params[k])}
                </p>
              );
            })}
          </div>
        );
      case 2:
        const payUrl = `${window.location.origin}/preview?address=${deployedAddress}`;
        return (
          <div>
            <h1>Contract Created!</h1>
            <p>
              <b>
                <Address address={deployedAddress} blockExplorer={blockExplorer} />
                <br />
                <a href={payUrl} target="_blank">
                  {payUrl}
                </a>
              </b>
            </p>

            <p>
              <h3>Fund your contract!</h3>

              <br />
              <p>Payment type</p>

              <p className="bold">One time payment</p>
              <p>
                Payment options: &nbsp;
                <Select value={currency} placeholder="Select an asset type" onChange={() => {}}>
                  <Option value="eth (rinkeby)">ETH (rinkeby)</Option>
                  <Option disabled value="erc20">
                    ERC-20
                  </Option>
                </Select>
              </p>
              <Button onClick={() => setShowModal(true)}>Fund Contract</Button>
              <p className="bold">Recurring payment</p>
              <Button onClick={startFlow}>Start recurring payment</Button>
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

  const webProvider = window.ethereum || provider || injectedProvider;

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
            <Step
              title="Fund contract"
              description="Fund the contract and the first company will receive the payment based on their uploaded address."
            />
          </Steps>
        </Sider>
        <Layout>
          <Header>
            <h1>Create new loan</h1>
          </Header>
          <Content className="content">{getBody()}</Content>
          <Footer>
            <Button onClick={() => adjustStep(-1)}>Back</Button>
            {currentStep != 2 && (
              <Button onClick={() => adjustStep(1)} loading={loading}>
                {currentStep == 2 ? "Done" : currentStep == 1 ? "Deploy" : "Next"}
              </Button>
            )}
          </Footer>
        </Layout>
      </Layout>
      {/* withdraw is destination */}
      <ConnextModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        onReady={params => console.log("MODAL IS READY =======>", params)}
        injectedProvider={webProvider}
        loginProvider={webProvider}
        withdrawalAddress={deployedAddress || "0xD7e02fB8A60E78071D69ded9Eb1b89E372EE2292"}
        routerPublicIdentifier="vector7tbbTxQp8ppEQUgPsbGiTrVdapLdU5dH7zTbVuXRf1M4CEBU9Q"
        // depositAssetId={"0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1"} // likely use injected signer
        // depositChainProvider="https://rpc-mumbai.matic.today"
        // depositChainId={80001}
        depositAssetId={"0x0000000000000000000000000000000000000000"}
        depositChainProvider="https://rinkeby.infura.io/v3/31a0f6f85580403986edab0be5f7673c"
        depositChainId={4}
        withdrawAssetId={"0x0000000000000000000000000000000000000000"} // likely use injected signer
        transferAmount={params.amount.toString()}
        withdrawChainProvider={infuraUrl}
        withdrawChainId={42}
        onDepositTxCreated={txHash => {
          console.log("Deposit Tx Created =======>", txHash);
        }}
        // depositAssetId={"0x0000000000000000000000000000000000000000"}
        // depositChainProvider="https://rinkeby.infura.io/v3/31a0f6f85580403986edab0be5f7673c"
        // depositChainId={4}

        // routerPublicIdentifier="vector7tbbTxQp8ppEQUgPsbGiTrVdapLdU5dH7zTbVuXRf1M4CEBU9Q"
        // withdrawAssetId={"0x0000000000000000000000000000000000000000"}
        // withdrawChainProvider={infuraUrl}
        // withdrawChainId={42}
        //
      />
    </div>
  );
};
