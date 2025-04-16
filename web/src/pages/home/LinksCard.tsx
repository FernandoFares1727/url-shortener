import { DownloadSimple, Link } from "@phosphor-icons/react";

function LinksCard() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/2 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl text-gray-600 font-bold">Meus links</h2>
        <button className="bg-gray-200 text-gray-500 p-2 rounded flex items-center hover:bg-gray-300 transition-colors text-sm font-semibold">
          <DownloadSimple className="mr-2" size={18} />
          Baixar CSV
        </button>
      </div>

      {/* Área centralizada - versão melhorada */}
      <div className="flex-1 flex flex-col items-center justify-center py-8">
        <div className="flex flex-col items-center justify-center">
          <Link className="text-gray-300 mb-2" size={32} />
          <p className="text-gray-400 text-sm text-center">
            AINDA NÃO EXISTEM LINKS CADASTRADOS
          </p>
        </div>
      </div>
    </div>
  );
}

export default LinksCard;
