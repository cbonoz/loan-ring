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

  string public purpose;
  int public amount;
  string public supportedTokens;

  constructor(string memory _purpose, int _amount, string memory _supportedTokens) public {
    purpose = _purpose;
    amount = _amount;
    supportedTokens = _supportedTokens;
  }

  function setPurpose(string memory newPurpose) public onlyOwner {
    purpose = newPurpose;
    console.log(msg.sender,"set purpose to",purpose);
    emit SetPurpose(msg.sender, purpose);
  }

  // TODO: add repay and circulation logic. Integrate sponsors with .sol libraries/toolkits.

}
