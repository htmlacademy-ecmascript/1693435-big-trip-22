import HeaderTripMainContainerView from '../view/header-main-container-view.js';
import HeaderTripInfoView from '../view/header-trip-info-view.js';
import FiltersView from '../view/filters-view.js';
import NewEventButtonView from '../view/new-event-button-view.js';
import {render} from '../render.js';

export default class HeaderContainer {
  headerComponent = new HeaderTripMainContainerView();

  constructor({headerParentContainer}) {
    this.headerParentContainer = headerParentContainer;
  }

  init() {
    render(this.headerComponent, this.headerParentContainer);
    render(new HeaderTripInfoView(), this.headerComponent.getElement());
    render(new FiltersView(), this.headerComponent.getElement());
    render(new NewEventButtonView(), this.headerComponent.getElement());
  }
}
