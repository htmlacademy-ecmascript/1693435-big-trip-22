import PointsListPresenter from './presenter/points-list-prsenter.js';
import HeaderPresenter from './presenter/header-container-prsenter.js';
import EventPointsModel from './model/points-model.js';
import DestinationsModel from './model/destination-model.js';
import OffersModel from './model/offers-model.js';
import FilterModel from './model/filter-model.js';

const bodyMainContainer = document.querySelector('.page-body__page-main');
const bodyContainerElement = bodyMainContainer.querySelector('.page-body__container');
const eventPointsModel = new EventPointsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();
const filterModel = new FilterModel();
const pointsListPresenter = new PointsListPresenter({
  tripEventContainer: bodyContainerElement,
  eventPointsModel,
  destinationsModel,
  offersModel,
  filterModel,
});

const siteHeaderElement = document.querySelector('.page-header .page-header__container');
const headerPresenter = new HeaderPresenter({
  headerParentContainer: siteHeaderElement,
  eventPointsModel,
  filterModel,
});

export default class BigTripApp {
  init() {
    pointsListPresenter.init();
    headerPresenter.init();
  }
}
