import { ethers } from "ethers";
import { hex } from ".";
import axios from "axios";
import { TARGET_NETWORK } from "../constants";

// quote-api signed quotes are cover type = 0; only one cover type is supported at this point.
const COVER_TYPE = 0;
const QUOTE_PERIOD = 365; // days

// https://github.com/NexusMutual/smart-contracts/blob/master/examples/example-distributor-buy-cover.js

// const Distributor = artifacts.require("Distributor");
// const NXMToken = artifacts.require("NXMToken");
// const NXMaster = artifacts.require("NXMaster");
// const TokenController = artifacts.require("TokenController");

// const BN = web3.utils.BN;

const BASE_URL = TARGET_NETWORK.name != "mainnet" ? "https://api.staging.nexusmutual.io" : "https://api.nexusmutual.io";

const DISTRIBUTOR_ADDRESS = process.env.DISTRIBUTOR_ADDRESS || ""; // default kovan.

export const getContracts = async () => {
  const url = `${BASE_URL}/coverables/contracts.json`;
  return axios.get(url);
};

export const getQuote = async (contractAddress, coverAmount) => {
  // Setup your cover data.
  const coverData = {
    coverAmount, // Amount in ETH
    currency: "ETH",
    asset: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", // stands for ETH
    period: QUOTE_PERIOD,
    contractAddress,
  };

  const headers = {
    // Origin: API_REQUEST_ORIGIN,
  };

  // URL to request a quote for.
  const quoteURL = `${BASE_URL}/v1/quote?coverAmount=${coverData.coverAmount}&currency=${coverData.currency}&period=${coverData.period}&contractAddress=${coverData.contractAddress}`;

  console.log(quoteURL);

  const quote = await fetch(quoteURL, { headers }).then(r => r.json());
  console.log(quote);

  return quote;
  /*
  const distributor = await Distributor.at(DISTRIBUTOR_ADDRESS);

  // add the fee on top of the base price
  const feePercentage = await distributor.feePercentage();
  const basePrice = new ethers.BigNumber.from(quote.price);
  const priceWithFee = basePrice.mul(feePercentage).divn(10000).add(basePrice);

  const amountInWei = ethers.utils.parseEther(coverData.coverAmount.toString());

  console.log("approve NXM...");
  const master = await NXMaster.at(await distributor.master());
  const tokenController = await TokenController.at(await master.getLatestAddress(hex("TC")));

  // needs to be done only once! necessary for receiving the locked NXM deposit.
  await distributor.approveNXM(tokenController.address, ethers.utils.parseEther("100000"));

  const quoteData = {
    feePercentage: feePercentage.toString(),
    priceWithFee: priceWithFee.toString(),
    amountInWei: amountInWei.toString(),
    COVER_TYPE,
    quote,
  };

  console.log("quote", quoteData);

  // price is deterministic right now. can set the max price to be equal with the actual price.
  const maxPriceWithFee = priceWithFee;
  return quoteData;
  */
};

export const buyCoverage = async (contractAddress, coverAmount, quote) => {
  // encode the signature result in the data field
  //   const data = web3.eth.abi.encodeParameters(
  //     ["uint", "uint", "uint", "uint", "uint8", "bytes32", "bytes32"],
  //     [quote.price, quote.priceInNXM, quote.expiresAt, quote.generatedAt, quote.v, quote.r, quote.s],
  //   );

  const coverData = {
    coverAmount, // Amount in ETH
    currency: "ETH",
    asset: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", // stands for ETH
    period: QUOTE_PERIOD,
    contractAddress,
  };
  // execute the buy cover operation on behalf of the user.
  let tx;
  //   tx = await distributor.buyCover(
  //     coverData.contractAddress,
  //     coverData.asset,
  //     amountInWei,
  //     coverData.period,
  //     COVER_TYPE,
  //     maxPriceWithFee,
  //     data,
  //     {
  //       value: priceWithFee,
  //     },
  //   );
  const coverId = tx && tx.logs[1].args.coverId.toString();
  console.log(`Bought cover successfully. cover id: ${coverId}`);
  return coverId;
};
