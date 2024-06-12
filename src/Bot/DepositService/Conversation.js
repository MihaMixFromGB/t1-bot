import { DEPOSIT_ACTION } from "./types/index.js";

const script = [
  {
    action: DEPOSIT_ACTION.REQUEST,
    next: [
      {
        action: DEPOSIT_ACTION.ACCEPT,
      },
      {
        action: DEPOSIT_ACTION.DISAGREE,
      },
    ],
  },
];

let step = script;

function getActions() {
  return step.map((s) => s.action);
}

function next(action) {
  const selectedAction = step.find((s) => s.action === action);
  if (!selectedAction) {
    return getActions();
  }
  if (!selectedAction.next) {
    step = script;
    return next(action);
  }

  step = selectedAction.next;
  return getActions();
}

export default { next };
