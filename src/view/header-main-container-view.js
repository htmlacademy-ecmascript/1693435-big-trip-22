import {createElement} from '../render.js';

function createHeaderTripMainContainerView() {
  return '<div class="trip-main"></div>';
}

export default class HeaderTripMainContainerView {
  getTemplate() {
    return createHeaderTripMainContainerView();
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
