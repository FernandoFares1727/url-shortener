import { Link } from "react-router-dom";
import NotFoundIcon from "../assets/NotFound.svg";

const NotFoundLink = () => {
  return (
    <div className="bg-gray-300 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-md p-8 max-w-md w-full text-center drop-shadow-md">
        <img
          src={NotFoundIcon}
          alt="ícone de link não encontrado"
          className="mx-auto mb-4 w-24 h-24"
        />
        <h2 className="text-lg text-gray-600 mb-2">Link não encontrado</h2>
        <p className="text-xs text-gray-500 leading-tight max-w-xs mx-auto">
          O link que você está tentando acessar não existe, foi removido ou é
          uma URL inválida. Saiba mais em
          <Link to="/" className="text-blue-base underline ml-1">
            brev.ly
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default NotFoundLink;
