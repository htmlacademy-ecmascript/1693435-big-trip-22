import {RenderPosition, remove, render, replace} from '../framework/render.js';
import {SortTypes, EnabledSortType} from '../const.js';
import SortingView from '../view/sorting-view.js';

export default class SortPresenter {
  #container = null;
  #sortTypes = [];
  #defaultSortType = null;
  #handleSortTypeChange = null;
  #sortComponent = null;

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
    const prevSortComponent = this.#sortComponent;

    this.#sortComponent = new SortingView({
      items: this.#sortTypes,
      onItemChange: this.#handleSortTypeChange,
    });

    if(prevSortComponent) {
      replace(this.#sortComponent, prevSortComponent);
      remove(prevSortComponent);
    } else {
      render(this.#sortComponent, this.#container, RenderPosition.AFTERBEGIN);
    }
  }

  destroy() {
    remove(this.#sortComponent);
  }
}
