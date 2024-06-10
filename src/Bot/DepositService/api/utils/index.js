export function test({ template, message, exact = false }) {
  if (exact) return template === message;

  const regex = new RegExp(keywords, "gi");
  return regex.test(message);
}

export function getDepositFromMessage({ templates, message }) {
  for (let template of templates) {
    const deposit = getDepositFromTemplate({ template, message });
    if (deposit) return deposit;
  }
  return undefined;
}

function getDepositFromTemplate({ template, message }) {
  const regex = new RegExp(`(${template})|([\W\S]+)`, "gi");
  const matches = message.match(regex);
  return matches[1] ? matches[1].trim() : undefined;
}
