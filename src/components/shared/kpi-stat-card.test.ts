import { createElement } from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { BriefcaseBusiness } from "lucide-react";
import { KPIStatCard } from "./kpi-stat-card";

describe("KPIStatCard", () => {
  it("menampilkan label dan nilai", () => {
    render(
      createElement(KPIStatCard, {
        label: "Lowongan Aktif",
        value: "24",
        icon: BriefcaseBusiness,
      })
    );

    expect(screen.getByText("Lowongan Aktif")).toBeInTheDocument();
    expect(screen.getByText("24")).toBeInTheDocument();
  });

  it("menampilkan delta beserta caption", () => {
    render(
      createElement(KPIStatCard, {
        label: "Total Pelamar",
        value: "187",
        icon: BriefcaseBusiness,
        delta: { value: "12%", direction: "up" as const, caption: "Minggu ini" },
      })
    );

    expect(screen.getByText("12%")).toBeInTheDocument();
    expect(screen.getByText("Minggu ini")).toBeInTheDocument();
  });
});
