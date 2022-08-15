import {render} from "../render";
import FilmsView from "../view/films-view";
import FilmsListView from "../view/films-list-view";
import FilmCardView from "../view/film-card-view";
import ShowMoreButtonView from "../view/show-more-button-view";
import FilmsListContainerView from "../view/films-list-container-view";
import FilmDetailsView from "../view/film-details-view";
import {isEscKeyDown} from "../utils";

export default class FilmPresenter {
  #mainContainer = null;
  #moviesModel = null;
  #filmsComponent = new FilmsView();
  #filmsListComponent = new FilmsListView();
  #filmsListContainer = new FilmsListContainerView();
  #filmDetailsComponent = null;

  #films = null;

  init = (mainContainer, moviesModel) => {
    this.#mainContainer = mainContainer;
    this.#moviesModel = moviesModel;
    this.#films = [...this.#moviesModel.films];

    render(this.#filmsComponent, this.#mainContainer);
    render(this.#filmsListComponent, this.#filmsComponent.element)
    render(this.#filmsListContainer, this.#filmsListComponent.element)

    this.#films.forEach((film) => this.#renderCard(film));

    render(new ShowMoreButtonView(), this.#filmsListComponent.element);
  }

  #renderCard(film) {
    const filmComponent = new FilmCardView(film);

    filmComponent.element.addEventListener('click', (evt) => {
      if (evt.target.className.includes('film-card__controls-item')) {
        return;
      }

      this.#openFilmDetails(film);
    })

    render(filmComponent, this.#filmsListContainer.element);
  }

  #openFilmDetails(film) {
    this.#filmDetailsComponent = new FilmDetailsView(film);

    this.#filmDetailsComponent.closeButtonElement.addEventListener('click', () => {
      this.#closeFilmDetails();
    })
    document.addEventListener('keydown', this.#onEscKeyDown);

    render(this.#filmDetailsComponent, this.#mainContainer);
  }

  #closeFilmDetails() {
    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.#filmDetailsComponent.element.remove();
    this.#filmDetailsComponent.removeElement();
  }

  #onEscKeyDown = (evt) => {
    if (isEscKeyDown(evt)) {
      this.#closeFilmDetails();
    }
  }
}
