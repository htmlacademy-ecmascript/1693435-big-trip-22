import TripEventContainerView from '../view/trip-events-container-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import {render} from '../framework/render.js';
import NoEventPointsView from '../view/no-event-points-view.js';
import PointPresenter from './point-presenter.js';
import SortPresenter from './sorting-presenter.js';
import NewPointFormPresenter from './new-point-form-presenter.js';

export default class BodyTripEventsPresenter {
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
    const newPointFormPresenter = new NewPointFormPresenter({
      tripEventContainer: this.#tripEventsListComponent.element,
      allDestinations: this.#destinations,
      offersModel: this.#offersModel,
    });

    newPointFormPresenter.init();
  }

  #renderWayPont(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#tripEventsListComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
    });

    pointPresenter.init(point);
  }

  #renderTripEventComponent() {
    render(this.#tripEventComponent, this.#tripEventContainer);
  }

  #renderEmptyList() {
    render(new NoEventPointsView(), this.#tripEventComponent.element);
  }

  #renderSort() {
    const sortPresenter = new SortPresenter({
      sortContainer: this.#tripEventComponent.element
    });

    sortPresenter.init();
  }

  #renderListContainer() {
    render(this.#tripEventsListComponent, this.#tripEventComponent.element);
  }

  #renderPointsList() {
    for (let i = 0; i < this.#eventPoints.length; i++) {
      this.#renderWayPont(this.#eventPoints[i]);
    }
  }

  #renderEvetsPointList() {
    this.#renderTripEventComponent();

    if (!this.#eventPoints.length) {
      this.#renderEmptyList();
      return;
    }

    this.#renderSort();
    this.#renderListContainer();

    this.#renderPointsList();
  }
}
