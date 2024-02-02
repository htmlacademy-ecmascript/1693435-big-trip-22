const getElementByType = (elements, type) => elements.find((element) => element.type === type);

function getElementById(elements, itemsId) {
  if (Array.isArray(itemsId)) {
    return elements.filter((element) => itemsId.find((id) => element.id === id));
  }

  return elements.find((element) => element.id === itemsId);
}

function сapitalizeTheFirstLetter(word) {
  return word[0].toUpperCase() + word.slice(1);
}


export {getElementByType, getElementById, сapitalizeTheFirstLetter};
