const request = require("supertest");
const app = require("../server.js");

describe("Risk Rating API", () => {
  test("should return a risk rating of 3 for the given claim history", async () => {
    const response = await request(app)
      .post(`http://localhost:4000/risk_rating`)
      .send({
        claim_history:
          "My only claim was a crash into my house's garage door that left a scratch on my car. There are no other crashes.",
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ risk_rating: 3 });
  });
});
