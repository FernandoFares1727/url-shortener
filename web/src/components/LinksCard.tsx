import { DownloadSimple, Link } from "@phosphor-icons/react";

function LinksCard() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-600">Meus links</h2>
        <button className="bg-gray-200 text-gray-500 p-2 rounded flex items-center hover:bg-gray-300 transition-colors">
          <DownloadSimple className="mr-2" size={18} />
          Baixar CSV
        </button>
      </div>
      <div className="flex flex-col items-center justify-center h-32">
        <Link className="text-gray-400 mb-2" size={32} />
        <p className="text-gray-400">AINDA NÃO EXISTEM LINKS CADASTRADOS</p>
      </div>
    </div>
  );
}

export default LinksCard;
