import Express from 'express';
import service from '../src/service';
import config from '../src/config.json';
import _ from 'lodash';



describe("Test Express server", () => {
  test("Test Setting Port ", () => {
    process.env.PORT = '5000';
    expect(service.init(Express(), config).settings.port).toEqual(5000);
  });
  test("Test default Port ", () => {
    process.env.PORT = '';
    expect(service.init(Express(),config).settings.port).toEqual(8080);
  });
  test("Test configs brabches ", () => {
    process.env.PORT = '';
    config.openapi = false;
    config.healtCheck = false;
    config.allowCors = false;
    expect(service.init(Express(),config).settings.port).toEqual(8080);
  });
  
  test("Test listen ", () => { 
    const result = service.listen(1);
    expect(result).toEqual(1);
  })
  test("Test Error ", () => { 
    const result = service.error(1);
    expect(result).toEqual(1);
  })
});