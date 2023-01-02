/* eslint-disable @typescript-eslint/no-explicit-any */
export default function (
  left: any,
  operation: "+" | "-" | "*" | "/",
  right: any
) {
  switch (operation) {
    case "+": {
      return left + right;
    }
    case "-": {
      return left - right;
    }
    case "*": {
      return left * right;
    }
    case "/": {
      return left / right;
    }
  }
}
