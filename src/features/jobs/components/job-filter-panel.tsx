"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  EMPLOYMENT_TYPES,
  EMPLOYMENT_TYPE_LABELS,
  type EmploymentType,
} from "@/domain/job";
import { cn } from "@/lib/utils";

export interface JobFilterPanelProps {
  categories: string[];
  locations: string[];
}

interface FilterGroupProps {
  label: string;
  options: { value: string; label: string }[];
  activeValue?: string;
  onSelect: (value: string | undefined) => void;
}

function FilterGroup({
  label,
  options,
  activeValue,
  onSelect,
}: FilterGroupProps) {
  return (
    <fieldset className="grid gap-2">
      <legend className="text-sm font-medium">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = option.value === activeValue;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={active}
              onClick={() => onSelect(active ? undefined : option.value)}
              className={cn(
                "rounded-full border px-3 py-1 text-sm transition-colors",
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground hover:bg-muted"
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

/**
 * Panel filter lowongan: kategori, lokasi, dan tipe pekerjaan.
 *
 * Chip selalu terlihat dan wrap; perubahan langsung disinkronkan ke URL.
 * Dipakai di sidebar desktop dan Sheet mobile pada halaman `/jobs`.
 */
export function JobFilterPanel({
  categories,
  locations,
}: JobFilterPanelProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const kategori = searchParams.get("kategori") ?? undefined;
  const lokasi = searchParams.get("lokasi") ?? undefined;
  const tipe = (searchParams.get("tipe") ?? undefined) as
    | EmploymentType
    | undefined;
  const hasFilters = Boolean(kategori || lokasi || tipe);

  function setParam(key: string, value: string | undefined) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("halaman");
    const queryString = params.toString();
    router.replace(queryString ? `/jobs?${queryString}` : "/jobs", {
      scroll: false,
    });
  }

  function resetFilters() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("kategori");
    params.delete("lokasi");
    params.delete("tipe");
    params.delete("halaman");
    const queryString = params.toString();
    router.replace(queryString ? `/jobs?${queryString}` : "/jobs", {
      scroll: false,
    });
  }

  return (
    <div className="grid gap-5">
      <FilterGroup
        label="Kategori"
        activeValue={kategori}
        options={categories.map((category) => ({
          value: category,
          label: category,
        }))}
        onSelect={(value) => setParam("kategori", value)}
      />
      <FilterGroup
        label="Lokasi"
        activeValue={lokasi}
        options={locations.map((location) => ({
          value: location,
          label: location,
        }))}
        onSelect={(value) => setParam("lokasi", value)}
      />
      <FilterGroup
        label="Tipe pekerjaan"
        activeValue={tipe}
        options={EMPLOYMENT_TYPES.map((type) => ({
          value: type,
          label: EMPLOYMENT_TYPE_LABELS[type],
        }))}
        onSelect={(value) => setParam("tipe", value)}
      />
      {hasFilters ? (
        <Button variant="outline" size="sm" onClick={resetFilters}>
          Reset filter
        </Button>
      ) : null}
    </div>
  );
}
