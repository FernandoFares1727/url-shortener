// LinksCard.tsx
import { DownloadSimple, Link } from "@phosphor-icons/react";
import { LinkItem } from "./LinkItem";

type LinksCardProps = {
  links: {
    id: string;
    originalUrl: string;
    shortUrl: string;
    accessCount: number;
    createdAt: string;
  }[];
  onDelete: (id: string) => void;
};

function LinksCard({ links, onDelete }: LinksCardProps) {
  const maxHeightInRem = 11;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/2 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl text-gray-600 font-bold">Meus links</h2>
        <button className="bg-gray-200 text-gray-500 p-2 rounded flex items-center hover:bg-gray-300 transition-colors text-sm font-semibold">
          <DownloadSimple className="mr-2" size={18} />
          Baixar CSV
        </button>
      </div>

      <div
        className="overflow-y-auto"
        style={{ maxHeight: `${maxHeightInRem}rem` }}
      >
        {links.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {" "}
            {/* Adiciona divisor entre itens */}
            {links.map((link, index) => (
              <LinkItem
                key={link.id}
                id={link.id}
                originalUrl={link.originalUrl}
                shortUrl={link.shortUrl}
                accessCount={link.accessCount}
                createdAt={link.createdAt}
                onDelete={onDelete}
                isLast={index === links.length - 1} // Passa informação se é o último item
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
