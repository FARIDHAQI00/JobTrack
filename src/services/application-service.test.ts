import { beforeEach, describe, expect, it } from "vitest";
import { MockApplicationRepository } from "@/repositories/mock/mock-application-repository";
import { MockJobRepository } from "@/repositories/mock/mock-job-repository";
import { resetMockStore } from "@/repositories/mock/store";
import { ApplicationService } from "./application-service";

const SEEKER_ID = "seeker-test";
const OPEN_JOB_ID = "job-01";
const CLOSED_JOB_ID = "job-14";

function createService() {
  const jobs = new MockJobRepository();
  const applications = new MockApplicationRepository(jobs);
  return { service: new ApplicationService(applications, jobs) };
}

describe("ApplicationService.applyToJob", () => {
  beforeEach(() => {
    resetMockStore();
  });

  it("mengirim lamaran pada lowongan OPEN", async () => {
    const { service } = createService();
    const result = await service.applyToJob(OPEN_JOB_ID, SEEKER_ID);

    expect(result.ok).toBe(true);

    const applications = await service.listMyApplications(SEEKER_ID);
    expect(applications).toHaveLength(1);
    expect(applications[0].status).toBe("APPLIED");
    expect(applications[0].jobId).toBe(OPEN_JOB_ID);
  });

  it("menolak lamaran kedua pada lowongan yang sama", async () => {
    const { service } = createService();
    await service.applyToJob(OPEN_JOB_ID, SEEKER_ID);
    const secondAttempt = await service.applyToJob(OPEN_JOB_ID, SEEKER_ID);

    expect(secondAttempt).toEqual({
      ok: false,
      error: "Kamu sudah melamar lowongan ini.",
    });
  });

  it("menolak lamaran pada lowongan CLOSED", async () => {
    const { service } = createService();
    const result = await service.applyToJob(CLOSED_JOB_ID, SEEKER_ID);

    expect(result).toEqual({ ok: false, error: "Lowongan sudah ditutup." });
  });

  it("mengembalikan error bila lowongan tidak ditemukan", async () => {
    const { service } = createService();
    const result = await service.applyToJob("job-tidak-ada", SEEKER_ID);

    expect(result).toEqual({
      ok: false,
      error: "Lowongan tidak ditemukan.",
    });
  });
});
