import FiltersView from '../view/filters-view.js';
import {UpdateTypes} from '../const.js';
import {render, replace, remove} from '../framework/render.js';
import {filter} from '../utils/filter.js';

export default class FiltersPresenter {
  #headerContainer = null;
  #eventPointsModel = null;
  #filterModel = null;
  #filterComponent = null;

  constructor({headerContainer, eventPointsModel, filtersModel}) {
    this.#headerContainer = headerContainer;
    this.#eventPointsModel = eventPointsModel;
    this.#filterModel = filtersModel;
    this.#eventPointsModel.addObserver(this.#handleModeChange);
    this.#filterModel.addObserver(this.#handleModeChange);
  }

  get filters() {
    const eventPoints = this.#eventPointsModel.eventPoints;

    return Object.entries(filter).map(
      ([filterType, filterPoints]) => ({
        type: filterType,
        isChecked: filterType === this.#filterModel.filter,
        isDisabled: !filterPoints(eventPoints).length
      })
    );
  }

  init() {
    this.#renderFilters();
  }

  #renderFilters() {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FiltersView({
      items: filters,
      onItemChange: this.#handleFilterTypeChange
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#headerContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModeChange = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    this.#filterModel.set(UpdateTypes.MAJOR, filterType);
  };
}
