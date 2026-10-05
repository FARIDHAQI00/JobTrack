import { describe, expect, it } from "vitest";
import {
  canAccessPath,
  dashboardPathForRole,
  isProtectedPath,
} from "./access";

describe("isProtectedPath", () => {
  it("mendeteksi area seeker dan employer", () => {
    expect(isProtectedPath("/seeker/dashboard")).toBe(true);
    expect(isProtectedPath("/employer/jobs")).toBe(true);
    expect(isProtectedPath("/jobs")).toBe(false);
    expect(isProtectedPath("/")).toBe(false);
  });
});

describe("canAccessPath", () => {
  it("JOB_SEEKER hanya boleh mengakses area seeker", () => {
    expect(canAccessPath("JOB_SEEKER", "/seeker/dashboard")).toBe(true);
    expect(canAccessPath("JOB_SEEKER", "/employer/dashboard")).toBe(false);
  });

  it("EMPLOYER hanya boleh mengakses area employer", () => {
    expect(canAccessPath("EMPLOYER", "/employer/jobs/new")).toBe(true);
    expect(canAccessPath("EMPLOYER", "/seeker/applications")).toBe(false);
  });

  it("path publik selalu boleh", () => {
    expect(canAccessPath("JOB_SEEKER", "/jobs")).toBe(true);
    expect(canAccessPath("EMPLOYER", "/")).toBe(true);
  });
});

describe("dashboardPathForRole", () => {
  it("mengembalikan dashboard sesuai role", () => {
    expect(dashboardPathForRole("JOB_SEEKER")).toBe("/seeker/dashboard");
    expect(dashboardPathForRole("EMPLOYER")).toBe("/employer/dashboard");
  });
});
