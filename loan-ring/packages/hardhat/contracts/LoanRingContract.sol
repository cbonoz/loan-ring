pragma solidity >=0.7.0 <0.9.0;
//SPDX-License-Identifier: MIT
import "hardhat/console.sol";
import "./UsingTellor.sol";

contract LoanRingContract is UsingTellor {
    address payable public lender;
    address payable[] public borrowers;
    uint256 public amount;
    uint public index;
    string public purpose;
    string public supportedTokens;
    uint256 public ethPrice;
    uint256 ethRequestId = 1;
    
    constructor(string memory _purpose, uint256 _amount, string memory _supportedTokens, address payable[] memory _addresses, address payable _tellorAddress) UsingTellor(_tellorAddress) public {
        lender = payable(msg.sender);
        purpose = _purpose;
        amount = _amount;
        supportedTokens = _supportedTokens;
        borrowers = _addresses;
        index = 0;
    }
    
    receive() external payable {}

    function lend() public restricted {
        require(address(this).balance > amount);
        amount = address(this).balance;
        index = 0;
        if (borrowers.length > index) {
            borrowers[index].transfer(address(this).balance);
        }
    }

    function repay() public {
        if (address(this).balance >= amount) {
            if (index <= borrowers.length - 1) {
                index++;
                borrowers[index].transfer(address(this).balance);
            } else {
                lender.transfer(address(this).balance);
            }
        }
    }

    function addBorrower(address payable borrower) public restricted {
        borrowers.push(borrower);
    }

    function setEthPrice() public {
        bool _didGet;
        uint _timestamp;
        (_didGet, ethPrice, _timestamp) = getCurrentValue(ethRequestId);
    }

    function usdPrice() public view returns (uint256) {
        return amount * ethPrice;
    }

    modifier restricted() {
        require(msg.sender == lender);
        _;
    }
}
