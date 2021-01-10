export const getTime = () => performance.now();

export const logTiming = (name: string, tStart: number, tEnd: number) =>
  console.log(`func ${name}: ${tEnd - tStart}`);
