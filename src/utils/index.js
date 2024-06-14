export const sumHandler = (arr) => {
  const sum = arr?.reduce((acc, curr) => {
    return acc + curr.amountInvested
  }, 0)
  return sum
}

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};
