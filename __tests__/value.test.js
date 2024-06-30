const request = require("supertest");
const app = require("../server.js");

//const { postCarValue } = require("../controllers/valueController");

// describe("Vehicle Value Estimate API", () => {
//   test("returns true for a valid car name and valid year", () => {
//     const result = postCarValue("Toyota", "2010");
//     expect(result).toEqual({ carNameValid: true, yearValid: true });
//   });

// Close the server after all tests are done

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
      // carNameValid: true,
      // yearValid: true,
      car_value: 9410,
    });
  });
});

//   test("returns false for an empty car name", () => {
//     const result = postCarValue("", "2010");
//     expect(result).toEqual({ carNameValid: false, yearValid: true });
//   });

//   test("returns false for a car name with only spaces", () => {
//     const result = this.postCarValue(carName, year)("   ", "2010");
//     expect(result).toEqual({ carNameValid: false, yearValid: true });
//   });

//   test("returns false for a car name that contains characters others than letters", () => {
//     const result = this.postCarValue(carName, year)("123", "2010");
//     expect(result).toEqual({ carNameValid: false, yearValid: true });
//   });

//   test("returns false for an invalid year format", () => {
//     const result = this.postCarValue(carName, year)("Toyota", "10");
//     expect(result).toEqual({ carNameValid: true, yearValid: false });
//   });

//   test("returns false for a year out of range", () => {
//     const result = this.postCarValue(carName, year)("Toyota", "1885");
//     expect(result).toEqual({ carNameValid: true, yearValid: false });
//   });

//   test("returns false for a future year", () => {
//     const nextYear = new Date().getFullYear() + 1;
//     const result = this.postCarValue(carName, year)(
//       "Toyota",
//       nextYear.toString()
//     );
//     expect(result).toEqual({ carNameValid: true, yearValid: false });
//   });

//   test("returns false for both invalid car name and year", () => {
//     const result = this.postCarValue(carName, year)("", "10");
//     expect(result).toEqual({ carNameValid: false, yearValid: false });
//   });
// });

//NEW TESTS HERE

// Valid car name with spaces and valid year return correct car value
// it("should return correct car value when car name and year are valid", () => {
//   const req = { body: { carName: "Toyota", year: "2020" } };
//   const res = {
//     json: jest.fn(),
//     status: jest.fn().mockReturnThis(),
//   };
//   const expectedValue = 2020 + (20 + 15 + 25 + 15 + 1) * 100; // T=20, O=15, Y=25, O=15, T=20, A=1
//   postCarValue(req, res);
//   expect(res.json).toHaveBeenCalledWith({ car_value: expectedValue });
// });
