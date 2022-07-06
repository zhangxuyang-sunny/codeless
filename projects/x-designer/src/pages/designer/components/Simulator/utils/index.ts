export function isSimulatorEventName(name: string) {
  return /^simulator:/.test(name);
}

export function isNodeEventName(name: string) {
  return /^node:/.test(name);
}

export function isDocumentEventName(name: string) {
  return /^document:/.test(name);
}

export function getRealEventName(name: string) {
  return name.replace(/^node:|simulator:|^document:/, "");
}
