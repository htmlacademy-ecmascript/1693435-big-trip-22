import AbstractView from '../framework/view/abstract-view.js';

function createsortingItemTemplate({type, isChecked, isDisabled}) {
  return (
    `<div class="trip-sort__item  trip-sort__item--${type}">
      <input
      id="sort-${type}"
      class="trip-sort__input  visually-hidden"
      type="radio"
      name="trip-sort"
      value="sort-${type}"
      ${isChecked ? 'checked' : ''}
      ${isDisabled ? 'disbled' : ''}>
      <label class="trip-sort__btn" for="sort-${type}">${type}</label>
    </div>`
  );
}

function createSortingView(sortingTypes) {
  return (
    `
      <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
        ${sortingTypes.map((stotingItem) => createsortingItemTemplate(stotingItem)).join('')}
      </form>
    `
  );
}

export default class SortingView extends AbstractView {
  #sortingTypes = null;

  constructor({sortingTypes}) {
    super();
    this.#sortingTypes = sortingTypes;
  }

  get template() {
    return createSortingView (this.#sortingTypes);
  }
}
