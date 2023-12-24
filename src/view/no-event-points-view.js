import AbstractView from '../framework/view/abstract-view.js';

function createNoEventPointsTemplate() {
  return (
    `<p class="trip-events__msg">
      Click New Event to create your first point
    </p>`
  );
}

export default class NoEventPointsView extends AbstractView {
  get template() {
    return createNoEventPointsTemplate();
  }
}
