/**
 * Test9c Calculation Utilities
 * This module contains functions for calculating climbing test scores and grades.
 */

/**
 * Converts time string to seconds
 * @param {string} str - Time string (either in seconds or MM:SS format)
 * @returns {number} - Time in seconds
 */
function convertToSeconds(str) {
  if (!str) return 0;

  // Handle MM:SS format
  if (typeof str === "string" && str.includes(":")) {
    const [minutes, seconds] = str.split(":").map(Number);
    return Number((minutes * 60 + seconds).toFixed(3));
  }

  // Handle direct seconds input
  return Number(str) || 0;
}

/**
 * Calculate percentage of weight relative to body weight
 * @param {number|string} additionalWeight - Additional weight in kg
 * @param {number|string} bodyWeight - Body weight in kg
 * @returns {number} - Percentage (100% = body weight)
 */
export function Porcentaje(additionalWeight, bodyWeight) {
  // Ensure we're working with numbers
  const weight = Number(additionalWeight) || 0;
  const body = Number(bodyWeight) || 1; // Prevent division by zero

  // Calculate percentage (100% = body weight)
  return (100 * weight) / body + 100;
}

/**
 * Calculate points for Test 1 and Test 2 (finger strength and pull strength)
 * @param {number|string} kilos - Additional weight in kg
 * @param {number|string} bodyWeight - Body weight in kg
 * @returns {number} - Points (0-10)
 */
export function Test1Test2(kilos, bodyWeight) {
  // Calculate percentage of body weight
  const percentage = Porcentaje(kilos, bodyWeight);

  // Determine points based on percentage ranges
  if (percentage < 100) return 0;
  if (percentage < 110) return 1;
  if (percentage < 120) return 2;
  if (percentage < 130) return 3;
  if (percentage < 140) return 4;
  if (percentage < 150) return 5;
  if (percentage < 160) return 6;
  if (percentage < 180) return 7;
  if (percentage < 200) return 8;
  if (percentage < 220) return 9;
  return 10; // 220% or more
}

/**
 * Calculate points for Test 3 (core strength)
 * @param {number|string} tiempo - Time in seconds
 * @param {string} variante - Exercise variant ("Rodillas Dobladas", "L-Sit", or "Front Lever")
 * @returns {number} - Points (0-10)
 */
export function Test3(tiempo, variante) {
  const seconds = convertToSeconds(tiempo);

  // Return 0 if time is less than minimum threshold
  if (seconds < 5) return 0;

  // Calculate points based on variant and time
  switch (variante) {
    case "Rodillas Dobladas":
      if (seconds < 10) return 0;
      if (seconds < 20) return 1;
      if (seconds < 30) return 2;
      return 3;

    case "L-Sit":
      if (seconds < 10) return 0;
      if (seconds < 15) return 4;
      if (seconds < 20) return 5;
      return 6;

    case "Front Lever":
      if (seconds < 5) return 0;
      if (seconds < 10) return 7;
      if (seconds < 20) return 8;
      if (seconds < 30) return 9;
      return 10;

    default:
      return 0; // No variant selected
  }
}

/**
 * Calculate points for Test 4 (grip strength)
 * @param {number|string} tiempo - Time in seconds
 * @returns {number} - Points (0-10)
 */
export function Test4(tiempo) {
  const seconds = convertToSeconds(tiempo);

  // Determine points based on time ranges
  if (seconds < 30) return 0;
  if (seconds < 60) return 1;
  if (seconds < 90) return 2;
  if (seconds < 120) return 3;
  if (seconds < 150) return 4;
  if (seconds < 180) return 5;
  if (seconds < 210) return 6;
  if (seconds < 240) return 7;
  if (seconds < 300) return 8;
  if (seconds < 360) return 9;
  return 10; // 360 seconds or more
}

/**
 * Grade mapping table for quicker lookups
 */
const GRADE_MAP = {
  40: "9c",
  39: "9b+",
  38: "9b",
  37: "9b",
  36: "9a+",
  35: "9a+",
  34: "9a",
  33: "9a",
  32: "8c+",
  31: "8c+",
  30: "8c",
  29: "8c",
  28: "8b+",
  27: "8b+",
  26: "8b",
  25: "8b",
  24: "8a+",
  23: "8a+",
  22: "8a",
  21: "8a",
  20: "7c+",
  19: "7c+",
  18: "7c",
  17: "7c",
  16: "7b+",
  15: "7b+",
  14: "7b",
  13: "7b",
  12: "7a+",
  11: "7a+",
  10: "7a",
  9: "7a",
  8: "6c+",
  7: "6c+",
  6: "6c",
  5: "6c",
  4: "6b",
  3: "6b",
  2: "6a",
  1: "6a",
  0: "V",
};

/**
 * Calculate total score and corresponding climbing grade
 * @param {number} puntuacion1 - Points from Test 1
 * @param {number} puntuacion2 - Points from Test 2
 * @param {number} puntuacion3 - Points from Test 3
 * @param {number} puntuacion4 - Points from Test 4
 * @returns {[number, string]} - [Total score, Climbing grade]
 */
export function Puntuaciones(
  puntuacion1,
  puntuacion2,
  puntuacion3,
  puntuacion4
) {
  // Ensure we're working with numbers and calculate total
  const total = [puntuacion1, puntuacion2, puntuacion3, puntuacion4].reduce(
    (sum, score) => sum + (Number(score) || 0),
    0
  );

  // Look up grade from mapping table
  const grade = GRADE_MAP[total] || "V";

  return [total, grade];
}
