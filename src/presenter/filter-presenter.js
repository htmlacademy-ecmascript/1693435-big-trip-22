import FiltersView from '../view/filters-view.js';
import {render} from '../framework/render.js';
import {generateFilter} from '../mock/filter.js';

export default class FiltersPresenter {
  #headerComponent = null;
  #eventPointsModel = null;

  constructor({headerComponent, eventPointsModel}) {
    this.#headerComponent = headerComponent;
    this.#eventPointsModel = eventPointsModel;
  }

  init() {
    this.#renderFilters();
  }

  #renderFilters() {
    const filters = generateFilter(this.#eventPointsModel);
    render(new FiltersView({filters}), this.#headerComponent);
  }
}
