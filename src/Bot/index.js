import DepositService from "./DepositService";

function request(messsage, options) {
  return DepositService.request(messsage, options);
}

export default {
  request,
};
