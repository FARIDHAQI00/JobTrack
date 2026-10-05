import { describe, expect, it } from "vitest";
import type { Job } from "@/domain/job";
import { filterJobs, uniqueValues } from "./job-filters";

const jobs: Job[] = [
  {
    id: "job-1",
    title: "Frontend Developer",
    companyName: "Nusantara Digital",
    description: "Membangun antarmuka.",
    location: "Jakarta",
    employmentType: "FULL_TIME",
    category: "Teknologi",
    status: "OPEN",
  },
  {
    id: "job-2",
    title: "UI/UX Designer",
    companyName: "Karya Bersama Studio",
    description: "Merancang antarmuka.",
    location: "Bandung",
    employmentType: "CONTRACT",
    category: "Desain",
    status: "OPEN",
  },
  {
    id: "job-3",
    title: "Data Analyst",
    companyName: "Samudra Data",
    description: "Mengolah data.",
    location: "Surabaya",
    employmentType: "FULL_TIME",
    category: "Data",
    status: "CLOSED",
  },
];

describe("filterJobs", () => {
  it("mengembalikan semua lowongan tanpa filter", () => {
    expect(filterJobs(jobs)).toHaveLength(3);
  });

  it("mencari kata kunci tanpa membedakan huruf besar/kecil", () => {
    const result = filterJobs(jobs, { query: "frontend" });
    expect(result.map((job) => job.id)).toEqual(["job-1"]);
  });

  it("mencari pada nama perusahaan dan lokasi", () => {
    expect(filterJobs(jobs, { query: "samudra" })).toHaveLength(1);
    expect(filterJobs(jobs, { query: "bandung" })).toHaveLength(1);
  });

  it("memfilter berdasarkan kategori, lokasi, dan tipe", () => {
    expect(filterJobs(jobs, { category: "Desain" })).toHaveLength(1);
    expect(filterJobs(jobs, { location: "Jakarta" })).toHaveLength(1);
    expect(filterJobs(jobs, { employmentType: "FULL_TIME" })).toHaveLength(2);
  });

  it("memfilter status dan menggabungkan filter", () => {
    expect(filterJobs(jobs, { status: "CLOSED" })).toHaveLength(1);
    expect(
      filterJobs(jobs, { status: "OPEN", employmentType: "CONTRACT" })
    ).toHaveLength(1);
  });

  it("mengembalikan kosong bila tidak ada yang cocok", () => {
    expect(filterJobs(jobs, { query: "qwerty" })).toHaveLength(0);
  });
});

describe("uniqueValues", () => {
  it("mengambil nilai unik terurut", () => {
    expect(uniqueValues(jobs, "category")).toEqual([
      "Data",
      "Desain",
      "Teknologi",
    ]);
  });

  it("mengambil lokasi unik", () => {
    expect(uniqueValues(jobs, "location")).toEqual([
      "Bandung",
      "Jakarta",
      "Surabaya",
    ]);
  });
});
