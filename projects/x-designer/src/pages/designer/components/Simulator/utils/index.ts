export function isGlobalEventName(name: string) {
  return /^simulator:/.test(name);
}

export function isNodeEventName(name: string) {
  return /^node:/.test(name);
}

export function getRealEventName(name: string) {
  return name.replace(/^node:|simulator:/, "");
}
