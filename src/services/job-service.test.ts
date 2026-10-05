import { beforeEach, describe, expect, it } from "vitest";
import type { JobInput } from "@/domain/job";
import { MockCompanyRepository } from "@/repositories/mock/mock-company-repository";
import { MockJobRepository } from "@/repositories/mock/mock-job-repository";
import { resetMockStore } from "@/repositories/mock/store";
import { JobService } from "./job-service";

const EMPLOYER_ID = "employer-test";
const OTHER_EMPLOYER_ID = "employer-lain";

const JOB_INPUT: JobInput = {
  title: "Backend Engineer",
  description: "Mengembangkan layanan API untuk produk internal.",
  qualifications: "Node.js dan PostgreSQL.",
  category: "Teknologi",
  location: "Jakarta",
  employmentType: "FULL_TIME",
  salaryMin: 9_000_000,
  salaryMax: 13_000_000,
};

function createService() {
  const jobs = new MockJobRepository();
  const companies = new MockCompanyRepository();
  return { service: new JobService(jobs, companies), companies, jobs };
}

describe("JobService.createJob", () => {
  beforeEach(() => {
    resetMockStore();
  });

  it("menolak membuat lowongan tanpa profil perusahaan", async () => {
    const { service } = createService();
    const result = await service.createJob(EMPLOYER_ID, JOB_INPUT);

    expect(result).toEqual({
      ok: false,
      error: "Lengkapi profil perusahaan dulu sebelum membuat lowongan.",
    });
  });

  it("membuat lowongan OPEN milik perusahaan employer", async () => {
    const { service, companies } = createService();
    await companies.upsert(EMPLOYER_ID, { name: "Nusantara Digital" });

    const result = await service.createJob(EMPLOYER_ID, JOB_INPUT);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.job.status).toBe("OPEN");
      expect(result.job.companyName).toBe("Nusantara Digital");
      expect(result.job.title).toBe(JOB_INPUT.title);
    }
  });
});

describe("JobService ownership", () => {
  beforeEach(() => {
    resetMockStore();
  });

  async function setupOwnedJob() {
    const context = createService();
    await context.companies.upsert(EMPLOYER_ID, {
      name: "Nusantara Digital",
    });
    const created = await context.service.createJob(EMPLOYER_ID, JOB_INPUT);
    if (!created.ok) {
      throw new Error("Setup gagal membuat lowongan");
    }
    return { ...context, jobId: created.job.id };
  }

  it("menampilkan hanya lowongan milik employer", async () => {
    const { service } = await setupOwnedJob();
    const jobs = await service.listJobsForEmployer(EMPLOYER_ID);

    expect(jobs.length).toBeGreaterThan(0);
    jobs.forEach((job) => {
      expect(job.companyName).toBe("Nusantara Digital");
    });
  });

  it("memperbarui lowongan milik sendiri", async () => {
    const { service, jobId } = await setupOwnedJob();
    const result = await service.updateJob(EMPLOYER_ID, jobId, {
      ...JOB_INPUT,
      title: "Backend Engineer Senior",
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.job.title).toBe("Backend Engineer Senior");
    }
  });

  it("menolak update dari employer lain", async () => {
    const { service, companies, jobId } = await setupOwnedJob();
    await companies.upsert(OTHER_EMPLOYER_ID, { name: "Perusahaan Lain" });

    const result = await service.updateJob(OTHER_EMPLOYER_ID, jobId, JOB_INPUT);

    expect(result).toEqual({
      ok: false,
      error: "Lowongan tidak ditemukan.",
    });
  });

  it("menutup lowongan (status CLOSED)", async () => {
    const { service, jobId } = await setupOwnedJob();
    const result = await service.closeJob(EMPLOYER_ID, jobId);

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.job.status).toBe("CLOSED");
    }
  });

  it("menghapus lowongan milik sendiri", async () => {
    const { service, jobId } = await setupOwnedJob();
    const result = await service.deleteJob(EMPLOYER_ID, jobId);

    expect(result).toEqual({ ok: true });
    expect(await service.getOwnedJob(EMPLOYER_ID, jobId)).toBeNull();
  });

  it("menolak hapus dari employer lain", async () => {
    const { service, companies, jobId } = await setupOwnedJob();
    await companies.upsert(OTHER_EMPLOYER_ID, { name: "Perusahaan Lain" });

    const result = await service.deleteJob(OTHER_EMPLOYER_ID, jobId);

    expect(result).toEqual({
      ok: false,
      error: "Lowongan tidak ditemukan.",
    });
  });
});
