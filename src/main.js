import BodyTripEventsContainer from './presenter/body-trip-events-prsentor.js';
import HeaderContainer from './presenter/header-container-prsentor.js';

const bodyMainContainer = document.querySelector('.page-body__page-main');
const bodyContainerElement = bodyMainContainer.querySelector('.page-body__container');
const bodyTripEventsPresenter = new BodyTripEventsContainer({tripEventContainer: bodyContainerElement});

const siteHeaderElement = document.querySelector('.page-header .page-header__container');
const headerPresenter = new HeaderContainer({headerParentContainer: siteHeaderElement});

bodyTripEventsPresenter.init();
headerPresenter.init();
