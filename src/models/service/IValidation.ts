export interface IInputValidation {
  [name: string]: IValidation
}
export interface IValidation {
  type: string,
  required: boolean,
  message: string,
  pattern?: any,
  minLength?: number,
  maxLength?: number,
  minimum?: number,
  maximum?: number
}