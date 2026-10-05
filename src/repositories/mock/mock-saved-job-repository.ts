import type { Job } from "@/domain/job";
import type { SavedJobRepository } from "../saved-job-repository";
import type { JobRepository } from "../job-repository";
import { getMockStore, nextMockId } from "./store";
import { MockJobRepository } from "./mock-job-repository";

/**
 * Implementasi SavedJobRepository dengan store in-memory (mode demo).
 */
export class MockSavedJobRepository implements SavedJobRepository {
  constructor(
    private readonly jobRepository: JobRepository = new MockJobRepository()
  ) {}

  async listBySeeker(seekerId: string): Promise<Job[]> {
    const store = getMockStore();
    const records = store.savedJobs
      .filter((record) => record.seekerId === seekerId)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

    const jobs = await Promise.all(
      records.map((record) => this.jobRepository.findById(record.jobId))
    );
    return jobs.filter((job): job is Job => job !== null);
  }

  async isSaved(seekerId: string, jobId: string): Promise<boolean> {
    const store = getMockStore();
    return store.savedJobs.some(
      (record) => record.seekerId === seekerId && record.jobId === jobId
    );
  }

  async add(seekerId: string, jobId: string): Promise<void> {
    const store = getMockStore();
    const exists = await this.isSaved(seekerId, jobId);
    if (exists) {
      return;
    }
    store.savedJobs.push({
      id: nextMockId("saved"),
      jobId,
      seekerId,
      createdAt: new Date().toISOString(),
    });
  }

  async remove(seekerId: string, jobId: string): Promise<void> {
    const store = getMockStore();
    store.savedJobs = store.savedJobs.filter(
      (record) => !(record.seekerId === seekerId && record.jobId === jobId)
    );
  }
}
