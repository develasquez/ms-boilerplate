
export interface IResponse<T> {
  success: boolean,
  code: number,
  response: T,
  errors?: Error,
  embedded?: any,
  links? : any
  actions? : any
}