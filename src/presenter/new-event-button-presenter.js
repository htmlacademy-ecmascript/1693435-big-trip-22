import NewEventButtonView from '../view/new-event-button-view.js';
import {render} from '../framework/render.js';

export default class NewEventButtonPresenter {
  #headerParentContainer = null;

  constructor({headerParentContainer}) {
    this.#headerParentContainer = headerParentContainer;
  }

  init() {
    this.#renderNewPointButton();
  }

  #renderNewPointButton() {
    render(new NewEventButtonView(), this.#headerParentContainer);
  }
}
