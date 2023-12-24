import HeaderTripMainContainerView from '../view/header-main-container-view.js';
import HeaderTripInfoView from '../view/header-trip-info-view.js';
import FiltersView from '../view/filters-view.js';
import NewEventButtonView from '../view/new-event-button-view.js';
import {render} from '../framework/render.js';
import {generateFilter} from '../mock/filter.js';

export default class HeaderPresentor {
  #headerParentContainer = null;
  #eventPointsModel = null;

  #headerComponent = new HeaderTripMainContainerView();

  constructor({headerParentContainer, eventPointsModel}) {
    this.#headerParentContainer = headerParentContainer;
    this.#eventPointsModel = eventPointsModel;
  }

  init() {
    this.#renderHeader();
  }

  #renderHeader() {
    const filters = generateFilter(this.#eventPointsModel.eventPoints);

    render(this.#headerComponent, this.#headerParentContainer);
    render(new HeaderTripInfoView(), this.#headerComponent.element);
    render(new FiltersView({filters}), this.#headerComponent.element);
    render(new NewEventButtonView(), this.#headerComponent.element);
  }
}
