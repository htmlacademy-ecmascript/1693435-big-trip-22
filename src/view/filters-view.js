import RadioListView from './radio-list-view.js';

const createFilterTypeListTemplate = (filters) =>
  filters.reduce(
    (markup, {type, isChecked, isDisabled}) => `${markup}
      <div class="trip-filters__filter">
        <input
          id="filter-${type}"
          class="trip-filters__filter-input  visually-hidden"
          type="radio"
          name="trip-filter"
          value="${type}"
          data-item=${type}
          ${isChecked ? 'checked' : ''}
          ${isDisabled ? 'disabled' : ''}>
          <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
      </div>
    `, ''
  );

function createFiltersView(filters) {
  return (
    `<div class="trip-main__trip-controls  trip-controls">
      <div class="trip-controls__filters">
        <h2 class="visually-hidden">Filter events</h2>
        <form class="trip-filters" action="#" method="get">
          ${createFilterTypeListTemplate(filters)}

          <button class="visually-hidden" type="submit">Accept filter</button>
        </form>
      </div>
    </div>`
  );
}

export default class FiltersView extends RadioListView {
  get template() {
    return createFiltersView(this._items);
  }
}
