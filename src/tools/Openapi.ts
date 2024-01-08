import  * as YAML  from 'yamljs';
import * as swagger_ui from  'swagger-ui-express';
export const Openapi = {
  setup: () => {
    const oasJson =  YAML.load('./openapi.yaml');
    return swagger_ui.setup(oasJson);
  },
  ui: swagger_ui.serve
}  

