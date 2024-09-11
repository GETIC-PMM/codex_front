import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../../../ui/button";
import DiretiLogo from "@/assets/diretiLogo.svg";
import axios from "axios";
import { useState } from "react";
import { API_URL } from "@/utils/consts";
import { useNavigate } from "react-router-dom";



const Header = () => {

  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const handleSearch = async () => {
    if (search.trim() === "") return;
    try {

      const response = await axios.get(`${API_URL}/treinamentos`);
      setResults(response.data);     
    } catch (error) {
      console.error("Erro ao buscar treinamentos", error);
    }
  }

  return (
    <div className="flex justify-between w-full py-5 ">
      <div className="flex gap-10">
        <a href="/">
          <img src={DiretiLogo} width={250} alt="Direti Logo" />
        </a>

        {/* TODO: Colocar icone na barra de busca */}
        <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate("/busca?search=" + search);}}
        >
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}     
          className="border-b border-pmmGray placeholder:text-pmmGray placeholder:text-xs focus:outline-none"
          placeholder="Pesquisar"
          />
          </form>
      </div>
      <div className="flex gap-16 items-center text-pmmGray">
        <a href="/sobre">Sobre a DIRETI</a>
        <a href="/register">Treinamentos</a>
        <a
          href="/painel"
          className={buttonVariants() + "bg-pmmBlue font-semibold text-sm"}
        >
          Criar treinamento
        </a>
      </div>
    </div>
  );
};

export default Header;
