import { Hello } from "../../src/controllers/Hello";
import { Log } from '../../src/tools/Logger'; 

const logger = Log("testHello");
const log = logger.log;
const ctx = logger.ctx;
const req = {
  query : {},
  method: 'GET',
  url: 'test'
}
describe("Test Hello Controller", () => {
  test("status is called", () => {
    const getHello = new Hello().getHello;
    const status = jest.fn();
    const res = {
      send: () => { return { status } }
    };
    getHello.bind({ctx, log})(req, res);
    expect(status).toHaveBeenCalled()
  })
  test("Status code 200", done => {
    const getHello = new Hello().getHello;
    function status(code) {
      try {
        expect(code).toBe(200);
        done();
      } catch (error) {
        done(error);
      }
    }
    const res = {
      send: () => { return { status } }
    };
    getHello.bind({ctx, log})(req, res);
  })
  test("Match response success equals true", () => {
    let response;
    const getHello = new Hello().getHello;
    const status = jest.fn();
    const res = {
      send: (data) => {
        response = data;
        return { status }
      }
    };
    getHello.bind({ctx, log})(req, res);
    expect(response.success).toBeTruthy();
  })
  test("test Error response", () => {
    const getHello = new Hello().getHello;
    getHello.bind({ctx, log})(null,null);
  });
});