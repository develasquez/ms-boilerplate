import { IError } from './IError';
export interface IErrorResponse {
  code: number,
  success: boolean,
  errors: Array<IError>
  response? : any,
  reference?: string,
  trackId?: string
}

