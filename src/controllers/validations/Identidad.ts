import { IInputValidation } from 'models/Service.index';

export const identidadValidacion: IInputValidation = {
  "foo": {
    pattern: /bar|BAR/,
    type: "string",
    required: true,
    message: "you must to provide foo value"
  },
  "identifier": {
    pattern: /[0-9kK]{1,9}/,
    type: "string",
    required: true,
    message: "you must to provide a valid identifier",
  },
  "age": {
    type: "number",
    required: true,
    minimum: 18,
    maximum: 65,
    message: "you must to provide a valid age between 18 and 65",
  }
}

