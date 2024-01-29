import Observable from '../framework/observable.js';
import {FilterTypes} from '../const.js';

export default class FiltersModel extends Observable {
  #filter = FilterTypes.EVERYTHING;

  get filter() {
    return this.#filter;
  }

  set(updateType, updatedFilter) {
    this.#filter = updatedFilter;
    this._notify(updateType, updatedFilter);
  }
}
