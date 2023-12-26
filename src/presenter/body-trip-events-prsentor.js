import TripEventContainerView from '../view/trip-events-container-view.js';
import TripEditFormView from '../view/trip-edit-form-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import SortingView from '../view/sorting-view.js';
import WayPointView from '../view/waypoint-view.js';
import {render, replace} from '../framework/render.js';
import {getDefaultPoint, sortingTypes} from '../const.js';
import NoEventPointsView from '../view/no-event-points-view.js';

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

    this.#renderEvetsPointList();
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

  #renderWayPont(point) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceEditorToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const wayPointComponent = new WayPointView({
      eventPoint: point,
      destination: this.#destinationsModel.getDestinationById(point.destination),
      offers: [...this.#offersModel.getOffersById(point.type, point.offers)],
      onEditClick: () => {
        pointEditHandler();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const editPointComponent = new TripEditFormView({
      eventPoint: point,
      destination: this.#destinationsModel.getDestinationById(point.destination),
      allDestinations: this.#destinations,
      selectedOffers: [...this.#offersModel.getOffersById(point.type, point.offers)],
      offers: this.#offersModel.getOffersByType(point.type),
      onCloseClick: () => {
        pointCloseHandler();
        document.addEventListener('keydown', escKeyDownHandler);
      },
      onSubmitForm: () => {
        pointSubmitHandler();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointToEditor() {
      replace(editPointComponent, wayPointComponent);
    }

    function replaceEditorToPoint() {
      replace(wayPointComponent, editPointComponent);
    }

    function pointEditHandler() {
      replacePointToEditor();
    }

    function pointCloseHandler() {
      replaceEditorToPoint();
    }

    function pointSubmitHandler() {
      replaceEditorToPoint();
    }

    render(wayPointComponent, this.#tripEventsListComponent.element);
  }

  #renderEvetsPointList() {
    render(this.#tripEventComponent, this.#tripEventContainer);

    if (!this.#eventPoints.length) {
      render(new NoEventPointsView(), this.#tripEventComponent.element);
      return;
    }

    render(new SortingView({sortingTypes}), this.#tripEventComponent.element);
    render(this.#tripEventsListComponent, this.#tripEventComponent.element);

    // this.#renderNewForm();

    for (let i = 0; i < this.#eventPoints.length; i++) {
      this.#renderWayPont(this.#eventPoints[i]);
    }
  }
}
