const request = require("supertest");
const app = require("../server.js");

describe("Vehicle Value Estimate API", () => {
  afterAll((done) => {
    app.close(done);
  });
  test("returns true for a valid car name and valid year", async () => {
    const response = await request(app).post("/value").send({
      carName: "Hilux",
      year: "2010",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      car_value: 9410,
    });
  });
});
