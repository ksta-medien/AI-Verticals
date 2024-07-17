export const getPaginationLabels = (current: number, max: number): number[] => {
  const offset = 2;
  if (max <= 7) {
    return Array.from({ length: max }, (_, k) => k + 1);
  }

  let middle: number[] = [];

  if (current - offset < 3) {
    middle = [3, 4, 5];
  } else if (current + offset > max - 3) {
    middle = [max - 4, max - 3, max - 2];
  } else {
    middle = [current - 1, current, current + 1];
  }

  const pagination = [1, null, ...middle, null, max];
  if (pagination[2] === 3) {
    pagination[1] = 2;
  }
  if (pagination[4] === max - 2) {
    pagination[5] = max - 1;
  }

  return pagination as number[];
};
