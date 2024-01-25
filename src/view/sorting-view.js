import RadioListView from './radio-list-view.js';

const createSortingItemTemplate = (sorting) =>
  sorting.reduce(
    (markup, {type, isChecked, isDisabled}) => `${markup}
      <div class="trip-sort__item  trip-sort__item--${type}">
        <input
        id="sort-${type}"
        class="trip-sort__input  visually-hidden"
        type="radio"
        name="trip-sort"
        value="sort-${type}"
        data-item="${type}"
        ${isChecked ? 'checked' : ''}
        ${isDisabled ? 'disabled' : ''}>
        <label class="trip-sort__btn" for="sort-${type}">${type}</label>
      </div>
    `, ''
  );

function createSortingView(sorting) {
  return (
    `
      <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
        ${createSortingItemTemplate(sorting)}
      </form>
    `
  );
}

export default class SortingView extends RadioListView {
  get template() {
    return createSortingView (this._items);
  }
}
