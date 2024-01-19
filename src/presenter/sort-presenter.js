import {render} from '../framework/render.js';
import {SortTypes, EnabledSortType} from '../const.js';
import SortingView from '../view/sorting-view.js';

export default class SortPresenter {
  #container = null;
  #sortTypes = [];
  #defaultSortType = null;
  #handleSortTypeChange = null;

  constructor({container, handleSortTypeChange, defaultSortType}) {
    this.#container = container;
    this.#defaultSortType = defaultSortType;
    this.#sortTypes = Object.values(SortTypes).map((type) => ({
      type,
      isChecked: type === this.#defaultSortType,
      isDisabled: !EnabledSortType[type],
    }));
    this.#handleSortTypeChange = handleSortTypeChange;
  }

  init() {
    render(
      new SortingView({
        items: this.#sortTypes,
        onItemChange: this.#handleSortTypeChange,
      }),
      this.#container,
    );
  }
}
