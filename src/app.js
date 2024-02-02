import PointsListPresenter from './presenter/points-list-presenter.js';
import HeaderPresenter from './presenter/header-presenter.js';
import PointsModel from './model/points-model.js';
import DestinationsModel from './model/destination-model.js';
import OffersModel from './model/offers-model.js';
import FiltersModel from './model/filters-model.js';
import NewEventButtonPresenter from './presenter/new-event-button-presenter.js';
import FiltersPresenter from './presenter/filters-presenter.js';
import PointApiService from './service/point-api-service.js';
import {AUTHORIZATION, SERVER_URL} from './const.js';

const siteTripMainElement = document.querySelector('.trip-main');
const bodyMainContainer = document.querySelector('.page-body__page-main');
const bodyContainerElement = bodyMainContainer.querySelector('.page-body__container');

const service = new PointApiService(SERVER_URL, AUTHORIZATION);
const destinationsModel = new DestinationsModel(service);
const offersModel = new OffersModel(service);
const pointsModel = new PointsModel({
  service,
  destinationModel: destinationsModel,
  offersModel: offersModel,
});
const filtersModel = new FiltersModel();

const newEventButtonPresenter = new NewEventButtonPresenter({
  headerParentContainer: siteTripMainElement,
});

const pointsListPresenter = new PointsListPresenter({
  tripEventContainer: bodyContainerElement,
  pointsModel,
  destinationsModel,
  offersModel,
  filtersModel,
  addPointButtonPresenter: newEventButtonPresenter,
});

const filtersPresenter = new FiltersPresenter({
  headerContainer: siteTripMainElement,
  pointsModel,
  filtersModel
});

const headerPresenter = new HeaderPresenter({
  headerParentContainer: siteTripMainElement,
  pointsModel,
  destinationsModel,
  offersModel,
});

export default class BigTripApp {
  init() {
    headerPresenter.init();
    pointsListPresenter.init();
    pointsModel.init().finally(() => {
      filtersPresenter.init();
      newEventButtonPresenter.init({onButtonClick: pointsListPresenter.addPointButtonClickHandler});
    });
  }
}
