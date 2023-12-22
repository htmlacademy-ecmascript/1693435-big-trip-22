import TripEventContainerView from '../view/trip-events-container-view.js';
import TripEditFormView from '../view/trip-edit-form-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import SortingView from '../view/sorting-view.js';
import WayPointView from '../view/waypoint-view.js';
import {render} from '../framework/render.js';
import {getDefaultPoint} from '../const.js';

export default class BodyTripEventsPresentor {
  #tripEventContainer = null;
  #eventPointsModel = null;
  #destinationsModel = null;
  #offersModel = null;

  #tripEventComponent = new TripEventContainerView();
  #tripEventsListComponent = new TripEventsListView();

  #eventPoints = [];
  #destinations = [];

  constructor({tripEventContainer, eventPointsModel, destinationsModel, offersModel}) {
    this.#tripEventContainer = tripEventContainer;
    this.#eventPointsModel = eventPointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init() {
    this.#eventPoints = [...this.#eventPointsModel.eventPoints];
    this.#destinations = [...this.#destinationsModel.destinations];

    render(this.#tripEventComponent, this.#tripEventContainer);
    render(new SortingView(), this.#tripEventComponent.element);
    render(this.#tripEventsListComponent, this.#tripEventComponent.element);

    this.#renderNewForm();

    for (let i = 0; i < this.#eventPoints.length; i++) {
      const destination = this.#destinationsModel.getDestinationById(this.#eventPoints[i].destination);
      const offers = [...this.#offersModel.getOffersById(this.#eventPoints[i].type, this.#eventPoints[i].offers)];

      this.#renderWayPont(this.#eventPoints[i], destination, offers);
    }

    this.#renderEditForm();
  }

  #renderNewForm() {
    const newFormComponent = new TripEditFormView({
      eventPoint: getDefaultPoint(),
      destination: this.#destinationsModel.getDestinationById(getDefaultPoint().destination),
      allDestinations: this.#destinations,
      offers: this.#offersModel.getOffersByType(getDefaultPoint().type),
    });

    render(newFormComponent, this.#tripEventsListComponent.element);
  }

  #renderWayPont(point, destination, offers) {
    const wayPointComponent = new WayPointView({
      eventPoint: point,
      destination,
      offers,
    });

    render(wayPointComponent, this.#tripEventsListComponent.element);
  }

  #renderEditForm() {
    const editFormComponent = new TripEditFormView({
      eventPoint: this.#eventPoints[0],
      destination: this.#destinationsModel.getDestinationById(this.#eventPoints[0].destination),
      allDestinations: this.#destinations,
      selectedOffers: [...this.#offersModel.getOffersById(this.#eventPoints[0].type, this.#eventPoints[0].offers)],
      offers: this.#offersModel.getOffersByType(this.#eventPoints[0].type),
    });

    render(editFormComponent, this.#tripEventsListComponent.element);
  }
}
