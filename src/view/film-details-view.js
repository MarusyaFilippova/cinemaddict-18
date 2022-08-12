import {createElement} from '../render.js';
import {getFormattedDuration, getFormattedReleaseDate} from "../utils";
import {getFilmCommentsTemplate} from "../template/film-comments-template";

const getWatchlistButtonTemplate = (inWatchlist) => (
  `<button
    type="button"
    class="${inWatchlist ? 'film-details__control-button--active ' : ''}film-details__control-button film-details__control-button--watchlist"
    id="watchlist" name="watchlist">Add to watchlist</button>`
);

const getAlreadyWatchedButtonTemplate = (isWatched) => (
  `<button
    type="button"
    class="${isWatched ? 'film-details__control-button--active ' : ''}film-details__control-button film-details__control-button--watched"
    id="watched" name="watched">Already watched</button>`
);

const getFavoriteButtonTemplate = (isFavorite) => (
  `<button
    type="button"
    class="${isFavorite ? 'film-details__control-button--active ' : ''}film-details__control-button film-details__control-button--favorite"
    id="favorite" name="favorite">Add to favorites</button>`
);

const createFilmDetailsTemplate = (film) => {
  const {
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
      favorite
    },
    comments
  } = film;

  const releaseDate = getFormattedReleaseDate(release.date);
  const duration = getFormattedDuration(runtime);

  const genresTemplate = genre.map((genre) => `<span class="film-details__genre">${genre}</span>`).join('');

  return (`
    <section class="film-details">
      <div class="film-details__inner">
        <div class="film-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./${poster}" alt="${title} poster">

              <p class="film-details__age">${ageRating}+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">Original: ${alternativeTitle}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${totalRating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers.join(', ')}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors.join(', ')}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${releaseDate}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${duration}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${release.releaseCountry}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">
                    ${genresTemplate}
                </tr>
              </table>

              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            ${getWatchlistButtonTemplate(watchlist)}
            ${getAlreadyWatchedButtonTemplate(alreadyWatched)}
            ${getFavoriteButtonTemplate(favorite)}
          </section>
        </div>

        <div class="film-details__bottom-container">
          ${getFilmCommentsTemplate(comments)}
        </div>
      </div>
    </section>
`);
}

export default class FilmDetailsView {
  #element = null;
  #film = null;

  constructor(film) {
    this.#film = film;
    console.log(film.comments.length);
  }

  get template() {
    return createFilmDetailsTemplate(this.#film);
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
