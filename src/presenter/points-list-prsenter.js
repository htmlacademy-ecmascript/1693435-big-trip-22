import {SortTypes, UpdateTypes, UserActions} from '../const.js';
import {sorting} from '../utils/sort.js';
import {filter} from '../utils/filter.js';
import SortPresenter from './sort-presenter.js';
import TripEventContainerView from '../view/trip-events-container-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import {remove, render} from '../framework/render.js';
import NoEventPointsView from '../view/no-event-points-view.js';
import PointPresenter from './point-presenter.js';
import NewPointFormPresenter from './new-point-form-presenter.js';

export default class PointsListPresenter {
  #tripEventContainer = null;
  #eventPointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #filterModel = null;
  #sortPresenter = null;
  #emptyListComponent = null;
  #currentSortType = SortTypes.DAY;
  #pointsPresenter = new Map();

  #tripEventComponent = new TripEventContainerView();
  #tripEventsListComponent = new TripEventsListView();

  #destinations = [];

  constructor({tripEventContainer, eventPointsModel, destinationsModel, offersModel, filterModel}) {
    this.#tripEventContainer = tripEventContainer;
    this.#eventPointsModel = eventPointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#filterModel = filterModel;

    this.#eventPointsModel.addObserver(this.#handleModelChange);
    this.#filterModel.addObserver(this.#handleModelChange);
  }

  get points() {
    const filterType = this.#filterModel.filter;
    const filteredPoints = filter[filterType](this.#eventPointsModel.eventPoints);
    return sorting[this.#currentSortType](filteredPoints);
  }

  init() {
    this.#renderBoard();
  }

  #renderBoard() {
    this.#destinations = [...this.#destinationsModel.destinations];

    this.#renderEvetsPointList();
  }

  #handleViewAction = (actionType, updateType, updatePoint) => {
    if (actionType === UserActions.ADD_EVENT) {
      this.#eventPointsModel.addPoint(updateType, updatePoint);
    }

    if (actionType === UserActions.UPDATE_EVENT) {
      this.#eventPointsModel.updatePoint(updateType, updatePoint);
    }

    if (actionType === UserActions.DELETE_EVENT) {
      this.#eventPointsModel.deletePoint(updateType, updatePoint);
    }

    // switch(actionType) {
    //   case UserActions.ADD_EVENT:
    //     this.#eventPointsModel.addPoint(updateType, updatePoint);
    //     break;
    //   case UserActions.UPDATE_EVENT:
    //     this.#eventPointsModel.updatePoint(updateType, updatePoint);
    //     break;
    //   case UserActions.DELETE_EVENT:
    //     this.#eventPointsModel.deletePoint(updateType, updatePoint);
    //     break;
    // }
  };

  #clearBoard = ({resetSortType = false} = {}) => {
    this.#clearEventPointsList();
    this.#sortPresenter.destroy();
    remove(this.#emptyListComponent);
    if (resetSortType) {
      this.#currentSortType = SortTypes.DAY;
    }
  };

  #handleModelChange = (updateType, data) => {
    if (updateType === UpdateTypes.PATCH) {
      this.#pointsPresenter.get(data?.id)?.init(data);
    }

    if (updateType === UpdateTypes.MINOR) {
      this.#clearBoard();
      this.#renderBoard();
    }

    if (updateType === UpdateTypes.MINOR) {
      this.#clearBoard({resetSortType: true});
      this.#renderBoard();
    }
    // switch(updateType) {
    //   case UpdateTypes.PATCH:
    //     this.#pointsPresenter.get(data?.id)?.init(data);
    //     break;
    //   case UpdateTypes.MINOR:
    //     this.#clearBoard();
    //     this.#renderBoard();
    //     break;
    //   case UpdateTypes.MAJOR:
    //     this.#clearBoard({resetSortType: true});
    //     this.#renderBoard();
    //     break;
    // }
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
      onPointChange: this.#handleViewAction ,
      onModeChange: this.#handleModeChange,
      allDestinations: this.#destinations,
    });

    pointPresenter.init(point);
    this.#pointsPresenter.set(point.id, pointPresenter);
  }

  #renderEmptyList() {
    this.#emptyListComponent = new NoEventPointsView({filterType: this.#filterModel.filter});
    render(this.#emptyListComponent, this.#tripEventComponent.element);
  }

  #handleSortTypeChange = (sortType) => {
    this.#currentSortType = sortType;
    this.#clearEventPointsList();
    this.#renderPointsList();
  };

  #clearEventPointsList() {
    this.#pointsPresenter.forEach((presenter) => presenter.destroy());
    this.#pointsPresenter.clear();
  }

  #renderSort() {
    this.#sortPresenter = new SortPresenter({
      container: this.#tripEventComponent.element,
      handleSortTypeChange: this.#handleSortTypeChange,
      defaultSortType: this.#currentSortType,
    });
    this.#sortPresenter.init();
  }

  #renderPointsList() {
    this.points.forEach((point) => {
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
    this.#handleSortTypeChange(this.#currentSortType);
  }

  #renderEvetsPointList() {
    this.#renderEventComponent();

    if (!this.points.length) {
      this.#renderEmptyList();
      return;
    }

    this.#renderSort();
    this.#renderEventsListComponent();
  }
}
