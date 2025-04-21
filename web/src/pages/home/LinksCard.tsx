import { DownloadSimple, Link } from "@phosphor-icons/react";
import { LinkItem } from "./LinkItem";
import { useState } from "react";

type LinksCardProps = {
  links: {
    id: string;
    originalUrl: string;
    shortUrl: string;
    accessCount: number;
    createdAt: string;
  }[];
  onDelete: (id: string) => void;
  onAccess: (id: string) => Promise<string>; // Nova prop para lidar com o acesso
};

function LinksCard({ links, onDelete, onAccess }: LinksCardProps) {
  const maxHeightInRem = 12;
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  const handleExportCSV = async () => {
    setIsExporting(true);
    setExportError(null);

    try {
      const postResponse = await fetch(
        "http://localhost:3333/api/v1/links/export",
        {
          method: "POST",
        },
      );

      if (!postResponse.ok) {
        console.log(postResponse);
        throw new Error("Falha ao solicitar exportação");
      }

      const getResponse = await fetch(
        "http://localhost:3333/api/v1/links/import",
      );

      if (!getResponse.ok) {
        throw new Error("Falha ao baixar o arquivo CSV");
      }

      const blob = await getResponse.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "links_exportados.csv";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setExportError(
        err instanceof Error ? err.message : "Erro desconhecido ao exportar",
      );
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/2 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl text-gray-600 font-bold">Meus links</h2>
        <button
          onClick={handleExportCSV}
          disabled={isExporting || links.length === 0}
          className={`bg-gray-200 text-gray-500 p-2 rounded flex items-center hover:bg-gray-300 transition-colors text-sm font-semibold cursor-pointer ${
            isExporting || links.length === 0
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          {isExporting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Exportando...
            </>
          ) : (
            <>
              <DownloadSimple className="mr-2" size={18} />
              Baixar CSV
            </>
          )}
        </button>
      </div>

      {exportError && (
        <div className="mb-4 p-3 bg-red-100 text-danger rounded text-sm">
          {exportError}
        </div>
      )}

      <div
        className="overflow-y-auto"
        style={{ maxHeight: `${maxHeightInRem}rem` }}
      >
        {links.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {links.map((link, index) => (
              <LinkItem
                key={link.id}
                id={link.id}
                originalUrl={link.originalUrl}
                shortUrl={link.shortUrl}
                accessCount={link.accessCount}
                createdAt={link.createdAt}
                onDelete={onDelete}
                onAccess={onAccess}
                isLast={index === links.length - 1}
              />
            ))}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center py-8">
            <div className="flex flex-col items-center justify-center">
              <Link className="text-gray-300 mb-2" size={32} />
              <p className="text-gray-400 text-sm text-center">
                AINDA NÃO EXISTEM LINKS CADASTRADOS
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LinksCard;
