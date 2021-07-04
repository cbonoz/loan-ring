pragma solidity >=0.6.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol"; //https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol
import "./UsingTellor.sol";


/*
This contract represents a loan ring contract/engagement for a single user.
New contracts should be deployed for each new loan ring.
*/
contract LoanRingContract is Ownable, UsingTellor {

  event SetPurpose(address sender, string purpose);
  event LoanRepaid(address payer, uint currentIndex);
  event LoanComplete(address payer);

  uint256 ethPrice;
  uint256 ethRequestId = 1; // https://github.com/tellor-io/TellorDocs/blob/89b649f0846a5f6b5cd6974feceaad79febcb11e/integration/data-ids/current-data-feeds.md
  bool isDisputed;

// https://github.com/NexusMutual/smart-contracts/blob/feature/distributor-relocation/docs/DISTRIBUTOR.md
  address NX_MASTER = 0x2561D7f2436C121281388ecd54c702e55Aa24043;
  address NX_FACTORY = 0x2920bad71C8C7cf53f857710345f4cA65F288Ad5;

  // Used for validating eth conversion rates.
  function setEthPrice() public {
    bool _didGet;
    uint _timestamp;
    uint _value;

    (_didGet, ethPrice, _timestamp) = getCurrentValue(ethRequestId);
    isDisputed = false;
  }

  // Dispute the current price
  function disputeValue(uint256 _requestId, uint256 _timestamp) external {
    ethPrice = 0;
    isDisputed = true;
  }

  // https://github.com/liquity/dev/blob/main/packages/lib-ethers/deployments/default/kovan.json

  string public purpose;
  uint256 public amount;
  string public supportedTokens;
  address[] public addresses;
  uint currentIndex;

  constructor(string memory _purpose, uint256 _amount, string memory _supportedTokens, address[] memory _addresses, address payable _tellorAddress) UsingTellor(_tellorAddress) public {
    require(_addresses.length > 0);
    require(_amount > 0);

    purpose = _purpose;
    amount = _amount;
    supportedTokens = _supportedTokens;
    addresses = _addresses;
    currentIndex = 0;
  }

  function setPurpose(string memory newPurpose) public onlyOwner {
    purpose = newPurpose;
    console.log(msg.sender, "Purpose or description for loan", purpose);
    emit SetPurpose(msg.sender, purpose);
  }

  function repay() public payable {
    require(msg.value == amount); // Must be paying the correct balance.
    require(currentIndex < addresses.length); // Must be in range.
    currentIndex += 1;
    if (currentIndex != addresses.length - 1) {
      payable(addresses[currentIndex]).transfer(msg.value);
      emit LoanRepaid(msg.sender, currentIndex);
    } else {
      payable(address(owner())).transfer(msg.value);
      emit LoanComplete(msg.sender);
    }

    console.log(msg.sender, "repaid address", addresses[currentIndex]);
  }

}
