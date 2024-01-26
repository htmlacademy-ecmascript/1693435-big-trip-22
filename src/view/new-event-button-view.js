import AbstractView from '../framework/view/abstract-view.js';

function createNewEventButtonView() {
  return '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';
}

export default class NewEventButtonView extends AbstractView {
  #handleAddNewPoint = null;

  constructor ({onAddPointBtnClick}) {
    super();
    this.#handleAddNewPoint = onAddPointBtnClick;
    this.element.addEventListener('click', this.#addNewPointHandler);
  }

  get template() {
    return createNewEventButtonView();
  }

  #addNewPointHandler = (evt) => {
    evt.preventDefault();
    this.#handleAddNewPoint();
  };
}
