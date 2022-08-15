import {createElement} from '../render.js';
import {getFormattedDuration, getFormattedYear} from "../utils";

const getWatchlistButtonTemplate = (inWatchlist) => (
  `<button
    class="${inWatchlist ? 'film-card__controls-item--active ' : ''}film-card__controls-item film-card__controls-item--add-to-watchlist"
    type="button">Add to watchlist</button>`
);

const getAlreadyWatchedButtonTemplate = (isWatched) => (
  `<button
    class="${isWatched ? 'film-card__controls-item--active ' : ''}film-card__controls-item film-card__controls-item--mark-as-watched"
    type="button">Mark as watched</button>`
);

const getFavoriteButtonTemplate = (isFavorite) => (
  `<button
    class="${isFavorite ? 'film-card__controls-item--active ' : ''}film-card__controls-item film-card__controls-item--favorite"
    type="button">Mark as favorite</button>`
);

const createFilmCardTemplate = (film) => {
  const {
    id,
    filmInfo: {
      title,
      alternativeTitle,
      totalRating,
      poster,
      ageRating,
      director,
      writers,
      actors,
      release,
      runtime,
      genre,
      description
    },
    userDetails: {
      watchlist,
      alreadyWatched,
      watchingDate,
      favorite
    },
    comments
  } = film;

  const year = getFormattedYear(release.date);
  const duration = getFormattedDuration(runtime);

  return (`
    <article class="film-card">
      <a class="film-card__link">
        <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${totalRating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${year}</span>
          <span class="film-card__duration">${duration}</span>
          <span class="film-card__genre">${genre[0]}</span>
        </p>
        <img src="./${poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${description}</p>
        <span class="film-card__comments">${comments.length} comments</span>
      </a>
      <div class="film-card__controls">
        ${getWatchlistButtonTemplate(watchlist)}
        ${getAlreadyWatchedButtonTemplate(alreadyWatched)}
        ${getFavoriteButtonTemplate(favorite)}
      </div>
    </article>
`);
}

export default class FilmCardView {
  #element = null;
  #film = null;

  constructor(film) {
    this.#film = film;
  }

  get template() {
    return createFilmCardTemplate(this.#film);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
