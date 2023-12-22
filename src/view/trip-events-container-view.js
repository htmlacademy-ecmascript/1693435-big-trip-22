import AbstractView from '../framework/view/abstract-view.js';

function createTripEventContainerView() {
  return `<section class="trip-events">
    <h2 class="visually-hidden">Trip events</h2>
    </section>`;
}

export default class TripEventContainerView extends AbstractView {
  get template() {
    return createTripEventContainerView();
  }
}
