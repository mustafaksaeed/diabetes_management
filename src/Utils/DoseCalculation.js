

function DoseCalculation(dose, carbs, insulinCorrection, ratio) {
  if (dose <= 0) {
    throw new Error("invalid dose amount");
  }
  if (dose >= 5 && dose <= 10) {
    return carbs / ratio;
  }
  if (dose > 10) {
    return carbs / ratio + insulinCorrection;
  }
  if (dose < 5) {
    return carbs / ratio - insulinCorrection;
  }
}
