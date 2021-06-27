import { PageHeader } from "antd";
import React from "react";

import logo from "../assets/croplogo.png";
import { APP_DESCRIPTION } from "../util/constants";

// displays a page header

export default function Header() {
  const Logo = (
    <span className="header-image">
      <img className="header-image" src={logo} />
    </span>
  );

  return (
    <a href="/">
      <PageHeader title={Logo} subTitle={<span>{APP_DESCRIPTION}</span>} style={{ cursor: "pointer" }} />
    </a>
  );
}
