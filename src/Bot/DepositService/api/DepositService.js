import data from "./mock/deposits.json" assert { type: "json" };
import { translateDeposite } from "./translaters/index.js";

/**
 * Метод имитирует выполение запроса на внешний сервис.
 * Ответ сервера рекомендуется проверить на код наличия ошибки (отличный от 2хх).
 * Для этого в случае response.ok === false необходимо выбросить исключение.
 * Обработка ошибки выполнена в методе runAction({action, payload})
 */
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
