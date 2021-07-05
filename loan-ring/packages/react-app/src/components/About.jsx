import React from "react";
import logo from "../assets/croplogo.png";
import { Steps } from "antd";

const { Step } = Steps;

const createStep = (title, description) => ({ title, description });

const STEP_DATA = [
  createStep(
    "Find great charities and companies raising money.",
    "Select from businesses who needs funds to lend your inactive ethereum or other ERC20 tokens.",
  ),
  createStep(
    "LoanRing will automatically rotate your funds as the businesses repay them.",
    "Your LoanRing gets deployed as a smart contract which automatically rotates the funds through your list of companies.",
  ),
  createStep(
    "Done!",
    "Once the last company returns the funds, the funds plus any interest will automatically be returned to your account.",
  ),
];

export default function About() {
  return (
    <div className="container">
      <img className="about-logo" src={logo} />
      <h3>How does LoanRing work?</h3>
      <br />
      <br />
      <Steps current={STEP_DATA.length} status="complete" direction="vertical">
        {STEP_DATA.map((x, i) => (
          <Step {...x} key={i} />
        ))}
      </Steps>
    </div>
  );
}
