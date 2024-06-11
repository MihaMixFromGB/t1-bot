import BotService from "./api/BotService";
import Conversation from "./Conversation";
import DepositService from "./api/DepositService";
import {
  ACCEPT_RESPONSE,
  DISAGREE_RESPONSE,
  UNDEFINED_RESPONSE,
} from "./templates";
import { DEPOSIT_ACTION } from "./types";

function getAction(message) {
  const actions = Conversation.next();

  for (let action of actions) {
    const { result, payload } = matchAction(action, message);
    if (result) return { action, payload };
  }
  return { action: DEPOSIT_ACTION.UNDEFINED };
}

function matchAction(action, message) {
  switch (action) {
    case DEPOSIT_ACTION.REQUEST: {
      return BotService.openRequest(message);
    }
    case DEPOSIT_ACTION.ACCEPT: {
      return BotService.acceptRequest(message);
    }
    case DEPOSIT_ACTION.DISAGREE: {
      return BotService.disagreeRequest(message);
    }
    default: {
      return { result: false };
    }
  }
}

function runAction({ action, payload }) {
  switch (action) {
    case DEPOSIT_ACTION.REQUEST: {
      return runRequestAction(payload);
    }
    case DEPOSIT_ACTION.ACCEPT: {
      return ACCEPT_RESPONSE;
    }
    case DEPOSIT_ACTION.DISAGREE: {
      return DISAGREE_RESPONSE;
    }
    default: {
      return UNDEFINED_RESPONSE;
    }
  }
}

function runRequestAction(productName) {
  const deposit = DepositService.getDeposit(productName);
  if (!deposit) return UNDEFINED_RESPONSE;

  let response = [];
  response.push(`Вклад: ${deposit.productName}`);
  response.push(`Срок вклада: ${deposit.minimumTerm}`);
  response.push(`Процентная ставка: ${deposit.maxProfitRate}`);
  response.push(`Минимальная сумма вклада: ${deposit.nominalRate}`);
  response.push("");
  response.push("Вы согласны открыть вклад?");

  return response.join("\n");
}

function request(message) {
  const action = getAction(message);
  return runAction(action);
}

export default {
  request,
};
