import { describe, expect, it } from "vitest";
import {
  APPLICATION_STATUSES,
  APPLICATION_STATUS_LABELS,
  canTransitionStatus,
} from "./status";

describe("canTransitionStatus", () => {
  it("mengizinkan alur maju normal", () => {
    expect(canTransitionStatus("APPLIED", "SCREENING")).toBe(true);
    expect(canTransitionStatus("SCREENING", "INTERVIEW")).toBe(true);
    expect(canTransitionStatus("INTERVIEW", "ACCEPTED")).toBe(true);
  });

  it("mengizinkan penolakan dari tahap mana pun sebelum terminal", () => {
    expect(canTransitionStatus("APPLIED", "REJECTED")).toBe(true);
    expect(canTransitionStatus("SCREENING", "REJECTED")).toBe(true);
    expect(canTransitionStatus("INTERVIEW", "REJECTED")).toBe(true);
  });

  it("menolak lompatan tahap", () => {
    expect(canTransitionStatus("APPLIED", "INTERVIEW")).toBe(false);
    expect(canTransitionStatus("APPLIED", "ACCEPTED")).toBe(false);
    expect(canTransitionStatus("SCREENING", "ACCEPTED")).toBe(false);
  });

  it("menolak perubahan dari status terminal", () => {
    expect(canTransitionStatus("ACCEPTED", "REJECTED")).toBe(false);
    expect(canTransitionStatus("REJECTED", "SCREENING")).toBe(false);
    expect(canTransitionStatus("ACCEPTED", "APPLIED")).toBe(false);
  });
});

describe("label status", () => {
  it("mencakup semua status lamaran", () => {
    APPLICATION_STATUSES.forEach((status) => {
      expect(APPLICATION_STATUS_LABELS[status]).toBeTruthy();
    });
  });
});
