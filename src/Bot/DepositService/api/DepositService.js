import data from "./mock/deposits.json";
import { translateDeposite } from "./translaters";

function getDeposits() {
  return data.deposits.map(translateDeposite);
}

function getDeposit(name) {
  const deposits = getDeposits();
  const nameToLowerCase = name.toLocaleLowerCase();
  return deposits.find(
    (d) => d.productName.toLocaleLowerCase() === nameToLowerCase
  );
}

export default {
  getDeposit,
};
