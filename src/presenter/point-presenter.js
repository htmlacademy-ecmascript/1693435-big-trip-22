import TripEditFormView from '../view/trip-edit-form-view.js';
import WayPointView from '../view/waypoint-view.js';
import {remove, render, replace} from '../framework/render.js';
import {Mode} from '../const.js';

export default class PointPresenter {
  #pointListContainer = null;
  #point = null;
  #destinationsModel = null;
  #offersModel = null;
  #wayPointComponent = null;
  #editPointComponent = null;
  #handleDataChange = null;
  #mode = Mode.DEFAULT;
  #handleModeChange = null;
  #allDestinations = null;

  constructor({pointListContainer, destinationsModel, offersModel, onPointChange, onModeChange, allDestinations}) {
    this.#pointListContainer = pointListContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#handleDataChange = onPointChange;
    this.#handleModeChange = onModeChange;
    this.#allDestinations = allDestinations;
  }

  init(point) {
    this.#point = point;

    const prevtWayPointComponent = this.#wayPointComponent;
    const prevtEditPointComponent = this.#editPointComponent;

    this.#wayPointComponent = new WayPointView({
      eventPoint: point,
      destination: this.#destinationsModel.getDestinationById(point.destination),
      offers: [...this.#offersModel.getOffersById(point.type, point.offers)],
      onEditClick: () => {
        this.#pointEditHandler();
        document.addEventListener('keydown', this.#escKeyDownHandler);
      },
      onFavoriteClick: this.#favoriteClickHandler,
    });

    this.#editPointComponent = new TripEditFormView({
      eventPoint: this.#point,
      destination: this.#destinationsModel.getDestinationById(point.destination),
      allDestinations: this.#allDestinations,
      selectedOffers: [...this.#offersModel.getOffersById(point.type, point.offers)],
      offers: this.#offersModel.offers,
      onCloseClick: this.#pointCloseHandler,
      onSubmitForm: this.#pointSubmitHandler,
    });

    if (prevtWayPointComponent === null || prevtEditPointComponent === null) {
      render(this.#wayPointComponent, this.#pointListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      this.#editPointComponent.reset(this.#point);
      replace(this.#wayPointComponent, prevtWayPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#editPointComponent, prevtEditPointComponent);
    }

    remove(prevtWayPointComponent);
    remove(prevtEditPointComponent);
  }

  get offers() {
    return this.#offersModel.offers;
  }

  get destinations() {
    return this.#allDestinations;
  }

  destroy() {
    remove(this.#wayPointComponent);
    remove(this.#editPointComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceEditorToPoint();
    }
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#editPointComponent.reset(this.#point);
      this.#replaceEditorToPoint();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #replacePointToEditor = () => {
    replace(this.#editPointComponent, this.#wayPointComponent);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  };

  #replaceEditorToPoint = () => {
    replace(this.#wayPointComponent, this.#editPointComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  };

  #pointEditHandler = () => {
    this.#replacePointToEditor();
  };

  #pointCloseHandler = () => {
    this.#editPointComponent.reset(this.#point);
    this.#replaceEditorToPoint();
  };

  #pointSubmitHandler = (point) => {
    this.#replaceEditorToPoint();
    this.#handleDataChange(point);
  };

  #favoriteClickHandler = () => {
    this.#handleDataChange({
      ...this.#point,
      isFavorite: !this.#point.isFavorite
    });
  };
}
