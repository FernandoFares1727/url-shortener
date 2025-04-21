import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import LogoIcon from "../assets/LogoIcon.svg";

const RedirectLink = () => {
  const [searchParams] = useSearchParams();
  const originalUrl = searchParams.get("url");

  useEffect(() => {
    if (originalUrl) {
      window.location.href = originalUrl;
    }
  }, [originalUrl]);

  if (!originalUrl) {
    return (
      <div className="bg-gray-200 min-h-screen flex items-center justify-center p-4">
        <div className="bg-gray-100 rounded-md max-w-[360px] w-full p-8 flex flex-col items-center text-center">
          <img
            src={LogoIcon}
            alt="ícone de Redirecionamento"
            className="mb-4"
            width={24}
            height={24}
            style={{ width: 24, height: 24 }}
          />
          <p className="text-md text-gray-600 mb-1">Link inválido</p>
          <p className="text-xs text-gray-600">
            O link que você tentou acessar não é válido.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center p-4">
      <div className="bg-gray-100 rounded-md max-w-[360px] w-full p-8 flex flex-col items-center text-center">
        <img
          src={LogoIcon}
          alt="ícone de Redirecionamento"
          className="mb-4"
          width={24}
          height={24}
          style={{ width: 24, height: 24 }}
        />
        <p className="text-md text-gray-600 mb-1">Redirecionando...</p>
      </div>
    </div>
  );
};

export default RedirectLink;
