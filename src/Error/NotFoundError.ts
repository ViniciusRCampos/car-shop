export default class NotFoundError extends Error {
  readonly status = 404;
}