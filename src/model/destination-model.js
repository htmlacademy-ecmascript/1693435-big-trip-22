import Observable from '../framework/observable.js';
import {destinations} from '../mock/destinations.js';

export default class DestinationsModel extends Observable {
  #destinations = destinations;

  get destinations() {
    return this.#destinations;
  }

  getDestinationById(id) {
    return (
      this.#destinations.find((destination) => destination.id === id) || null
    );
  }
}
