import { describe, expect, it } from "vitest";

import { addMinorUnits, applyPercent, clampMinimum, formatZar } from "./money";

describe("money", () => {
  it("adds integer minor units", () => {
    expect(addMinorUnits(100, 250, 25)).toBe(375);
  });

  it("rejects non-integer minor units", () => {
    expect(() => addMinorUnits(10.5)).toThrow(RangeError);
  });

  it("applies percentages with rounding", () => {
    expect(applyPercent(1000, 12.5)).toBe(125);
    expect(applyPercent(999, 15)).toBe(150);
  });

  it("clamps to a minimum", () => {
    expect(clampMinimum(4000, 5000)).toBe(5000);
    expect(clampMinimum(6000, 5000)).toBe(6000);
  });

  it("formats ZAR from minor units", () => {
    const formatted = formatZar(12345);
    expect(formatted).toContain("123");
    expect(formatted).toContain("45");
  });
});
