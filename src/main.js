import BodyTripEventsContainer from './presenter/body-trip-events-prsentor.js';
import HeaderContainer from './presenter/header-container-prsentor.js';
import EventPointsModel from './model/points-model.js';
import DestinationsModel from './model/destination-model.js';
import OffersModel from './model/offers-model.js';

const bodyMainContainer = document.querySelector('.page-body__page-main');
const bodyContainerElement = bodyMainContainer.querySelector('.page-body__container');
const eventPointsModel = new EventPointsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();
const bodyTripEventsPresenter = new BodyTripEventsContainer({
  tripEventContainer: bodyContainerElement,
  eventPointsModel,
  destinationsModel,
  offersModel
});

const siteHeaderElement = document.querySelector('.page-header .page-header__container');
const headerPresenter = new HeaderContainer({headerParentContainer: siteHeaderElement});

bodyTripEventsPresenter.init();
headerPresenter.init();
