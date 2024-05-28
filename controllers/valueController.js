// Validates if a car name input is valid - only letters - using regex
const validateCarName = (carName) => {
  const carNameRegex = /^[a-zA-Z\s]+$/;
  return carName.trim().length > 0 && carNameRegex.test(carName);
};

// Validates if a car year input is valid - 4 numbers between 1886 to current year - using regex
const validateYear = (year) => {
  const yearRegex = /^\d{4}$/;
  const currentYear = new Date().getFullYear();
  // Cars were invented around 1886 so invalid year prior to this, also future years will be invalid
  return yearRegex.test(year) && year >= 1886 && year <= currentYear;
};

// Adds vehicle name and year validation into a single module
const validateVehicle = (carName, year) => {
  return {
    carNameValid: validateCarName(carName),
    yearValid: validateYear(year),
  };
};
// First checks if inputs are valid then returns a car value based on
// Adding up the positions of the alphabets of the letters in the car name, * 100, then add the year value
const calculateCarValue = (carName, year) => {
  const validation = validateVehicle(carName, year);
  if (!validation.carNameValid || !validation.yearValid) {
    throw new Error("Vehicle details are invalid, please try again");
  }

  const carNameValue = carName
    .toUpperCase()
    .split("")
    .filter((char) => char >= "A" && char <= "Z")
    .reduce((sum, char) => sum + (char.charCodeAt(0) - 64), 0);

  return carNameValue * 100 + parseInt(year, 10);
};

module.exports = validateVehicle;

module.exports.calculateCarValue = (req, res) => {
  try {
    const { carName, year } = req.body; //Assuming carName and year are sent in the request
    const value = calculateCarValue(carName, year);
    res.json({ value });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
