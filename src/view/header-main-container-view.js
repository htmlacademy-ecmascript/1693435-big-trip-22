import AbstractView from '../framework/view/abstract-view.js';

function createHeaderTripMainContainerView() {
  return '<div class="trip-main"></div>';
}

export default class HeaderTripMainContainerView extends AbstractView {
  get template() {
    return createHeaderTripMainContainerView();
  }
}
