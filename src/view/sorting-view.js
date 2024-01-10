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
      data-sort-type="${type}"
      ${isChecked ? 'checked' : ''}
      ${isDisabled ? 'disabled' : ''}>
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
  #handleSortTypeChange = null;

  constructor({sortingTypes, onSortTypeChange}) {
    super();
    this.#sortingTypes = sortingTypes;
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }


  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };

  get template() {
    return createSortingView (this.#sortingTypes);
  }
}
