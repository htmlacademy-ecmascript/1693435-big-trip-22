import HeaderTripMainContainerView from '../view/header-main-container-view.js';
import HeaderTripInfoView from '../view/header-trip-info-view.js';
import FiltersView from '../view/filters-view.js';
import NewEventButtonView from '../view/new-event-button-view.js';
import {render} from '../framework/render.js';

export default class HeaderPresentor {
  #headerParentContainer = null;

  #headerComponent = new HeaderTripMainContainerView();

  constructor({headerParentContainer}) {
    this.#headerParentContainer = headerParentContainer;
  }

  init() {
    render(this.#headerComponent, this.#headerParentContainer);
    render(new HeaderTripInfoView(), this.#headerComponent.element);
    render(new FiltersView(), this.#headerComponent.element);
    render(new NewEventButtonView(), this.#headerComponent.element);
  }
}
