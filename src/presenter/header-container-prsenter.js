import {RenderPosition, render} from '../framework/render.js';
import HeaderTripInfoView from '../view/header-trip-info-view.js';

export default class HeaderPresenter {
  #headerParentContainer = null;
  #tripHeaderInfoComponent = null;

  constructor({headerParentContainer}) {
    this.#headerParentContainer = headerParentContainer;
    this.#tripHeaderInfoComponent = new HeaderTripInfoView();
  }

  init() {
    render(this.#tripHeaderInfoComponent, this.#headerParentContainer, RenderPosition.AFTERBEGIN);
  }
}
