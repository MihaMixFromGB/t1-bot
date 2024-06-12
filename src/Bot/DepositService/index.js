import BotService from "./api/BotService.js";
import Conversation from "./Conversation.js";
import DepositService from "./api/DepositService.js";
import {
  ACCEPT_RESPONSE,
  DISAGREE_RESPONSE,
  UNDEFINED_DEPOSIT_RESPONSE,
  UNDEFINED_RESPONSE,
  ERROR_REQUEST_RESPONSE,
} from "./templates/index.js";
import { DEPOSIT_ACTION } from "./types/index.js";

let requestOptions;

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

async function runAction({ action, payload }) {
  switch (action) {
    case DEPOSIT_ACTION.REQUEST: {
      try {
        return await runRequestAction(payload);
      } catch {
        return ERROR_REQUEST_RESPONSE;
      }
    }
    case DEPOSIT_ACTION.ACCEPT: {
      Conversation.next(DEPOSIT_ACTION.ACCEPT);
      return ACCEPT_RESPONSE;
    }
    case DEPOSIT_ACTION.DISAGREE: {
      Conversation.next(DEPOSIT_ACTION.DISAGREE);
      return DISAGREE_RESPONSE;
    }
    default: {
      return UNDEFINED_RESPONSE;
    }
  }
}

async function runRequestAction(productName) {
  if (requestOptions?.error) throw Error("A test error for debugging");
  const deposit = await DepositService.getDeposit(productName);
  if (!deposit) return UNDEFINED_DEPOSIT_RESPONSE;

  let response = [];
  response.push(`Вклад: ${deposit.productName}`);
  response.push(`Срок вклада: ${deposit.minimumTerm}`);
  response.push(`Процентная ставка: ${deposit.maxProfitRate}`);
  response.push(`Минимальная сумма вклада: ${deposit.nominalRate}`);
  response.push("");
  response.push("Вы согласны открыть вклад?");

  Conversation.next(DEPOSIT_ACTION.REQUEST);

  return response.join("\n");
}

async function request(message, options) {
  requestOptions = options;
  const action = getAction(message);
  return await runAction(action);
}

export default {
  request,
};
