import HeaderTripInfoView from '../view/header-trip-info-view.js';
import {sorting} from '../utils/sort.js';
import {SortTypes} from '../const.js';
import {RenderPosition, render, replace, remove} from '../framework/render.js';

export default class HeaderPresenter {
  #headerParentContainer = null;
  #tripHeaderInfoComponent = null;
  #eventPointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #offers = [];
  #destinations = [];

  constructor({headerParentContainer, eventPointsModel, offersModel, destinationsModel}) {
    this.#headerParentContainer = headerParentContainer;

    this.#eventPointsModel = eventPointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#eventPointsModel.addObserver(this.#handleModeChange);
  }

  init() {
    this.#renderHeaderTripInfo();
  }

  #renderHeaderTripInfo(){
    this.#offers = this.#offersModel.offers;
    this.#destinations = this.#destinationsModel.destinations;
    const eventPoints = sorting[SortTypes.DAY](this.#eventPointsModel.eventPoints);

    if (eventPoints.length) {
      const prevHeaderInfoComponent = this.#tripHeaderInfoComponent;
      this.#tripHeaderInfoComponent = new HeaderTripInfoView({
        tripRoute:this.#showTripRoute(eventPoints),
        eventDate: this.#showEventDate(eventPoints),
        totalPrice: this.#calculateTotalPrice(eventPoints)
      });

      if (prevHeaderInfoComponent === null) {
        render(this.#tripHeaderInfoComponent, this.#headerParentContainer, RenderPosition.AFTERBEGIN);
        return;
      }

      replace(this.#tripHeaderInfoComponent, prevHeaderInfoComponent);
      remove(prevHeaderInfoComponent);
    } else {
      remove(this.#tripHeaderInfoComponent);
      this.#tripHeaderInfoComponent = null;
    }
  }

  #calculateTotalOffersPrice(type, selectedOfferIds) {
    const selectedOffers = this.#offers
      .find((offer) => offer.type === type)
      .offers
      .filter((offer) => selectedOfferIds.includes(offer.id));
    const totalOffersPrice = selectedOffers.reduce((total, offer) => total + offer.price, 0);
    return totalOffersPrice;
  }

  #calculateTotalPrice(points){
    return points.reduce((total, point) => {
      total += point.basePrice + this.#calculateTotalOffersPrice(point.type, point.offers);
      return total;
    }, 0);
  }

  #showEventDate(points) {
    return {
      startDate: points[0].dateFrom,
      endDate: points[points.length - 1].dateTo
    };
  }

  #showTripRoute(points) {
    const destinationIds = points.map((point) => point.destination);

    const destinations = destinationIds.map((id) => {
      const destination = this.#destinations.find((dest) => dest.id === id);
      return destination ? destination.name : '';
    });

    let route = '';

    if (destinations.length > 3) {
      route = `${destinations[0]} &mdash; ... &mdash; ${destinations[destinations.length - 1]}`;
    } else {
      route = destinations.join(' &mdash; ');
    }

    return route;
  }

  #handleModeChange = () => {
    this.init();
  };
}
