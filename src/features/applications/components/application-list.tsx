"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ApplicationStatusBadge } from "./application-status-badge";
import { ApplicationTimeline } from "./application-timeline";
import type { ApplicationSummary } from "@/domain/application";
import { formatDateID } from "@/lib/format";

export interface ApplicationListProps {
  applications: ApplicationSummary[];
}

/**
 * Daftar riwayat lamaran dengan dialog progres per lamaran.
 */
export function ApplicationList({ applications }: ApplicationListProps) {
  const [selected, setSelected] = useState<ApplicationSummary | null>(null);

  return (
    <>
      <ul className="divide-y">
        {applications.map((application) => (
          <li
            key={application.id}
            className="group/application flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
          >
            <div className="grid min-w-0 flex-1 gap-0.5">
              <span className="truncate font-medium transition-colors duration-200 group-hover/application:text-primary">
                {application.jobTitle}
              </span>
              <span className="truncate text-sm text-muted-foreground">
                {application.companyName} · Dilamar{" "}
                {formatDateID(application.appliedAt)}
              </span>
            </div>
            <ApplicationStatusBadge status={application.status} />
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelected(application)}
              >
                Lihat progres
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/jobs/${application.jobId}`}>Lowongan</Link>
              </Button>
            </div>
          </li>
        ))}
      </ul>
      <Dialog
        open={Boolean(selected)}
        onOpenChange={(open) => {
          if (!open) {
            setSelected(null);
          }
        }}
      >
        <DialogContent>
          {selected ? (
            <>
              <DialogHeader>
                <DialogTitle>{selected.jobTitle}</DialogTitle>
                <DialogDescription>{selected.companyName}</DialogDescription>
              </DialogHeader>
              <ApplicationTimeline status={selected.status} />
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
