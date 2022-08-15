import dayjs from 'dayjs';

const isEscKeyDown = (evt) => (evt.key === 'Esc' || evt.key === 'Escape');

const getFormattedYear = (date) => dayjs(date).format('YYYY');
const getFormattedReleaseDate = (date) => dayjs(date).format('D MMMM YYYY');
const getFormattedFullDate = (date) => dayjs(date).format('YYYY/MM/DD HH:mm')

const getFormattedDuration = (runtime) => {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;

  const formattedHours = hours > 0 ? `${hours}h ` : '';
  const formattedMinutes = `${minutes}m`

  return formattedHours + formattedMinutes;
}

export {getFormattedYear, getFormattedDuration, getFormattedReleaseDate, getFormattedFullDate, isEscKeyDown}
