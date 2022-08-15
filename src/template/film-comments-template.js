import {getFormattedFullDate} from "../utils";
import {EMOJIS} from "../const";

const getCommentTemplate = ({author, emotion, comment, date}) => (`
  <li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
    </span>
    <div>
      <p class="film-details__comment-text">${comment}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${getFormattedFullDate(date)}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>
`)

const getEmojiTemplate = (emoji) => (`
  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}">
  <label class="film-details__emoji-label" for="emoji-${emoji}">
    <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji ${emoji}">
  </label>
`)

const getFilmCommentsTemplate = (comments) => {
  const commentsTemplate = comments.map((comment) => getCommentTemplate(comment)).join('');
  const emojisTemplate = EMOJIS.map((emoji) => getEmojiTemplate(emoji)).join('');

  return (`
    <section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

      <ul class="film-details__comments-list">
        ${commentsTemplate}
      </ul>

      <form class="film-details__new-comment" action="" method="get">
        <div class="film-details__add-emoji-label"></div>

        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
        </label>

        <div class="film-details__emoji-list">
          ${emojisTemplate}
        </div>
      </form>
    </section>
  `);
}

export {getFilmCommentsTemplate};
