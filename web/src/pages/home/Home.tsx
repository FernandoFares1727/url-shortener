import { useState, useEffect } from "react";
import Logo from "../assets/Logo.svg";
import LinksCard from "./LinksCard";
import NewLinkCard from "./NewLinkCard";
import { LinkItemProps } from "./LinkItem";

function Home() {
  const [links, setLinks] = useState<LinkItemProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await fetch("http://localhost:3333/api/v1/links");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Erro ao carregar links");
        }

        // Transforma os dados da API no formato esperado pelo componente
        const formattedLinks = data.map((link: LinkItemProps) => ({
          id: link.id,
          originalUrl: link.originalUrl,
          shortUrl: `brev.ly/${link.shortUrl}`,
          accessCount: link.accessCount,
          createdAt: link.createdAt,
          onDelete: () => {}, // placeholder, será substituído
        }));

        setLinks(formattedLinks);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Ocorreu um erro desconhecido",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchLinks();
  }, []);

  const handleDeleteLink = (id: string) => {
    setLinks((prevLinks) => prevLinks.filter((link) => link.id !== id));
  };

  const handleAddLink = (newLink: LinkItemProps) => {
    setLinks((prevLinks) => [newLink, ...prevLinks]);
  };

  // Ordena os links por createdAt (mais recentes primeiro)
  const sortedLinks = [...links].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <div className="w-full max-w-4xl mx-auto p-4 flex flex-col">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 mt-15">
          <div className="flex items-center">
            <img src={Logo} alt="Logo" className="mr-2" />
          </div>
        </div>
        {/* Cards Container */}
        <div className="flex-grow flex flex-col">
          {isLoading ? (
            <div className="text-center py-8">Carregando links...</div>
          ) : error ? (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">
              {error}
            </div>
          ) : (
            <div className="flex flex-col md:flex-row justify-between w-full">
              <NewLinkCard onAddLink={handleAddLink} />
              <LinksCard links={sortedLinks} onDelete={handleDeleteLink} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
