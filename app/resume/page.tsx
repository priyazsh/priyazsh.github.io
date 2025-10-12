"use client";

import { 
  containerStyles,
  BackButton,
  GradientButton,
  DownloadIcon,
  Footer
} from '../components/Ui';

export default function Resume() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center px-4 py-6">
      <div className={`${containerStyles.wideContent} flex justify-between items-center mb-6`}>
        <BackButton href="/" text="Back to Portfolio" />
        
        <GradientButton href="/PriyanshPrajapatResume.pdf" download>
          <DownloadIcon />
          Download PDF
        </GradientButton>
      </div>

      <div className={`${containerStyles.wideContent} flex-1 mb-6`}>
        <div className={`${containerStyles.card} shadow-[0_0_15px_rgba(124,58,237,0.2)] h-[80vh]`}>
          <iframe
            src="/PriyanshPrajapatResume.pdf"
            className="w-full h-full"
            title="Priyansh Prajapat Resume"
          />
        </div>
      </div>

      <div className={`${containerStyles.wideContent} text-center`}>
        <Footer />
      </div>
    </div>
  );
}