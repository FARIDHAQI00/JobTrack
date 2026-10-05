"use client";

import Link from "next/link";
import { useActionState } from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  EMPLOYMENT_TYPES,
  EMPLOYMENT_TYPE_LABELS,
  JOB_CATEGORIES,
  type Job,
} from "@/domain/job";
import {
  createJobAction,
  updateJobAction,
  type JobFormState,
} from "../actions";

export interface JobFormProps {
  mode: "create" | "edit";
  jobId?: string;
  defaultValues?: Job;
}

const INITIAL_STATE: JobFormState = {};

/**
 * Form buat/edit lowongan Employer.
 *
 * Mode edit melakukan prefill dari data lowongan; validasi dijalankan di
 * server action (judul, deskripsi, kategori, lokasi, tipe, rentang gaji).
 */
export function JobForm({ mode, jobId, defaultValues }: JobFormProps) {
  const [state, formAction, pending] = useActionState(
    mode === "create" ? createJobAction : updateJobAction,
    INITIAL_STATE
  );

  return (
    <form action={formAction} className="grid max-w-2xl gap-5">
      {jobId ? <input type="hidden" name="jobId" value={jobId} /> : null}

      <div className="grid gap-2">
        <Label htmlFor="job-title">Judul lowongan</Label>
        <Input
          id="job-title"
          name="title"
          required
          minLength={3}
          defaultValue={defaultValues?.title ?? ""}
          placeholder="Contoh: Frontend Developer"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="job-category">Kategori</Label>
          <Select name="category" defaultValue={defaultValues?.category}>
            <SelectTrigger id="job-category" className="w-full">
              <SelectValue placeholder="Pilih kategori" />
            </SelectTrigger>
            <SelectContent>
              {JOB_CATEGORIES.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="job-location">Lokasi</Label>
          <Input
            id="job-location"
            name="location"
            required
            defaultValue={defaultValues?.location ?? ""}
            placeholder="Contoh: Jakarta atau Remote"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div className="grid gap-2">
          <Label htmlFor="job-type">Tipe pekerjaan</Label>
          <Select
            name="employmentType"
            defaultValue={defaultValues?.employmentType ?? "FULL_TIME"}
          >
            <SelectTrigger id="job-type" className="w-full">
              <SelectValue placeholder="Pilih tipe" />
            </SelectTrigger>
            <SelectContent>
              {EMPLOYMENT_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {EMPLOYMENT_TYPE_LABELS[type]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="job-salary-min">Gaji min (Rp)</Label>
          <Input
            id="job-salary-min"
            name="salaryMin"
            type="number"
            min={0}
            step={500000}
            defaultValue={defaultValues?.salaryMin ?? ""}
            placeholder="8000000"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="job-salary-max">Gaji max (Rp)</Label>
          <Input
            id="job-salary-max"
            name="salaryMax"
            type="number"
            min={0}
            step={500000}
            defaultValue={defaultValues?.salaryMax ?? ""}
            placeholder="12000000"
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="job-description">Deskripsi</Label>
        <Textarea
          id="job-description"
          name="description"
          required
          minLength={10}
          rows={5}
          defaultValue={defaultValues?.description ?? ""}
          placeholder="Jelaskan peran, tanggung jawab, dan konteks tim."
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="job-qualifications">Kualifikasi (opsional)</Label>
        <Textarea
          id="job-qualifications"
          name="qualifications"
          rows={3}
          defaultValue={defaultValues?.qualifications ?? ""}
          placeholder="Contoh: Menguasai React dan TypeScript."
        />
      </div>

      {state.error ? (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {state.error}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" size="lg" className="h-11" disabled={pending}>
          {pending
            ? "Menyimpan..."
            : mode === "create"
              ? "Terbitkan Lowongan"
              : "Simpan Perubahan"}
        </Button>
        <Button variant="outline" size="lg" className="h-11" asChild>
          <Link href="/employer/jobs">Batal</Link>
        </Button>
      </div>
    </form>
  );
}
