import TripEditFormView from '../view/trip-edit-form-view.js';
import WayPointView from '../view/waypoint-view.js';
import {remove, render, replace} from '../framework/render.js';
import {Mode, UpdateTypes, UserActions} from '../const.js';
import {isMinorChange} from '../utils/point.js';

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

  constructor({pointListContainer, destinationsModel, offersModel, onPointChange, onModeChange}) {
    this.#pointListContainer = pointListContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#handleDataChange = onPointChange;
    this.#handleModeChange = onModeChange;
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
      allDestinations: this.#destinationsModel.destinations,
      offers: this.#offersModel.offers,
      onCloseClick: this.#pointCloseHandler,
      onSubmitForm: this.#pointSubmitHandler,
      onDeleteClick: this.#handleDeleteClick,
    });

    if (prevtWayPointComponent === null || prevtEditPointComponent === null) {
      render(this.#wayPointComponent, this.#pointListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#wayPointComponent, prevtWayPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#wayPointComponent, prevtEditPointComponent);
      this.#mode = Mode.DEFAULT;
    }

    remove(prevtWayPointComponent);
    remove(prevtEditPointComponent);
  }

  get offers() {
    return this.#offersModel.offers;
  }

  get destinations() {
    return this.#destinationsModel.destinations;
  }

  destroy() {
    remove(this.#wayPointComponent);
    remove(this.#editPointComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#editPointComponent.reset(this.#point);
      this.#replaceEditorToPoint();
    }
  }

  setSaving() {
    if (this.#mode === Mode.EDITING) {
      this.#editPointComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  }

  setDeleting() {
    if (this.#mode === Mode.EDITING) {
      this.#editPointComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  }

  setAborting() {
    if (this.#mode === Mode.DEFAULT) {
      this.#wayPointComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#editPointComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#editPointComponent.shake(resetFormState);
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
    this.#mode = Mode.DEFAULT;
  };

  #pointEditHandler = () => {
    this.#replacePointToEditor();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #pointCloseHandler = () => {
    this.#editPointComponent.reset(this.#point);
    this.#replaceEditorToPoint();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #pointSubmitHandler = (point) => {
    const currentTypeChange = isMinorChange(point, this.#point) ? UpdateTypes.MINOR : UpdateTypes.PATCH;
    this.#handleDataChange(
      UserActions.UPDATE_EVENT,
      currentTypeChange,
      point
    );
  };

  #handleDeleteClick = (point) => {
    this.#handleDataChange(
      UserActions.DELETE_EVENT,
      UpdateTypes.MINOR,
      point,
    );
  };

  #favoriteClickHandler = () => {
    this.#handleDataChange(
      UserActions.UPDATE_EVENT,
      UpdateTypes.PATCH,
      {
        ...this.#point,
        isFavorite: !this.#point.isFavorite
      });
  };
}
