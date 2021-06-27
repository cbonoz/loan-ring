import React from "react";
import logo from "../assets/croplogo.png";
import { Steps } from "antd";

const { Step } = Steps;

export default function About() {
  return (
    <div className="container">
      <img className="about-logo" src={logo} />
      <Steps current={3} status="complete">
        <Step title="Find great charities and companies raising money" description="This is a description" />
        <Step title="Create a Loanring contract" description="This is a description" />
        <Step title="Done!" description="Y" />
      </Steps>
    </div>
  );
}
