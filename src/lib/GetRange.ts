export function getRange(from: number, to: number): number[] {
  let range: number[] = [];

  for (let i = from; i <= to; i++) {
    range.push(i);
  }

  return range;
}
