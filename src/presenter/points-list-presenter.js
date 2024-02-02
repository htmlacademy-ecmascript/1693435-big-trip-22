import SortPresenter from './sort-presenter.js';
import TripEventContainerView from '../view/trip-events-container-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import NoEventPointsView from '../view/no-event-points-view.js';
import PointPresenter from './point-presenter.js';
import NewPointFormPresenter from './new-point-form-presenter.js';
import LoadingView from '../view/loading-view.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import {SortTypes, FilterTypes, UpdateTypes, UserActions, TimeLimit} from '../const.js';
import {sorting} from '../utils/sort.js';
import {filter} from '../utils/filter.js';
import {RenderPosition, remove, render} from '../framework/render.js';

export default class PointsListPresenter {
  #tripEventContainer = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #filtersModel = null;
  #sortPresenter = null;
  #emptyListComponent = null;
  #addPointPresenter = null;
  #addPointButtonPresenter = null;
  #isCreating = false;
  #isLoading = true;

  #currentSortType = SortTypes.DAY;
  #pointsPresenter = new Map();

  #tripEventComponent = new TripEventContainerView();
  #tripEventsListComponent = new TripEventsListView();
  #loadingComponent = new LoadingView();
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  #destinations = [];

  constructor({tripEventContainer, pointsModel, destinationsModel, offersModel, filtersModel, addPointButtonPresenter}) {
    this.#tripEventContainer = tripEventContainer;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#filtersModel = filtersModel;
    this.#addPointButtonPresenter = addPointButtonPresenter;
    this.#addPointPresenter = new NewPointFormPresenter({
      tripEventContainer: this.#tripEventsListComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.#handleViewAction,
      onDestroy: this.#addPointDestroyHandler,
    });

    this.#pointsModel.addObserver(this.#handleModelChange);
    this.#filtersModel.addObserver(this.#handleModelChange);
  }

  get points() {
    const filterType = this.#filtersModel.filter;
    const filteredPoints = filter[filterType](this.#pointsModel.eventPoints);
    return sorting[this.#currentSortType](filteredPoints);
  }

  init() {
    this.#renderBoard();
  }

  addPointButtonClickHandler = () => {
    this.#isCreating = true;
    this.#currentSortType = SortTypes.DAY;
    this.#filtersModel.set(UpdateTypes.MAJOR, FilterTypes.EVERYTHING);
    this.#addPointButtonPresenter.disableButton();
    this.#addPointPresenter.init();
    if (this.#emptyListComponent) {
      remove(this.#emptyListComponent);
    }
  };

  #addPointDestroyHandler = ({isCanceled}) => {
    this.#isCreating = false;
    this.#addPointButtonPresenter.enableButton();
    if (!this.points.length && isCanceled) {
      // this.#clearBoard();
      if (this.#sortPresenter) {
        this.#sortPresenter.destroy();
      }
      this.#renderBoard();
    }
  };

  #renderBoard() {
    this.#destinations = [...this.#destinationsModel.destinations];

    this.#renderEvetsPointList();
  }

  #handleViewAction = async (actionType, updateType, updatePoint) => {
    this.#uiBlocker.block();
    switch(actionType) {
      case UserActions.ADD_EVENT:
        this.#addPointPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, updatePoint);
        } catch (error) {
          this.#addPointPresenter.setAborting();
        }
        break;
      case UserActions.UPDATE_EVENT:
        this.#pointsPresenter.get(updatePoint.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, updatePoint);
        } catch (error) {
          this.#pointsPresenter.get(updatePoint.id).setAborting();
        }
        break;
      case UserActions.DELETE_EVENT:
        this.#pointsPresenter.get(updatePoint.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, updatePoint);
        } catch (error) {
          this.#pointsPresenter.get(updatePoint.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  #handleModelChange = (updateType, data) => {
    switch(updateType) {
      case UpdateTypes.PATCH:
        this.#pointsPresenter.get(data.id).init(data);
        break;
      case UpdateTypes.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateTypes.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
      case UpdateTypes.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
      case UpdateTypes.ERROR:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderEmptyList(UpdateTypes.ERROR);
    }
  };

  #clearBoard = ({resetSortType = false} = {}) => {
    this.#addPointPresenter.destroy({isCanceled: true});
    this.#clearEventPointsList();

    if (this.#sortPresenter) {
      this.#sortPresenter.destroy();
    }

    if (this.#emptyListComponent) {
      remove(this.#emptyListComponent);
    }

    if (this.#loadingComponent) {
      remove(this.#loadingComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortTypes.DAY;
    }
  };

  #clearEventPointsList() {
    this.#pointsPresenter.forEach((presenter) => presenter.destroy());
    this.#pointsPresenter.clear();
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

  #renderLoading() {
    render(this.#loadingComponent, this.#tripEventComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderEmptyList(type) {
    this.#emptyListComponent = new NoEventPointsView({filterType: type});
    render(this.#emptyListComponent, this.#tripEventComponent.element);
  }

  #handleSortTypeChange = (sortType) => {
    this.#currentSortType = sortType;
    this.#clearEventPointsList();
    this.#renderPointsList();
  };

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
    this.#addPointPresenter.destroy({isCanceled: true});
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
    this.#renderEventsListComponent();

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (!this.points.length) {
      this.#renderEmptyList(this.#filtersModel.filter);
      return;
    }

    this.#renderSort();
  }
}
