// const request = require("supertest");
// const app = require("../server.js");

const validateVehicle = require("../controllers/valueController");

describe("Vehicle Value Estimate API", () => {
  test("returns true for a valid car name and valid year", () => {
    const result = validateVehicle("Toyota", "2010");
    expect(result).toEqual({ carNameValid: true, yearValid: true });
  });

  test("returns false for an empty car name", () => {
    const result = validateVehicle("", "2010");
    expect(result).toEqual({ carNameValid: false, yearValid: true });
  });

  test("returns false for a car name with only spaces", () => {
    const result = validateVehicle("   ", "2010");
    expect(result).toEqual({ carNameValid: false, yearValid: true });
  });

  test("returns false for a car name that contains characters others than letters", () => {
    const result = validateVehicle("123", "2010");
    expect(result).toEqual({ carNameValid: false, yearValid: true });
  });

  test("returns false for an invalid year format", () => {
    const result = validateVehicle("Toyota", "10");
    expect(result).toEqual({ carNameValid: true, yearValid: false });
  });

  test("returns false for a year out of range", () => {
    const result = validateVehicle("Toyota", "1885");
    expect(result).toEqual({ carNameValid: true, yearValid: false });
  });

  test("returns false for a future year", () => {
    const nextYear = new Date().getFullYear() + 1;
    const result = validateVehicle("Toyota", nextYear.toString());
    expect(result).toEqual({ carNameValid: true, yearValid: false });
  });

  test("returns false for both invalid car name and year", () => {
    const result = validateVehicle("", "10");
    expect(result).toEqual({ carNameValid: false, yearValid: false });
  });
});
