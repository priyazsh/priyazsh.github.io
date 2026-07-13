import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Footer from "../components/Footer";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "Resume",
  alternates: {
    canonical: "https://priyazsh.github.io/resume",
  },
  openGraph: {
    title: "Resume | Priyansh Prajapat",
    url: "https://priyazsh.github.io/resume",
  },
  twitter: {
    title: "Resume | Priyansh Prajapat",
  },
};

export default function Resume() {
  return (
    <div className="space-y-6 mt-2">
      <Link href="/" className="btn-ghost">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back</span>
      </Link>

      <p className="section-header">Resume</p>

      <div
        className="card relative w-full overflow-hidden"
        style={{ height: "80vh" }}
      >
        <iframe
          src="/PriyanshResume.pdf"
          className="w-full h-full"
          title="Priyansh Prajapat Resume"
        />
      </div>
      <Footer />
    </div>
  );
}
