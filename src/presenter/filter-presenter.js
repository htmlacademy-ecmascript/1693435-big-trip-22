import FiltersView from '../view/filters-view.js';
import {render} from '../framework/render.js';
import {generateFilter} from '../mock/filter.js';

export default class FiltersPresenter {
  #headerComponent = null;
  #eventPointsModel = null;
  #filters = null;
  #filterModel = null;

  constructor({headerComponent, eventPointsModel, filterModel}) {
    this.#headerComponent = headerComponent;
    this.#eventPointsModel = eventPointsModel;
    this.#filterModel = filterModel;
  }

  init() {
    const filters = generateFilter(this.#eventPointsModel);
    this.#filters = new FiltersView({filters});

    this.#renderFilters();
  }

  #renderFilters() {
    render(this.#filters, this.#headerComponent);
  }
}
