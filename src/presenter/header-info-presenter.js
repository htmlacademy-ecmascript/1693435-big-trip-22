import HeaderTripInfoView from '../view/header-trip-info-view.js';
import {render} from '../framework/render.js';

export default class HeaderInfoPresenter {
  #headerParentContainer = null;
  #eventPointsModel = null;

  constructor({headerParentContainer, eventPointsModel}) {
    this.#headerParentContainer = headerParentContainer;
    this.#eventPointsModel = eventPointsModel;
  }

  init() {
    this.#renderHeaderTripInfo();
  }

  #renderHeaderTripInfo() {
    render(new HeaderTripInfoView(), this.#headerParentContainer);
  }
}
