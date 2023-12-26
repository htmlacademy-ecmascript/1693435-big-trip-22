function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomInteger(maxRandomvalue) {
  return Math.floor(Math.random() * maxRandomvalue);
}

export {getRandomArrayElement, getRandomInteger};
