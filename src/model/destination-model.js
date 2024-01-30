import {UpdateTypes} from '../const.js';
import Observable from '../framework/observable.js';

export default class DestinationsModel extends Observable {
  #destinations = [];
  #pointApiService = null;

  constructor(service) {
    super();

    this.#pointApiService = service;
  }

  get destinations() {
    return this.#destinations;
  }

  getDestinationById(id) {
    return (
      this.#destinations.find((destination) => destination.id === id) || null
    );
  }

  async init() {
    try {
      this.#destinations = await this.#pointApiService.destinations;
    } catch(err) {
      this.#destinations = [];
    }

    this._notify(UpdateTypes.INIT);
  }
}
