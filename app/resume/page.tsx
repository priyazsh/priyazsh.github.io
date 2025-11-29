import type { Metadata } from "next";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import Footer from "../components/Footer";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "Resume",
  openGraph: {
    title: "Resume | Priyansh Prajapat",
    url: "https://priyanzsh.github.io/resume",
  },
  twitter: {
    title: "Resume | Priyansh Prajapat",
  },
};

export default function Resume() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <Link href="/" className="group inline-flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-300 font-medium px-4 py-2 rounded-lg hover:bg-white/5 backdrop-blur-sm border border-gray-700/30 hover:border-gray-600/50">
          <FaArrowLeft />
          <span>Back</span>
        </Link>
      </div>

      <h1 className="text-2xl font-display font-bold">My Resume</h1>

      <div className="relative w-full bg-white/5" style={{ height: "80vh" }}>
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
