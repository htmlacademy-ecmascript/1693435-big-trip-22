import FiltersView from '../view/filters-view.js';
import {UpdateTypes} from '../const.js';
import {render, replace, remove} from '../framework/render.js';
import {filter} from '../utils/filter.js';

export default class FiltersPresenter {
  #headerComponent = null;
  #eventPointsModel = null;
  #filtersModel = null;
  #filterComponent = null;
  #filters = [];

  constructor({headerComponent, eventPointsModel, filtersModel}) {
    this.#headerComponent = headerComponent;
    this.#eventPointsModel = eventPointsModel;
    this.#filtersModel = filtersModel;

    this.#filters = Object.entries(filter).map(([filterType, filterPoints], index) => ({
      type: filterType,
      isChecked: index === 0,
      isDisabled: !filterPoints(this.#eventPointsModel.eventPoints).length,
    }));
  }

  init() {
    const prevSortComponent = this.#filterComponent;

    this.#filterComponent = new FiltersView({
      items: this.#filters,
      onItemChange: this.#handleFilterTypeChange,
    });

    if(prevSortComponent) {
      replace(this.#filterComponent, prevSortComponent);
      remove(prevSortComponent);
    } else {
      render(this.#filterComponent, this.#headerComponent);
    }
  }

  #handleFilterTypeChange = (filterType) => {
    this.#filtersModel.set(UpdateTypes.MAJOR, filterType);
  };
}
