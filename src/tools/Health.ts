import { EStatusCode } from '../models/Service.index';
export const Health = (req, res, next) => {
  res.send().status(EStatusCode.OK);
}
