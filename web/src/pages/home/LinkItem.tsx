import { Copy, Trash } from "@phosphor-icons/react";

export type LinkItemProps = {
  id: string;
  originalUrl: string;
  shortUrl: string;
  accessCount: number;
  createdAt: string;
  onDelete: (id: string) => void;
  onAccess: (id: string) => Promise<string>; // Nova prop para lidar com o acesso
  isLast?: boolean;
  isDeleting?: boolean;
};

export function LinkItem({
  id,
  originalUrl,
  shortUrl,
  accessCount,
  onDelete,
  onAccess,
  isLast = false,
  isDeleting = false,
}: LinkItemProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(originalUrl);
  };

  const handleLinkClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const originalUrl = await onAccess(id);
      // Abre nova aba com a página de redirecionamento
      window.open(`/redirect?url=${encodeURIComponent(originalUrl)}`, "_blank");
    } catch (error) {
      console.error("Erro ao acessar link:", error);
    }
  };

  return (
    <div
      className={`w-full flex items-center justify-between p-3 ${isLast ? "" : "border-b border-gray-200"} ${isDeleting ? "opacity-50" : ""}`}
    >
      {isDeleting ? (
        <div className="flex items-center text-blue-base text-sm">
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-base"
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
          Removendo link...
        </div>
      ) : (
        <>
          <div className="flex flex-col flex-1 min-w-0">
            <a
              href={shortUrl}
              onClick={handleLinkClick}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-base text-sm font-normal leading-tight hover:underline truncate"
            >
              {shortUrl}
            </a>
            <span className="text-gray-400 text-xs font-normal leading-tight mt-0.5 truncate">
              {originalUrl}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-gray-400 text-xs font-normal">
            <span>{accessCount} acessos</span>
            <button
              aria-label="Copy link"
              className="p-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-400 cursor-pointer"
              type="button"
              onClick={handleCopy}
            >
              <Copy size={14} />
            </button>
            <button
              aria-label="Delete link"
              className="p-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-400 cursor-pointer"
              type="button"
              onClick={() => onDelete(id)}
            >
              <Trash size={14} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
