<p align='center'>
    <img src='./img/logo.png' width=400/>
</p>

## LoanRing

LoanRing is an application that increases the utility of static cryptocurrency by offering automated loans to businesses.

Built for hack.money 2021.

In progress.

### Concept

Charitable loans/lending.
Use your static funds for rotating loans to charities that meet your requirements.
Earn interest and never have funds sitting statically in your account (show metric on how much funds aren’t being used effectively).
Eliminate middle men in the transaction
Once funds have circulated around your desired charities, funds are returned to you wallet automatically with interest paid.

### Tech

Connects to wallet using web3/ethereum.

Uses a smart contract to track and maintain the state of the outstanding loans.

Superfluid: Recurring payment support to charities (prize in tandem with Aave)
UMA LSP contract for risk management of parties that do not return payments
Aave/Compound: Lending
Liquity: For additional funding and leverage opportunities
Nexus Mutual - Insure the loan such that if it isn’t repaid, you could get money redemption to cover all/part of the principal.
Pillar - When the loan is received, can have a pillar wallet to accept the payment.
Infura

### Running the project

From the `loan-ring` folder:

<pre>
yarn
2 terminals: 
1) yarn chain
2) yarn deploy; yarn start
</pre>

Default config will run against localhost for chain.

### Updating the contract

- Make any changes in `LoanRingContract.sol`
- Verify contract is correct by going to `/preview`

Changes should be present/accessible the next time the contract is deployed.

### Screenshots

<!--
### Useful links
* https://github.com/NexusMutual/smart-contracts/blob/feature/distributor-relocation/docs/DISTRIBUTOR.md (solidity)
* https://github.com/aave/protocol-v2#getting-started (solidity)
* https://github.com/liquity/dev/blob/main/README.md (solidity)
* https://github.com/BitGo/BitGoJS/tree/master/modules/core




-->
