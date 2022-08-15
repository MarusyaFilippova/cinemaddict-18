import {render} from "../render";
import FilmsView from "../view/films-view";
import FilmsListView from "../view/films-list-view";
import FilmCardView from "../view/film-card-view";
import ShowMoreButtonView from "../view/show-more-button-view";
import FilmsListContainerView from "../view/films-list-container-view";

export default class FilmPresenter {
  filmsComponent = new FilmsView();
  filmsListComponent = new FilmsListView();
  filmsListContainer = new FilmsListContainerView();

  init = (filmContainer, moviesModel) => {
    this.filmContainer = filmContainer;
    this.MoviesModel = moviesModel;
    this.films = [...this.MoviesModel.films];

    render(this.filmsComponent, this.filmContainer);
    render(this.filmsListComponent, this.filmsComponent.element)
    render(this.filmsListContainer, this.filmsListComponent.element)

    this.films.forEach((film) => render(new FilmCardView(film), this.filmsListContainer.element));

    render(new ShowMoreButtonView(), this.filmsListComponent.element);
  }
}
