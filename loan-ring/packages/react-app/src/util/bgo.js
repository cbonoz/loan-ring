// https://github.com/BitGo/BitGoJS/tree/master/modules/core
import { BitGo } from "bitgo";

const accessToken = process.env.REACT_APP_BITGO_TOKEN || "";
console.log("accessToken", accessToken);
const bitgo = new BitGo({ accessToken, env: "test" });

export const init = async () => {
  const result = await bitgo.session();
  console.dir(result);
};

export const createWallet = async passphrase => {
  try {
    await init();
  } catch (e) {
    console.error("error init", e);
  }
  const params = {
    passphrase,
    label: "MyLoanWallet",
  };
  const { wallet } = await bitgo.coin("tbtc").wallets().generateWallet(params);
  console.dir(wallet);
  const address = await wallet.createAddress();
  console.dir(address);

  return { wallet, address };
};
