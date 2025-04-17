// LinkItem.tsx
import { Copy, Trash } from "@phosphor-icons/react";

export type LinkItemProps = {
  id: string;
  originalUrl: string;
  shortUrl: string;
  accessCount: number;
  createdAt: string;
  onDelete: (id: string) => void;
  isLast?: boolean; // Nova prop para identificar o último item
};

export function LinkItem({
  id,
  originalUrl,
  shortUrl,
  accessCount,
  onDelete,
  isLast = false,
}: LinkItemProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(originalUrl);
  };

  return (
    <div
      className={`w-full flex items-center justify-between p-3 ${isLast ? "" : "border-b border-gray-200"}`}
    >
      <div className="flex flex-col flex-1 min-w-0">
        <a
          href={originalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 text-sm font-normal leading-tight hover:underline truncate"
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
          className="p-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-400"
          type="button"
          onClick={handleCopy}
        >
          <Copy size={14} />
        </button>
        <button
          aria-label="Delete link"
          className="p-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-400"
          type="button"
          onClick={() => onDelete(id)}
        >
          <Trash size={14} />
        </button>
      </div>
    </div>
  );
}
