import React from 'react';
import { FileText } from 'lucide-react';
import type { CompleteServiceIntelligence } from '../types/intelligence';
import { exportVerificationReportPdf, type PdfReportTabType } from '../utils/exportPdfReport';

interface Props {
  data?: CompleteServiceIntelligence;
  tab?: PdfReportTabType;
  onClick?: () => void;
  className?: string;
}

export const PdfReportButton: React.FC<Props> = ({ 
  data, 
  tab = 'overview',
  onClick, 
  className = '' 
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (data) {
      exportVerificationReportPdf(data, tab);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 border border-sky-400/50 shadow-md shadow-sky-950/40 hover:shadow-sky-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer font-sans shrink-0 ${className}`}
      title="현재 탭 내용을 A4 1장 PDF로 다운로드"
    >
      <FileText className="w-4 h-4 text-white shrink-0" />
      <span>PDF 다운로드</span>
    </button>
  );
};

export default PdfReportButton;
