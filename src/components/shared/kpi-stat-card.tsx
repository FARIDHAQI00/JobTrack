import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface KPIStatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  delta?: {
    value: string;
    direction: "up" | "down" | "flat";
    caption?: string;
  };
  hint?: string;
}

const DELTA_ICONS = {
  up: ArrowUpRight,
  down: ArrowDownRight,
  flat: Minus,
} as const;

/**
 * Kartu KPI dashboard: ikon, nilai besar, dan delta opsional.
 *
 * Delta selalu disertai arah (ikon) dan teks, tidak mengandalkan warna saja.
 */
export function KPIStatCard({
  label,
  value,
  icon: Icon,
  delta,
  hint,
}: KPIStatCardProps) {
  const DeltaIcon = delta ? DELTA_ICONS[delta.direction] : null;

  return (
    <Card>
      <CardContent className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <div className="grid gap-0.5">
          <span className="text-sm text-muted-foreground">{label}</span>
          <span className="font-heading text-3xl font-semibold tabular-nums">
            {value}
          </span>
          {delta && DeltaIcon ? (
            <span
              className={cn(
                "inline-flex items-center gap-1 text-xs",
                delta.direction === "up" && "text-success",
                delta.direction === "down" && "text-warning",
                delta.direction === "flat" && "text-muted-foreground"
              )}
            >
              <DeltaIcon className="size-3" aria-hidden="true" />
              {delta.value}
              {delta.caption ? (
                <span className="text-muted-foreground">{delta.caption}</span>
              ) : null}
            </span>
          ) : hint ? (
            <span className="text-xs text-muted-foreground">{hint}</span>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
