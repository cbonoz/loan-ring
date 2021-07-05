// https://github.com/BitGo/BitGoJS/tree/master/modules/core
import { BitGo } from "bitgo";

const accessToken = "b60a69f62e7004e493319f07da7238199d6a436b1158e676ac5427834ae0e14a"; // process.env.REACT_APP_BITGO_TOKEN || "";
console.log("accessToken", accessToken);
const bitgo = new BitGo({ accessToken });

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
    newFeeAddress: true,
  };
  const { wallet } = await bitgo.coin("tbtc").wallets().generateWallet(params);
  console.dir(wallet);
  const address = await wallet.createAddress();
  console.dir(address);

  return { wallet, address };
};
