import {ExternalTokenizer, ContextTracker} from "@lezer/lr"
import {backtickQuotedString} from "./parser.terms.js"

const backTick = '`'.charCodeAt(0);
const atSign = '@'.charCodeAt(0);

export const backtickString = new ExternalTokenizer((input, stack) => {
  if (!stack.canShift(backtickQuotedString)) {
    return;
  }
  if (input.next === atSign) {
    input.advance();
  }
  let backticks = 0;
  for (; input.next === backTick; input.advance()) {
    backticks++;
  }
  if (backticks === 0) {
    return;
  }

  let currentRun = 0;
  while (currentRun < backticks && input.next !== -1) {
    if (input.next === backTick) {
      currentRun++;
    } else {
      currentRun = 0;
    }
    input.advance();
  }
  input.acceptToken(backtickQuotedString);
}, {contextual: true, fallback: true});
