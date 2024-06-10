import data from "./mock/deposits.json";
import { translateDeposite } from "./translaters";

function getDeposits() {
  return data.deposits.map(translateDeposite);
}

function getDeposit(name) {
  const deposits = getDeposits();
  return deposits.find((d) => d.productName === name);
}

export default {
  getDeposit,
};
