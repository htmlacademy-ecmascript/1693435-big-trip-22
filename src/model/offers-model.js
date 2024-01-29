import {UpdateTypes} from '../const.js';
import Observable from '../framework/observable.js';

export default class OffersModel extends Observable {
  #offers = [];
  #pointApiService = null;

  constructor(service) {
    super();

    this.#pointApiService = service;
  }

  async init() {
    try {
      this.#offers = await this.#pointApiService.offers;
    } catch(err) {
      this.#offers = [];
    }

    this._notify(UpdateTypes.INIT);
  }

  get offers() {
    return this.#offers;
  }

  getOffersByType(type) {
    return (
      this.offers.find((offer) => offer.type === type) || null
    );
  }

  getOffersById(type, offersId) {
    const offersType = this.getOffersByType(type);

    return (
      offersType.offers.filter((item) => offersId.find((id) => item.id === id) || null)
    );
  }
}
