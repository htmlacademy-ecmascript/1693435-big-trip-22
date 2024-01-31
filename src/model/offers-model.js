export default class OffersModel {
  #offers = [];
  #pointApiService = null;

  constructor(service) {
    this.#pointApiService = service;
  }

  async init() {
    this.#offers = await this.#pointApiService.offers;
    return this.#offers;
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
