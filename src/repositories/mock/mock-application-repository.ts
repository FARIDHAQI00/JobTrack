import type { Applicant, ApplicationSummary } from "@/domain/application";
import type { ApplicationStatus } from "@/domain/status";
import type {
  ApplicationRepository,
  NewApplicationInput,
} from "../application-repository";
import type { JobRepository } from "../job-repository";
import { getMockStore, nextMockId, type MockApplicationRecord } from "./store";
import { MOCK_JOBS } from "./job-data";
import { MockJobRepository } from "./mock-job-repository";

function toSummary(
  record: MockApplicationRecord,
  jobTitle: string,
  companyName: string
): ApplicationSummary {
  return {
    id: record.id,
    jobId: record.jobId,
    jobTitle,
    companyName,
    status: record.status,
    appliedAt: record.appliedAt,
    updatedAt: record.updatedAt,
  };
}

/**
 * Implementasi ApplicationRepository dengan store in-memory (mode demo).
 */
export class MockApplicationRepository implements ApplicationRepository {
  constructor(
    private readonly jobRepository: JobRepository = new MockJobRepository()
  ) {}

  async findBySeeker(seekerId: string): Promise<ApplicationSummary[]> {
    const store = getMockStore();
    const records = store.applications
      .filter((record) => record.seekerId === seekerId)
      .sort((a, b) => b.appliedAt.localeCompare(a.appliedAt));

    return Promise.all(
      records.map(async (record) => {
        const job = await this.jobRepository.findById(record.jobId);
        return toSummary(
          record,
          job?.title ?? "Lowongan",
          job?.companyName ?? "Perusahaan"
        );
      })
    );
  }

  async findByJob(jobId: string): Promise<Applicant[]> {
    const store = getMockStore();
    return store.applications
      .filter((record) => record.jobId === jobId)
      .sort((a, b) => b.appliedAt.localeCompare(a.appliedAt))
      .map((record) => {
        const profile = store.seekerProfiles.get(record.seekerId);
        return {
          id: record.id,
          name: profile?.fullName ?? "Pelamar",
          email: undefined,
          status: record.status,
          appliedAt: record.appliedAt,
          coverLetter: record.coverLetter,
        };
      });
  }

  async findById(applicationId: string): Promise<ApplicationSummary | null> {
    const store = getMockStore();
    const record = store.applications.find(
      (candidate) => candidate.id === applicationId
    );
    if (!record) {
      return null;
    }
    const job = await this.jobRepository.findById(record.jobId);
    return toSummary(
      record,
      job?.title ?? "Lowongan",
      job?.companyName ?? "Perusahaan"
    );
  }

  async create(input: NewApplicationInput): Promise<ApplicationSummary> {
    const store = getMockStore();

    const duplicate = store.applications.some(
      (record) =>
        record.jobId === input.jobId && record.seekerId === input.seekerId
    );
    if (duplicate) {
      throw new Error("DUPLICATE_APPLICATION");
    }

    const now = new Date().toISOString();
    const record: MockApplicationRecord = {
      id: nextMockId("application"),
      jobId: input.jobId,
      seekerId: input.seekerId,
      status: "APPLIED",
      coverLetter: input.coverLetter,
      appliedAt: now,
      updatedAt: now,
    };
    store.applications.push(record);

    const job =
      (await this.jobRepository.findById(input.jobId)) ??
      MOCK_JOBS.find((candidate) => candidate.id === input.jobId);

    return toSummary(
      record,
      job?.title ?? "Lowongan",
      job?.companyName ?? "Perusahaan"
    );
  }

  async updateStatus(
    applicationId: string,
    status: ApplicationStatus
  ): Promise<void> {
    const store = getMockStore();
    const record = store.applications.find(
      (candidate) => candidate.id === applicationId
    );
    if (!record) {
      throw new Error("APPLICATION_NOT_FOUND");
    }
    record.status = status;
    record.updatedAt = new Date().toISOString();
  }
}
