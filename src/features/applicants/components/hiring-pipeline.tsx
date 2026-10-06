import { Progress } from "@/components/ui/progress";
import type { PipelineStage } from "@/domain/application";
import { APPLICATION_STATUS_LABELS } from "@/domain/status";

export interface HiringPipelineProps {
  stages: PipelineStage[];
}

/**
 * Ringkasan hiring pipeline Employer per tahap.
 *
 * Nilai dan persentase selalu tampil sebagai teks; progress bar hanya
 * memperkuat visual, sesuai panduan chart aksesibel (tidak mengandalkan warna).
 */
export function HiringPipeline({ stages }: HiringPipelineProps) {
  const total = stages.reduce((sum, stage) => sum + stage.count, 0);

  return (
    <div className="flex flex-col gap-5" role="group" aria-label="Hiring pipeline">
      {stages.map((stage) => {
        const percent =
          total === 0 ? 0 : Math.round((stage.count / total) * 100);
        const label = APPLICATION_STATUS_LABELS[stage.status];

        return (
          <div key={stage.status} className="grid gap-1.5">
            <div className="flex items-baseline justify-between gap-3 text-sm">
              <span className="font-medium">{label}</span>
              <span className="tabular-nums text-muted-foreground">
                {stage.count} kandidat ({percent}%)
              </span>
            </div>
            <Progress
              value={percent}
              className="h-1.5"
              aria-label={`${label}: ${stage.count} kandidat`}
            />
          </div>
        );
      })}
    </div>
  );
}
