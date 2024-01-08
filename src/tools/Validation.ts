import { EStatusCode, IError, IInputValidation } from '../models/Service.index';
import _ from 'lodash';
const SQL_TYPES = `TABLE|TABLESPACE|PROCEDURE|FUNCTION|TRIGGER|KEY|VIEW|MATERIALIZED VIEW|LIBRARY|DATABASE LINK|DBLINK|INDEX|CONSTRAINT|TRIGGER|USER|SCHEMA|DATABASE|PLUGGABLE DATABASE|BUCKET|CLUSTER|COMMENT|SYNONYM|TYPE|JAVA|SESSION|ROLE|PACKAGE|PACKAGE BODY|OPERATOR|SEQUENCE|RESTORE POINT|PFILE|CLASS|CURSOR|OBJECT|RULE|USER|DATASET|DATASTORE|COLUMN|FIELD|OPERATOR`;
const SQL_REGEXPS = [
  "(.*)(\\b)+(OR|AND)(\\s)+(true|false)(\\s)*(.*)",
  "(.*)(\\b)+(OR|AND)(\\s)+(\\w)(\\s)*(\\=)(\\s)*(\\w)(\\s)*(.*)",
  "(.*)(\\b)+(OR|AND)(\\s)+(equals|not equals)(\\s)+(true|false)(\\s)*(.*)",
  "(.*)(\\b)+(OR|AND)(\\s)+([0-9A-Za-z_'][0-9A-Za-z\\d_']*)(\\s)*(\\=)(\\s)*([0-9A-Za-z_'][0-9A-Za-z\\d_']*)(\\s)*(.*)",
  "(.*)(\\b)+(OR|AND)(\\s)+([0-9A-Za-z_'][0-9A-Za-z\\d_']*)(\\s)*(\\!\\=)(\\s)*([0-9A-Za-z_'][0-9A-Za-z\\d_']*)(\\s)*(.*)",
  "(.*)(\\b)+(OR|AND)(\\s)+([0-9A-Za-z_'][0-9A-Za-z\\d_']*)(\\s)*(\\<\\>)(\\s)*([0-9A-Za-z_'][0-9A-Za-z\\d_']*)(\\s)*(.*)",
  "(.*)(\\b)+SELECT(\\b)+\\s.*(\\b)(.*)",
  "(.*)(\\b)+INSERT(\\b)+\\s.*(\\b)+INTO(\\b)+\\s.*(.*)",
  "(.*)(\\b)+UPDATE(\\b)+\\s.*(.*)",
  "(.*)(\\b)+DELETE(\\b)+\\s.*(\\b)+FROM(\\b)+\\s.*(.*)",
  "(.*)(\\b)+UPSERT(\\b)+\\s.*(.*)",
  "(.*)(\\b)+SAVEPOINT(\\b)+\\s.*(.*)",
  "(.*)(\\b)+CALL(\\b)+\\s.*(.*)",
  "(.*)(\\b)+ROLLBACK(\\b)+\\s.*(.*)",
  "(.*)(\\b)+KILL(\\b)+\\s.*(.*)",
  "(.*)(\\b)+DROP(\\b)+\\s.*(.*)",
  "(.*)(\\b)+CREATE(\\b)+(\\s)*(" + SQL_TYPES + ")(\\b)+\\s.*(.*)",
  "(.*)(\\b)+ALTER(\\b)+(\\s)*(" + SQL_TYPES + ")(\\b)+\\s.*(.*)",
  "(.*)(\\b)+TRUNCATE(\\b)+(\\s)*(" + SQL_TYPES + ")(\\b)+\\s.*(.*)",
  "(.*)(\\b)+LOCK(\\b)+(\\s)*(" + SQL_TYPES + ")(\\b)+\\s.*(.*)",
  "(.*)(\\b)+UNLOCK(\\b)+(\\s)*(" + SQL_TYPES + ")(\\b)+\\s.*(.*)",
  "(.*)(\\b)+RELEASE(\\b)+(\\s)*(" + SQL_TYPES + ")(\\b)+\\s.*(.*)",
  "(.*)(\\b)+DESC(\\b)+(\\w)*\\s.*(.*)",
  "(.*)(\\b)+DESCRIBE(\\b)+(\\w)*\\s.*(.*)",
  "(.*)(/\\*|\\*/|;){1,}(.*)",
  "(.*)(-){2,}(.*)",
];
export const validateInputs = (input: any = {}, spected: IInputValidation) => {
  let errors: Array<IError>  = [];
  _.mapKeys(spected, (v, k) => {
    errors.push(v.required && !input[k] ? { detail: k, description: 'Is Required'} : null);
    if(!input[k]) {
      return;
    }
    errors.push(!validateTypes(input[k], v.type) ? { detail: k, description:`Type must be ${v.type}`} : null);
    errors.push((v.type === "string" ?  !(input[k]?.length >= (v.minLength || 0))  && (input[k]?.length <= (v.maxLength || 999999999)) : false) ? { detail: k, description:`Length must be greater than ${v.minLength || 0} and lower than ${v.maxLength || 999999999}`} : null);
    errors.push((v.type === "number" ? !(Number(input[k]) >= (v.minimum || -999999999))  && (Number(input[k]) <= (v.maximum || 999999999)): false) ? { detail: k, description:`Value must be greater than ${v.minimum || 0} and lower than ${v.maximum || 999999999}`} : null);
    errors.push(!(input[k]?.match(v.pattern)) ? {detail: k, description: `Must match the pattern ${v.pattern}`} : null);
    const sqlErrors = [];
    SQL_REGEXPS.forEach((r) => {
      sqlErrors.push(((!!input[k]) && input[k].toUpperCase()?.match(r)) ? r : null);
    });
    errors.push(_.compact(sqlErrors).length > 0 ? {detail: k, description: `Value might be a SQL Injection`} : null);
  });
  errors = _.compact(errors);

  if (errors.length > 0){
    throw {
      statusCode: EStatusCode.BAD_REQUEST,
      errors 
    };
  }
}

function validateTypes  (value: any, type: string) : boolean {
  try{
    const validations = {
      "string": () => typeof value === 'string',
      "number": () => typeof parseFloat(value),
      "object": () => typeof value === "object",
      "array": () => typeof value === "object",
    }
    return validations[type]();
  }catch(err) {
    return false;
  }
}