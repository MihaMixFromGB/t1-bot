import data from "./mock/deposits.json";
import { translateDeposite } from "./translaters";

const TIMEOUT = 1000;

function getDeposits() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data.deposits.map(translateDeposite)), TIMEOUT);
  });
}

async function getDeposit(name) {
  const deposits = await getDeposits();
  const nameToLowerCase = name.toLocaleLowerCase();
  return deposits.find(
    (d) => d.productName.toLocaleLowerCase() === nameToLowerCase
  );
}

export default {
  getDeposit,
};
