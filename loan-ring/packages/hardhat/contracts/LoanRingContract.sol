pragma solidity >=0.6.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol"; //https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol

/*
This contract represents a loan ring contract/engagement for a single user.
New contracts should be deployed for each new loan ring.
*/
contract LoanRingContract is Ownable {

  event SetPurpose(address sender, string purpose);

// https://github.com/NexusMutual/smart-contracts/blob/feature/distributor-relocation/docs/DISTRIBUTOR.md
  address NX_MASTER = 0x2561D7f2436C121281388ecd54c702e55Aa24043;
  address NX_FACTORY = 0x2920bad71C8C7cf53f857710345f4cA65F288Ad5;


  // https://github.com/liquity/dev/blob/main/packages/lib-ethers/deployments/default/kovan.json

  string public purpose;
  int public amount;
  string public supportedTokens;
  address[] public addresses;

  constructor(string memory _purpose, int _amount, string memory _supportedTokens, address[] memory _addresses) public {
    purpose = _purpose;
    amount = _amount;
    supportedTokens = _supportedTokens;
    addresses = _addresses;
  }

  function setPurpose(string memory newPurpose) public onlyOwner {
    purpose = newPurpose;
    console.log(msg.sender,"set purpose to",purpose);
    emit SetPurpose(msg.sender, purpose);
  }

  // TODO: add repay and circulation logic. Integrate sponsors with .sol libraries/toolkits.

}
