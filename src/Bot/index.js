import DepositService from "./DepositService";

function request(messsage) {
  return DepositService.request(messsage);
}

export default {
  request,
};
