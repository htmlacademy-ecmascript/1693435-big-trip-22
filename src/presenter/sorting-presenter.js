import SortingView from '../view/sorting-view.js';
import {render} from '../framework/render.js';
import {sortingTypes} from '../const.js';

export default class SortPresenter {
  #sortContainer = null;

  constructor({sortContainer}) {
    this.#sortContainer = sortContainer;
  }

  init() {
    this.#renderSortingView();
  }

  #renderSortingView() {
    render(new SortingView({sortingTypes}), this.#sortContainer);
  }
}
