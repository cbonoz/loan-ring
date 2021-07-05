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

<!--
Superfluid
Bitgo
Infura
Metamask
Tellor
Connext
-->

Superfluid: Recurring payment support to charities (prize in tandem with Aave)
UMA LSP contract for risk management of parties that do not return payments
Aave/Compound: Lending
Liquity: For additional funding and leverage opportunities
Nexus Mutual: Insure the loan such that if it isn’t repaid, you could get money redemption to cover all/part of the principal.
Pillar - When the loan is received, can have a pillar wallet to accept the payment.
Infura

### Running the project

#### Environment requirements

This app requires a bitgo api key to generate wallets for lending.

<pre>
REACT_APP_BITGO_TOKEN=YOUR_TOKEN_HERE // Required for wallet generation using bitgojs.
REACT_APP_INFURA_ID=YOUR_INFURA_APP_ID // Required for contract funding via connext on kovan or mainnet.
</pre>

#### Starting the app and local chain.

From the `/loan-ring` folder:

<pre>
yarn
2 terminals: 
1) yarn chain
3) yarn deploy; yarn start
</pre>

Default config will run against localhost for chain.

If running against Kovan, to run deploy you'll need to generate a deployer wallet and fund that account with testnet eth.

<pre>
yarn run generate 
</pre>
Once create, send funds to the newly generated kovan address. Verify via `yarn run account`.

Note: For Tellor contracts methods to work properly, you must be running the app against either the Kovan or Mainnet networks.

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


### Demo flow
* Lenders
* Show one time and recurring
* Recurring payment
* Show stream created to organization
* 
