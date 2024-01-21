import HeaderTripMainContainerView from '../view/header-main-container-view.js';
import {render} from '../framework/render.js';
import FiltersPresenter from './filter-presenter.js';
import HeaderInfoPresenter from './header-info-presenter.js';
import NewEventButtonPresenter from './new-event-button-presenter.js';

export default class HeaderPresenter {
  #headerParentContainer = null;
  #eventPointsModel = null;
  #filterModel = null;

  #headerComponent = new HeaderTripMainContainerView();

  constructor({headerParentContainer, eventPointsModel, filterModel}) {
    this.#headerParentContainer = headerParentContainer;
    this.#eventPointsModel = eventPointsModel;
    this.#filterModel = filterModel;
  }

  init() {
    this.#renderHeader();
  }

  #renderHeader() {
    this.#renderHeaderComponent();
    this.#renderHeaderTripInfo();
    this.#renderFilters();
    this.#renderNewPointButton();
  }

  #renderHeaderComponent() {
    render(this.#headerComponent, this.#headerParentContainer);
  }

  #renderHeaderTripInfo() {
    const headerInfoPresenter = new HeaderInfoPresenter({
      headerParentContainer: this.#headerComponent.element,
    });

    headerInfoPresenter.init();
  }

  #renderFilters() {
    const filtersPresenter = new FiltersPresenter({
      headerComponent: this.#headerComponent.element,
      eventPointsModel: this.#eventPointsModel.eventPoints,
    });

    filtersPresenter.init();
  }

  #renderNewPointButton() {
    const newEventButtonPresenter = new NewEventButtonPresenter({
      headerParentContainer: this.#headerComponent.element
    });

    newEventButtonPresenter.init();
  }
}
