import TripEventContainerView from '../view/trip-events-container-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import SortingView from '../view/sorting-view.js';
import {sortingTypes} from '../const.js';
import {sortByPrice, sortByTime} from '../utils/point.js';
import {render, RenderPosition} from '../framework/render.js';
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
  #sortComponent = null;
  #currentSortType = sortingTypes[0].type;
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
    switch(sortType) {
      case 'day':
        this.#eventPoints = [...this.#sourcedEventPoints];
        break;
      case 'time':
        this.#eventPoints.sort(sortByTime);
        break;
      case 'price':
        this.#eventPoints.sort(sortByPrice);
        break;
    }

    this.#currentSortType = sortType.type;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortEventPoints(sortType);
    this.#clearEventPointsList();
    this.#renderPointsList();
  };

  #clearEventPointsList() {
    this.#pointsPresenter.forEach((presenter) => presenter.destroy());
    this.#pointsPresenter.clear();
  }

  #renderSort() {
    this.#sortComponent = new SortingView({
      sortingTypes,
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#tripEventComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderPointsList() {
    for (let i = 0; i < this.#eventPoints.length; i++) {
      this.#renderWayPont(this.#eventPoints[i]);
    }
  }

  #handleModeChange = () => {
    this.#pointsPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderEventComponent() {
    render(this.#tripEventComponent, this.#tripEventContainer);
  }

  #renderEventsListComponent() {
    render(this.#tripEventsListComponent, this.#tripEventComponent.element);
  }

  #renderEvetsPointList() {
    this.#renderEventComponent();

    if (!this.#eventPoints.length) {
      this.#renderEmptyList();
      return;
    }

    this.#renderSort();
    this.#renderEventsListComponent();

    this.#renderPointsList();
  }
}
