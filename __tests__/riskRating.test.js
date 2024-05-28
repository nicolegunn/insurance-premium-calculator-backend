const request = require("supertest");
const app = require("../server.js");

describe("Risk Rating API", () => {
  // Valid Input with Multiple Keywords:
  test("should return a risk rating of 3 for the given claim history", async () => {
    const response = await request(app).post("/risk_rating").send({
      claim_history:
        "My only claim was a crash into my house's garage door that left a scratch on my car. There are no other crashes.",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ risk_rating: 3 });
  });

  // Valid Input with Single Keyword:
  test("should return a risk rating of 1 for the given claim history", async () => {
    const response = await request(app).post("/risk_rating").send({
      claim_history: "I bumped into a pole.",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ risk_rating: 1 });
  });

  // Valid Input with No Keywords:
  test("should return a risk rating of 0 for claim history with no keywords", async () => {
    const response = await request(app).post("/risk_rating").send({
      claim_history: "I am the best driver in the world!",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ risk_rating: 0 });
  });

  // Input with no alphabetic characters:
  test("should return an error if claim_history does not contain words", async () => {
    const response = await request(app).post("/risk_rating").send({
      claim_history: "1_2_3_4_5_6_7_8_9_0",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ error: "invalid claim history" });
  });

  // Invalid Input - Empty Object
  test("should return an error for empty body", async () => {
    const response = await request(app).post("/risk_rating").send({});
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ error: "no claim history received" });
  });

  // Invalid Input - Body Missing claim_history Property
  test("should return an error if the claim_history property is missing from the request body", async () => {
    const response = await request(app).post("/risk_rating").send({
      test: "test",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ error: "no claim history received" });
  });
});
