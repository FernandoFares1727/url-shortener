import Logo from "./assets/Logo.svg";
import LinksCard from "./components/LinksCard";
import NewLinkCard from "./components/NewLinkCard";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      {" "}
      {/* Fundo cinza sem margens */}
      <div className="w-full max-w-4xl mx-auto p-4 flex flex-col">
        {" "}
        {/* Container do conteúdo */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 mt-4">
          <div className="flex items-center">
            <img src={Logo} alt="Logo" className="mr-2" />
          </div>
        </div>
        {/* Cards Container */}
        <div className="flex-grow flex flex-col">
          <div className="flex flex-col md:flex-row justify-between w-full">
            <NewLinkCard />
            <LinksCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
