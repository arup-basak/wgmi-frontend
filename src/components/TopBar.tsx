'use client'

import React from "react";
import Logo from "./Logo";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";

const TopBar = () => {
  return (
    <nav className="flex justify-between p-2 md:p-12">
      <Logo />
      <WalletSelector />
    </nav>
  );
};

export default TopBar;
