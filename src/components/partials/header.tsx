import { Button } from "../ui/button";
import DiretiLogo from "@/assets/diretiLogo.svg";

const Header = () => {
  return (
    <div className="flex justify-between w-full px-40 py-5">
      <div className="flex gap-10">
        <img src={DiretiLogo} width={250} alt="Direti Logo" />

        {/* TODO: Colocar icone na barra de busca */}
        <input
          type="text"
          className="border-b border-pmmGray placeholder:text-pmmGray placeholder:text-xs focus:outline-none"
          placeholder="Pesquisar"
        />
      </div>
      <div className="flex gap-16 items-center text-pmmGray">
        <a href="/login">Sobre a DIRETI</a>
        <a href="/register">Treinamentos</a>
        <Button className="bg-pmmBlue font-semibold text-sm">
          Criar treinamento
        </Button>
      </div>
    </div>
  );
};

export default Header;
