import {render, RenderPosition} from './render.js';
import FilmPresenter from "./presenter/film-presenter";
import ProfileView from "./view/profile-view";
import MainNavigationView from "./view/main-navigation-view";
import SortView from "./view/sort-view";
import StatisticsView from "./view/statistics-view";
import FilmDetailsView from "./view/film-details-view";
import MoviesModel from "./model/movies-modal";
const moviesModel = new MoviesModel();

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const footerStatisticsElement = siteFooterElement.querySelector('.footer__statistics');

const filmPresenter = new FilmPresenter();

render(new ProfileView(), siteHeaderElement);
render(new MainNavigationView(), siteMainElement);
render(new SortView(), siteMainElement);

filmPresenter.init(siteMainElement, moviesModel);

render(new StatisticsView(), footerStatisticsElement);

render(new FilmDetailsView(moviesModel.films[0]), siteFooterElement, RenderPosition.AFTEREND);
