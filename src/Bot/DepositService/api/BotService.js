import { test, getDepositFromMessage } from "./utils";
import { OPEN_REQUEST, ACCEPT_REQUEST, DISAGREE_REQUEST } from "../templates";

function openRequest(message) {
  if (OPEN_REQUEST.some((template) => test({ template, message }))) {
    const deposit = getDepositFromMessage({ templates: OPEN_REQUEST, message });
    return { result: !!deposit, payload: deposit };
  }
  return { result: false };
}

function acceptRequest(message) {
  if (
    ACCEPT_REQUEST.some((template) => test({ template, message, exact: true }))
  ) {
    return { result: true };
  }
  return { result: false };
}
function disagreeRequest(message) {
  if (
    DISAGREE_REQUEST.some((template) =>
      test({ template, message, exact: true })
    )
  ) {
    return { result: true };
  }
  return { result: false };
}

export default {
  openRequest,
  acceptRequest,
  disagreeRequest,
};
