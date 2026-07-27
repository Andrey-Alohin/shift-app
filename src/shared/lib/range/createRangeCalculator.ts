export function createRangeCalculator(minBound: number, maxBound: number) {
  const min = Number(minBound);
  const max = Number(maxBound);
  const totalSpan = max - min;

  return function calculatePosition(targetStart: number, targetEnd: number) {
    const start = Number(targetStart);
    const end = Number(targetEnd);

    const left = start > min ? ((start - min) * 100) / totalSpan : 0;
    const width = ((end - start) * 100) / totalSpan;

    return { left, width };
  };
}
