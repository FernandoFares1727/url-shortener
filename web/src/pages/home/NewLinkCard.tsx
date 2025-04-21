import { useState } from "react";
import { LinkItemProps } from "./LinkItem";

type NewLinkCardProps = {
  onAddLink: (newLink: Omit<LinkItemProps, "onAccess" | "onDelete">) => void;
};

function NewLinkCard({ onAddLink }: NewLinkCardProps) {
  const [shortLink, setShortLink] = useState("");
  const [originalLink, setOriginalLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("http://localhost:3333/api/v1/link/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          originalUrl: originalLink,
          shortUrl: shortLink,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao criar link");
      }

      onAddLink({
        id: data.id,
        originalUrl: originalLink,
        shortUrl: `brev.ly/${shortLink}`,
        accessCount: 0,
        createdAt: data.createdAt,
      });

      setSuccess("Link criado com sucesso!");
      setOriginalLink("");
      setShortLink("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Ocorreu um erro desconhecido",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/2 mb-4 md:mb-0 md:mr-4">
      <h2 className="text-xl text-gray-600 font-bold mb-4">Novo link</h2>
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-danger rounded text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded text-sm">
          {success}
        </div>
      )}

      {/* Mensagem de carregamento durante a criação */}
      {isLoading && (
        <div className="mb-4 p-3 bg-blue-50 text-blue-dark rounded text-sm flex items-center">
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
          Criando seu link, por favor aguarde...
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="original-link"
            className="block text-gray-500 text-xs uppercase font-semibold"
          >
            LINK ORIGINAL
          </label>
          <input
            type="text"
            id="original-link"
            value={originalLink}
            onChange={(e) => setOriginalLink(e.target.value)}
            placeholder="www.exemplo.com.br"
            className="w-full p-2 border border-gray-200 rounded mt-1 text-md"
            required
            disabled={isLoading}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="shortened-link"
            className="block text-gray-500 text-xs uppercase font-semibold"
          >
            LINK ENCURTADO
          </label>
          <div className="relative">
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none text-md">
              brev.ly/
            </div>
            <input
              type="text"
              id="shortened-link"
              value={shortLink}
              onChange={(e) => setShortLink(e.target.value)}
              className="w-full p-2 pl-16 border border-gray-200 rounded mt-1 text-md"
              required
              disabled={isLoading}
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-blue-base text-white p-2 rounded hover:bg-blue-dark transition-colors text-md font-semibold cursor-pointer ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Salvando..." : "Salvar link"}
        </button>
      </form>
    </div>
  );
}

export default NewLinkCard;
