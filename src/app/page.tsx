import Link from "next/link";
import { BriefcaseBusiness } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center gap-6 px-6 text-center">
      <span className="flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
        <BriefcaseBusiness className="size-7" aria-hidden="true" />
      </span>
      <div className="grid gap-2">
        <h1 className="font-heading text-4xl font-semibold tracking-tight">
          JobTrack
        </h1>
        <p className="max-w-md text-muted-foreground">
          Mini job portal untuk mempertemukan Job Seeker dan Employer. Landing
          page lengkap dikerjakan pada Phase 3.
        </p>
      </div>
      <Button asChild size="lg" className="h-11 px-5">
        <Link href="/styleguide">Buka component styleguide</Link>
      </Button>
    </main>
  );
}
