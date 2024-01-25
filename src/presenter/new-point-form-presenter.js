import TripEditFormView from '../view/trip-edit-form-view.js';
import {render, remove} from '../framework/render.js';
import {getDefaultPoint, UserActions, UpdateTypes} from '../const.js';

export default class NewPointFormPresenter {
  #tripEventContainer = null;
  #allDestinations = null;
  #offersModel = null;
  #newFormComponent = null;
  #handleDataChange = null;
  #handleDestroy = null;

  constructor({tripEventContainer, allDestinations, offersModel, onDataChange, onDestroy}) {
    this.#tripEventContainer = tripEventContainer;
    this.#allDestinations = allDestinations;
    this.#offersModel = offersModel;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    if (this.#newFormComponent !== null) {
      return;
    }

    this.#newFormComponent = new TripEditFormView({
      eventPoint: getDefaultPoint(),
      allDestinations: this.#allDestinations,
      offers: this.#offersModel.getOffersByType(getDefaultPoint().type),
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
    });

    render(this.#newFormComponent, this.#tripEventContainer);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#newFormComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#newFormComponent);
    this.#newFormComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserActions.ADD_POINT,
      UpdateTypes.MINOR,
      {...point},
    );

    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
