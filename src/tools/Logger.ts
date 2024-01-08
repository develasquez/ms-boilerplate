import logger from 'google-cloud-structured-logs';
export const Log = (taskName: any, trace?: any) => {
  
  const log = logger(process.env.npm_package_name || "");
  const ctx = log.newCtx({task: taskName , trace });
  const methods = (ctx) => {
    return {
      setCtx: ((ctx, task, parameters, request, response) => {
        const theCtx = log.setCtx( ctx, task, parameters, request, response );
        return methods(theCtx)

      }).bind(this, ctx),
      info: ((ctx: any, message: any, parameters: any, statusCode: any) => {
        if(statusCode){
          ctx.httpRequest.status = statusCode;
        }
        log.info(ctx, message, parameters)

      }).bind(this, ctx),
      error: ((ctx: any, error?: Error, statusCode?: any | { message?: string; stack?: string; name?: string } ) => {
        if(statusCode){
          ctx.httpRequest.status = statusCode;
        }
        log.error(ctx, error)
      }).bind(this, ctx),
      fatal: log.fatal.bind(this, ctx),
    }
  }
  return methods(ctx);
}