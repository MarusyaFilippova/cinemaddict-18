import {render} from "../render";
import FilmsView from "../view/films-view";
import FilmsListView from "../view/films-list-view";
import FilmCardView from "../view/film-card-view";
import ShowMoreButtonView from "../view/show-more-button-view";
import FilmsListContainerView from "../view/films-list-container-view";

const FILM_AMOUNT = 5;

export default class FilmPresenter {
  filmsComponent = new FilmsView();
  filmsListComponent = new FilmsListView();
  filmsListContainer = new FilmsListContainerView();

  init = (filmContainer) => {
    this.filmContainer = filmContainer;

    render(this.filmsComponent, this.filmContainer);
    render(this.filmsListComponent, this.filmsComponent.getElement())
    render(this.filmsListContainer, this.filmsListComponent.getElement())

    for (let i = 0; i < FILM_AMOUNT; i++) {
      render(new FilmCardView(), this.filmsListContainer.getElement())
    }

    render(new ShowMoreButtonView(), this.filmsListComponent.getElement());
  }
}
