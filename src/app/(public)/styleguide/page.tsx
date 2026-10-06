import type { Metadata } from "next";
import { StyleguideContent } from "./styleguide-content";

export const metadata: Metadata = {
  title: "Component Styleguide",
  robots: { index: false, follow: false },
};

export default function StyleguidePage() {
  return <StyleguideContent />;
}
