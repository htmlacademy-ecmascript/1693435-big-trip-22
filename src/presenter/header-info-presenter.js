import HeaderTripInfoView from '../view/header-trip-info-view.js';
import {render} from '../framework/render.js';

export default class HeaderInfoPresenter {
  #headerParentContainer = null;

  constructor({headerParentContainer}) {
    this.#headerParentContainer = headerParentContainer;
  }

  init() {
    this.#renderHeaderTripInfo();
  }

  #renderHeaderTripInfo() {
    render(new HeaderTripInfoView(), this.#headerParentContainer);
  }
}
