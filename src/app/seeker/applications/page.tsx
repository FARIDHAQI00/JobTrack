import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ApplicationList } from "@/features/applications/components/application-list";
import {
  APPLICATION_STATUSES,
  APPLICATION_STATUS_LABELS,
  type ApplicationStatus,
} from "@/domain/status";
import { getSessionUser } from "@/lib/auth/service";
import { getApplicationService } from "@/repositories";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Lamaran Saya" };

interface ApplicationsPageProps {
  searchParams: Promise<{ status?: string }>;
}

export default async function SeekerApplicationsPage({
  searchParams,
}: ApplicationsPageProps) {
  const user = await getSessionUser();
  if (!user || user.role !== "JOB_SEEKER") {
    redirect("/login");
  }

  const { status: statusParam } = await searchParams;
  const statusFilter: ApplicationStatus | undefined =
    APPLICATION_STATUSES.find((status) => status === statusParam);

  const applications = await getApplicationService().listMyApplications(
    user.id
  );
  const filtered = statusFilter
    ? applications.filter((application) => application.status === statusFilter)
    : applications;

  return (
    <div className="grid gap-7">
      <header className="grid gap-1">
        <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          Lamaran Saya
        </h1>
        <p className="text-muted-foreground">
          {applications.length} lamaran tercatat. Pantau status terbarunya di
          sini.
        </p>
      </header>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter status">
        <Link
          href="/seeker/applications"
          aria-current={!statusFilter ? "page" : undefined}
          className={cn(
            "rounded-xl border px-3.5 py-2 text-sm font-medium transition-[color,background-color,border-color] duration-200",
            !statusFilter
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border/80 bg-card/75 text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
          )}
        >
          Semua
        </Link>
        {APPLICATION_STATUSES.map((status) => (
          <Link
            key={status}
            href={`/seeker/applications?status=${status}`}
            aria-current={statusFilter === status ? "page" : undefined}
            className={cn(
              "rounded-xl border px-3.5 py-2 text-sm font-medium transition-[color,background-color,border-color] duration-200",
              statusFilter === status
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border/80 bg-card/75 text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
            )}
          >
            {APPLICATION_STATUS_LABELS[status]}
          </Link>
        ))}
      </div>

      <Card>
        <CardContent>
          {filtered.length > 0 ? (
            <ApplicationList applications={filtered} />
          ) : (
            <div className="grid gap-3 py-10 text-center">
              <p className="font-medium">
                {applications.length === 0
                  ? "Belum ada lamaran"
                  : "Tidak ada lamaran dengan status ini"}
              </p>
              <p className="text-sm text-muted-foreground">
                {applications.length === 0
                  ? "Mulai cari lowongan dan kirim lamaran pertamamu."
                  : "Coba pilih filter status lain."}
              </p>
              <div>
                <Button asChild>
                  <Link href="/jobs">Cari Lowongan</Link>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
