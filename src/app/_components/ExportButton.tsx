"use client";

import { Button } from "@/components/ui/button";
import { useReactToPrint } from "react-to-print";

type ExportButtonProps = {
  contentRef: React.RefObject<HTMLDivElement>;
};

export function ExportButton({ contentRef }: ExportButtonProps) {
  const handlePrint = useReactToPrint({
    documentTitle: "Monday.com Board Items",
    contentRef: contentRef,
    pageStyle: `
      @page {
        size: A4 landscape;
        margin: 15mm;
      }
      @media print {
        body { background: white; }
        .motion-div { 
          transform: none !important;
          display: grid !important;
          grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          gap: 1rem !important;
        }
        .print\\:hidden {
          display: none !important;
        }
      }
    `,
  });

  return (
    <Button
      onClick={() => void handlePrint()}
      variant="outline"
      className="ml-auto"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="mr-2 h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
        />
      </svg>
      Export PDF
    </Button>
  );
}
