import RadioListView from './radio-list-view.js';

function createFilterTypeTemplate(filter) {
  const { type, isChecked, isDisabled } = filter;

  return (
    `
    <div class="trip-filters__filter">
      <input
        id="filter-${type}"
        class="trip-filters__filter-input
        visually-hidden"
        type="radio"
        name="trip-filter"
        value="${type}"
        data-item="${type}"
        ${isChecked ? 'checked' : ''}
        ${isDisabled ? 'disabled' : ''}
      >
      <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
    </div>
    `
  );
}

function createFiltersView(filterTypes) {
  const filterTypesTemplate = filterTypes
    .map((filter) => createFilterTypeTemplate(filter))
    .join('');

  return (
    `
    <div class="trip-main__trip-controls  trip-controls">
      <div class="trip-controls__filters">
        <h2 class="visually-hidden">Filter events</h2>
        <form class="trip-filters" action="#" method="get">
          ${filterTypesTemplate}
          <button class="visually-hidden" type="submit">Accept filter</button>
        </form>
      </div>
    </div>
    `
  );
}

export default class FiltersView extends RadioListView {
  get template() {
    return createFiltersView(this._items);
  }
}
