export interface IValidationErrorResponse {
  message: string
  errors: Errors
}

export interface Errors {
  [key: string]: string[];
}
