import DepositService from "./DepositService/index.js";

function request(messsage, options) {
  return DepositService.request(messsage, options);
}

export default {
  request,
};
