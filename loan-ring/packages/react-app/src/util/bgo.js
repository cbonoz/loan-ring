// https://github.com/BitGo/BitGoJS/tree/master/modules/core
import { BitGo } from "bitgo";

const accessToken = process.env.REACT_APP_BITGO_TOKEN || "";
const bitgo = new BitGo({ accessToken }); // defaults to testnet. add env: 'prod' if you want to go against mainnet

export const init = async () => {
  const result = await bitgo.session();
  console.dir(result);
};

export const createWallet = async () => {
  const params = {
    passphrase: "replaceme",
    label: "firstwallet",
  };
  const { wallet } = await bitgo.coin("eth").wallets().generateWallet(params);
  console.dir(wallet);
  const address = await wallet.createAddress();
  console.dir(address);

  return { wallet, address };
};
