import {SortTypes} from '../const.js';
import {sorting} from '../utils/sort.js';
import SortPresenter from './sort-presenter.js';
import TripEventContainerView from '../view/trip-events-container-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import {render} from '../framework/render.js';
import NoEventPointsView from '../view/no-event-points-view.js';
import PointPresenter from './point-presenter.js';
import NewPointFormPresenter from './new-point-form-presenter.js';
import {updateItem} from '../utils/point.js';

export default class PointsListPresenter {
  #tripEventContainer = null;
  #eventPointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #pointsPresenter = new Map();
  #currentSortType = null;
  #defaultSortType = SortTypes.DAY;
  #sourcedEventPoints = [];

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

  get eventPoints() {
    return this.#eventPointsModel.eventPoints;
  }

  init() {
    this.#eventPoints = [...this.#eventPointsModel.eventPoints];
    this.#destinations = [...this.#destinationsModel.destinations];
    this.#sourcedEventPoints = [...this.#eventPointsModel.eventPoints];

    this.#renderEvetsPointList();
  }

  #handleDataChange = (updatePoint) => {
    this.#eventPoints = updateItem(this.#eventPoints, updatePoint);
    this.#sourcedEventPoints = updateItem(this.#sourcedEventPoints, updatePoint);
    this.#pointsPresenter.get(updatePoint.id).init(updatePoint);
  };

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
      onPointChange: this.#handleDataChange,
      onModeChange: this.#handleModeChange,
      allDestinations: this.#destinations,
    });

    pointPresenter.init(point);
    this.#pointsPresenter.set(point.id, pointPresenter);
  }

  #renderEmptyList() {
    render(new NoEventPointsView(), this.#tripEventComponent.element);
  }

  #sortEventPoints(sortType) {
    this.#currentSortType = sortType;
    this.#eventPoints = sorting[this.#currentSortType](this.#eventPoints);
  }

  #handleSortTypeChange = (sortType) => {
    this.#sortEventPoints(sortType);
    this.#clearEventPointsList();
    this.#renderPointsList();
  };

  #clearEventPointsList() {
    this.#pointsPresenter.forEach((presenter) => presenter.destroy());
    this.#pointsPresenter.clear();
  }

  #renderSort() {
    const sortPresenter = new SortPresenter({
      container: this.#tripEventComponent.element,
      handleSortTypeChange: this.#handleSortTypeChange,
      defaultSortType: this.#defaultSortType,
    });
    sortPresenter.init();
  }

  #renderPointsList() {
    this.#eventPoints.forEach((point) => {
      this.#renderWayPont(point);
    });
  }

  #handleModeChange = () => {
    this.#pointsPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderEventComponent() {
    render(this.#tripEventComponent, this.#tripEventContainer);
  }

  #renderEventsListComponent() {
    render(this.#tripEventsListComponent, this.#tripEventComponent.element);
    this.#handleSortTypeChange(this.#defaultSortType);
  }

  #renderEvetsPointList() {
    this.#renderEventComponent();

    if (!this.#eventPoints.length) {
      this.#renderEmptyList();
      return;
    }

    this.#renderSort();
    this.#renderEventsListComponent();
  }
}
