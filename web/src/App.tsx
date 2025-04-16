//import { useState } from "react";

function App() {
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <img src="https://placehold.co/40x40" alt="Logo" className="mr-2" />
          <span className="text-2xl font-bold text-blue-600">brev.ly</span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between mt-8">
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
              <input
                type="text"
                id="shortened-link"
                placeholder="brev.ly/"
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded"
            >
              Salvar link
            </button>
          </form>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Meus links</h2>
            <button className="bg-gray-200 text-gray-700 p-2 rounded flex items-center">
              <i className="fas fa-download mr-2"></i>
              Baixar CSV
            </button>
          </div>
          <div className="flex flex-col items-center justify-center h-32">
            <i className="fas fa-link text-4xl text-gray-400 mb-2"></i>
            <p className="text-gray-500">AINDA NÃO EXISTEM LINKS CADASTRADOS</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
