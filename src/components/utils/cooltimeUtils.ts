// utils/cooltimeUtils.ts

export function calcCoolTime(myCool: number, refCool: number): number {
  const dMyCool = myCool / 100;
  const dCoolRate = 1.0 / (1.0 + dMyCool);
  return refCool * dCoolRate;
}

export function calcRequiredCool(myCool: number, skillCool: number, targetCool: number): number {
  if (targetCool <= 0) return 0;
  const dReqCool = (skillCool / targetCool - 1.0) * 100;
  return parseFloat((dReqCool - myCool).toFixed(3));
}
