export function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}
export function getNextRoundRobin(total, current) {
  let currentIndex = current;
  if (currentIndex > total - 1) {
    currentIndex = 0;
  } else {
    currentIndex += 1;
  }
  return currentIndex;
}
