import { Health } from "../../src/tools/health";

describe("Test Health Check Tool", () => {
  test("Check Status 200", done => {
    
    function status(code) {
      try {
        expect(code).toBe(200);
        done();
      } catch (error) {
        done(error);
      }
    }
    const res = {
      send:  () => {return {status}}
    };
    Health(null, res, null);
  })
});