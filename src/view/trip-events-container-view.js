import {createElement} from '../render.js';

function createTripEventContainerView() {
  return `<section class="trip-events">
    <h2 class="visually-hidden">Trip events</h2>
    </section>`;
}

export default class TripEventContainerView {
  getTemplate() {
    return createTripEventContainerView();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
