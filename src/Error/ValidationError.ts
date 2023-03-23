export default class ValidationError extends Error {
  readonly status = 422;
  readonly message = 'Invalid mongo id';
}