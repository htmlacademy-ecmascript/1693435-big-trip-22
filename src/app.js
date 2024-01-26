import PointsListPresenter from './presenter/points-list-prsenter.js';
import HeaderPresenter from './presenter/header-container-prsenter.js';
import EventPointsModel from './model/points-model.js';
import DestinationsModel from './model/destination-model.js';
import OffersModel from './model/offers-model.js';
import FiltersModel from './model/filters-model.js';
import NewEventButtonPresenter from './presenter/new-event-button-presenter.js';
import FiltersPresenter from './presenter/filters-presenter.js';

const siteTripMainElement = document.querySelector('.trip-main');
const bodyMainContainer = document.querySelector('.page-body__page-main');
const bodyContainerElement = bodyMainContainer.querySelector('.page-body__container');
const eventPointsModel = new EventPointsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();
const filtersModel = new FiltersModel();

const newEventButtonPresenter = new NewEventButtonPresenter({
  headerParentContainer: siteTripMainElement,
});

const pointsListPresenter = new PointsListPresenter({
  tripEventContainer: bodyContainerElement,
  eventPointsModel,
  destinationsModel,
  offersModel,
  filtersModel,
  addPointButtonPresenter: newEventButtonPresenter,
});

const filtersPresenter = new FiltersPresenter({
  headerComponent: siteTripMainElement,
  eventPointsModel: eventPointsModel,
  filtersModel: filtersModel,
});

const headerPresenter = new HeaderPresenter({
  headerParentContainer: siteTripMainElement,
});

export default class BigTripApp {
  init() {
    headerPresenter.init();
    filtersPresenter.init();
    newEventButtonPresenter.init({onButtonClick: pointsListPresenter.addPointButtonClickHandler});
    pointsListPresenter.init();
  }
}
