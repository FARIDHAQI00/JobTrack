"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export interface JobSearchInputProps {
  defaultValue?: string;
}

/**
 * Input pencarian lowongan dengan debounce 400ms.
 *
 * State pencarian disinkronkan ke URL query `q` sehingga bisa dibagikan
 * dan di-refresh tanpa kehilangan hasil.
 */
export function JobSearchInput({ defaultValue = "" }: JobSearchInputProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(defaultValue);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  function applyQuery(next: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (next.trim()) {
      params.set("q", next.trim());
    } else {
      params.delete("q");
    }
    params.delete("halaman");
    const queryString = params.toString();
    router.replace(queryString ? `/jobs?${queryString}` : "/jobs", {
      scroll: false,
    });
  }

  function handleChange(next: string) {
    setValue(next);
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(() => applyQuery(next), 400);
  }

  return (
    <form
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        if (debounceTimer.current) {
          clearTimeout(debounceTimer.current);
        }
        applyQuery(value);
      }}
      className="relative"
    >
      <Search
        className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
      <Input
        value={value}
        onChange={(event) => handleChange(event.target.value)}
        aria-label="Cari lowongan"
        placeholder="Cari posisi, perusahaan, atau kota"
        className="h-11 bg-card pl-9"
      />
    </form>
  );
}
