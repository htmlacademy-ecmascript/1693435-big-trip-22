import TripEditFormView from '../view/trip-edit-form-view.js';
import {render, remove} from '../framework/render.js';
import {getDefaultPoint} from '../const.js';

export default class NewPointFormPresenter {
  #tripEventContainer = null;
  #allDestinations = null;
  #offersModel = null;
  #newFormComponent = null;

  constructor({tripEventContainer, allDestinations, offersModel}) {
    this.#tripEventContainer = tripEventContainer;
    this.#allDestinations = allDestinations;
    this.#offersModel = offersModel;
  }

  init() {
    this.#newFormComponent = new TripEditFormView({
      eventPoint: getDefaultPoint(),
      allDestinations: this.#allDestinations,
      offers: this.#offersModel.getOffersByType(getDefaultPoint().type),
    });

    this.#renderNewForm();
  }

  destroy() {
    remove(this.#newFormComponent);
  }

  #renderNewForm() {
    this.#newFormComponent = new TripEditFormView({
      eventPoint: getDefaultPoint(),
      allDestinations: this.#allDestinations,
      offers: this.#offersModel.getOffersByType(getDefaultPoint().type),
    });

    render(this.#newFormComponent, this.#tripEventContainer);
  }
}
