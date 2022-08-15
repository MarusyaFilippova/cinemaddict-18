import { getMovies } from '../mock/movies';
import { getComments } from '../mock/comments';

export default class MoviesModel {
  #movies = getMovies();
  #comments = getComments();
  #films = this.#movies.map((movie) => this.#supplementMovie(movie));

  get movies() {
    return this.#movies;
  }

  get comments() {
    return this.#comments;
  }

  get films() {
    return this.#films;
  }

  #supplementMovie(movie) {
    const {
      comments: commentIds,
    } = movie;

    console.log('supplementMovie commentIds', commentIds.length)

    const comments = commentIds.map((commentId) => this.#comments.find((comment) => comment.id === commentId));

    console.log('comments', comments.length)
    return {
      ...movie,
      comments,
    };
  }
}
