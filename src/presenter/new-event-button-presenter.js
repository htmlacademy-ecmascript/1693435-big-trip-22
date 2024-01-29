import NewEventButtonView from '../view/new-event-button-view.js';
import {render} from '../framework/render.js';

export default class NewEventButtonPresenter {
  #headerParentContainer = null;
  #newPointButtonComponent = null;
  #handleButtonClick = null;

  constructor({ headerParentContainer }) {
    this.#headerParentContainer = headerParentContainer;
    this.#newPointButtonComponent = new NewEventButtonView({onAddPointBtnClick: this.#buttonClickHandler});
  }

  init({onButtonClick}) {
    this.#handleButtonClick = onButtonClick;

    render(this.#newPointButtonComponent, this.#headerParentContainer);
  }

  enableButton = () => {
    this.#newPointButtonComponent.element.disabled = false;
  };

  disableButton = () => {
    this.#newPointButtonComponent.element.disabled = true;
  };

  #buttonClickHandler = () => {
    this.#handleButtonClick();
  };
}
