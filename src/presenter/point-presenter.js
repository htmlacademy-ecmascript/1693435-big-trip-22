import TripEditFormView from '../view/trip-edit-form-view.js';
import WayPointView from '../view/waypoint-view.js';
import {render, replace} from '../framework/render.js';

export default class PointPresenter {
  #pointListContainer = null;
  #point = null;
  #destinationsModel = null;
  #offersModel = null;
  #wayPointComponent = null;
  #editPointComponent = null;

  #destinations = [];

  constructor({pointListContainer, destinationsModel, offersModel}) {
    this.#pointListContainer = pointListContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init(point) {
    this.#point = point;

    this.#wayPointComponent = new WayPointView({
      eventPoint: point,
      destination: this.#destinationsModel.getDestinationById(point.destination),
      offers: [...this.#offersModel.getOffersById(point.type, point.offers)],
      onEditClick: () => {
        this.#pointEditHandler();
        document.addEventListener('keydown', this.#escKeyDownHandler);
      }
    });

    this.#editPointComponent = new TripEditFormView({
      eventPoint: this.#point,
      destination: this.#destinationsModel.getDestinationById(point.destination),
      allDestinations: this.#destinations,
      selectedOffers: [...this.#offersModel.getOffersById(point.type, point.offers)],
      offers: this.#offersModel.getOffersByType(point.type),
      onCloseClick: () => {
        this.#pointCloseHandler();
        document.addEventListener('keydown', this.#escKeyDownHandler);
      },
      onSubmitForm: () => {
        this.#pointSubmitHandler();
        document.addEventListener('keydown', this.#escKeyDownHandler);
      }
    });

    render(this.#wayPointComponent, this.#pointListContainer);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceEditorToPoint();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #replacePointToEditor() {
    replace(this.#editPointComponent, this.#wayPointComponent);
  }

  #replaceEditorToPoint() {
    replace(this.#wayPointComponent, this.#editPointComponent);
  }

  #pointEditHandler() {
    this.#replacePointToEditor();
  }

  #pointCloseHandler() {
    this.#replaceEditorToPoint();
  }

  #pointSubmitHandler() {
    this.#replaceEditorToPoint();
  }
}
