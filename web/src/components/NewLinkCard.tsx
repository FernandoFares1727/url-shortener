import { useState } from "react";

function NewLinkCard() {
  const [shortLink, setShortLink] = useState("");

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/2 mb-4 md:mb-0 md:mr-4">
      <h2 className="text-xl font-semibold mb-4">Novo link</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="original-link" className="block text-gray-700">
            LINK ORIGINAL
          </label>
          <input
            type="text"
            id="original-link"
            placeholder="www.exemplo.com.br"
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="shortened-link" className="block text-gray-700">
            LINK ENCURTADO
          </label>
          <div className="relative">
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
              brev.ly/
            </div>
            <input
              type="text"
              id="shortened-link"
              value={shortLink}
              onChange={(e) => setShortLink(e.target.value)}
              className="w-full p-2 pl-16 border border-gray-300 rounded mt-1"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
        >
          Salvar link
        </button>
      </form>
    </div>
  );
}

export default NewLinkCard;
