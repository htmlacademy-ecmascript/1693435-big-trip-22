import {offers} from '../mock/offers.js';

export default class OffersModel {
  offers = offers;

  getOffers() {
    return this.offers;
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
