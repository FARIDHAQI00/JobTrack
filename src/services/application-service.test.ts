import { beforeEach, describe, expect, it } from "vitest";
import { MockApplicationRepository } from "@/repositories/mock/mock-application-repository";
import { MockCompanyRepository } from "@/repositories/mock/mock-company-repository";
import { MockJobRepository } from "@/repositories/mock/mock-job-repository";
import { resetMockStore } from "@/repositories/mock/store";
import { ApplicationService } from "./application-service";

const SEEKER_ID = "seeker-test";
const EMPLOYER_ID = "employer-test";
const OTHER_EMPLOYER_ID = "employer-lain";
const OPEN_JOB_ID = "job-01";
const CLOSED_JOB_ID = "job-14";

function createService() {
  const jobs = new MockJobRepository();
  const applications = new MockApplicationRepository(jobs);
  const companies = new MockCompanyRepository();
  return {
    service: new ApplicationService(applications, jobs, companies),
    companies,
    applications,
  };
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

describe("ApplicationService.updateStatusForEmployer", () => {
  beforeEach(() => {
    resetMockStore();
  });

  async function setupApplication() {
    const context = createService();
    await context.companies.upsert(EMPLOYER_ID, {
      name: "Nusantara Digital",
    });
    await context.service.applyToJob(OPEN_JOB_ID, SEEKER_ID);
    const [application] = await context.service.listMyApplications(SEEKER_ID);
    return { ...context, applicationId: application.id };
  }

  it("memperbarui status sesuai transisi yang sah", async () => {
    const { service, applicationId } = await setupApplication();

    const result = await service.updateStatusForEmployer(
      EMPLOYER_ID,
      applicationId,
      "SCREENING"
    );
    expect(result.ok).toBe(true);

    const [updated] = await service.listMyApplications(SEEKER_ID);
    expect(updated.status).toBe("SCREENING");
  });

  it("menolak lompatan transisi (APPLIED ke INTERVIEW)", async () => {
    const { service, applicationId } = await setupApplication();

    const result = await service.updateStatusForEmployer(
      EMPLOYER_ID,
      applicationId,
      "INTERVIEW"
    );

    expect(result).toEqual({
      ok: false,
      error: "Perubahan status tersebut tidak diperbolehkan.",
    });
  });

  it("menolak employer yang bukan pemilik lowongan", async () => {
    const { service, companies, applicationId } = await setupApplication();
    await companies.upsert(OTHER_EMPLOYER_ID, {
      name: "Perusahaan Lain",
    });

    const result = await service.updateStatusForEmployer(
      OTHER_EMPLOYER_ID,
      applicationId,
      "SCREENING"
    );

    expect(result).toEqual({
      ok: false,
      error: "Lamaran tidak ditemukan.",
    });
  });
});

describe("ApplicationService.listApplicantsForJob", () => {
  beforeEach(() => {
    resetMockStore();
  });

  it("hanya pemilik lowongan yang bisa melihat kandidat", async () => {
    const { service, companies } = createService();
    await companies.upsert(EMPLOYER_ID, { name: "Nusantara Digital" });
    await service.applyToJob(OPEN_JOB_ID, SEEKER_ID);

    const ownerResult = await service.listApplicantsForJob(
      EMPLOYER_ID,
      OPEN_JOB_ID
    );
    expect(ownerResult.ok).toBe(true);
    if (ownerResult.ok) {
      expect(ownerResult.applicants).toHaveLength(1);
    }

    const strangerResult = await service.listApplicantsForJob(
      OTHER_EMPLOYER_ID,
      OPEN_JOB_ID
    );
    expect(strangerResult).toEqual({
      ok: false,
      error: "Lowongan tidak ditemukan.",
    });
  });
});
