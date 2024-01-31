import TripEditFormView from '../view/trip-edit-form-view.js';
import {render, remove, RenderPosition} from '../framework/render.js';
import {getDefaultPoint, UserActions, UpdateTypes, EditTypes} from '../const.js';

export default class NewPointFormPresenter {
  #tripEventContainer = null;
  #offersModel = null;
  #newFormComponent = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #destinationsModel = null;

  constructor({tripEventContainer, destinationsModel, offersModel, onDataChange, onDestroy}) {
    this.#tripEventContainer = tripEventContainer;
    this.#destinationsModel = destinationsModel;
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
      allDestinations: this.#destinationsModel.destinations,
      offers: this.#offersModel.offers,
      onSubmitForm: this.#handleFormSubmit,
      onCloseClick: this.#handleDestroyClick,
      editorMode: EditTypes.CREATING,
    });

    render(this.#newFormComponent, this.#tripEventContainer, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy({isCanceled = true}) {
    if (!this.#newFormComponent) {
      return;
    }

    this.#handleDestroy({isCanceled});

    remove(this.#newFormComponent);
    this.#newFormComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving() {
    this.#newFormComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#newFormComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#newFormComponent.shake(resetFormState);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserActions.ADD_EVENT,
      UpdateTypes.MINOR,
      point,
    );
  };

  #handleDestroyClick = () => {
    this.destroy({isCanceled: true});
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy({isCanceled: true});
    }
  };
}
