import TripEditFormView from '../view/trip-edit-form-view.js';
import {render} from '../framework/render.js';
import {getDefaultPoint} from '../const.js';

export default class NewPointFormPresenter {
  #tripEventContainer = null;
  #allDestinations = null;
  #offersModel = null;

  constructor({tripEventContainer, allDestinations, offersModel}) {
    this.#tripEventContainer = tripEventContainer;
    this.#allDestinations = allDestinations;
    this.#offersModel = offersModel;
  }

  init() {
    this.#renderNewForm();
  }

  #renderNewForm() {
    const newFormComponent = new TripEditFormView({
      eventPoint: getDefaultPoint(),
      allDestinations: this.#allDestinations,
      offers: this.#offersModel.getOffersByType(getDefaultPoint().type),
    });

    render(newFormComponent, this.#tripEventContainer);
  }
}
