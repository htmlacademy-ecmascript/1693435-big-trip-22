import { EmptyListMessages } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

function createNoEventPointsTemplate({message}) {
  return (
    `<p class="trip-events__msg">
      ${message}
    </p>`
  );
}

export default class NoEventPointsView extends AbstractView {
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoEventPointsTemplate({message: EmptyListMessages[this.#filterType.toUpperCase()]});
  }
}
