import { Request } from "../../src/tools/Request";


describe("Test Request tools", () => {
  test("Get a valid request object", () => {
    const someBaseUrl = "baseUrl";
    const request = Request(someBaseUrl);
    expect(request.defaults.baseURL).toEqual(someBaseUrl);
  });
});