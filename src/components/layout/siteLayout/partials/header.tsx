import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../../../ui/button";
import DiretiLogo from "@/assets/diretiLogo.svg";
import axios from "axios";
import { useState } from "react";
import { API_URL } from "@/utils/consts";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CiMenuBurger } from "react-icons/ci";

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
  };

  return (
    <div className="flex sm:justify-between w-full py-5 mb-10 items-center">
      <div className="flex gap-10">
        <a href="/">
          <img
            src={DiretiLogo}
            className="w-[120px] sm:w-[250px]"
            alt="Direti Logo"
          />
        </a>

        {/* TODO: Colocar icone na barra de busca */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate("/busca?search=" + search);
          }}
          className="flex items-center"
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
      <div className="ml-4">
        <div className="sm:flex gap-16 hidden items-center text-pmmGray">
          <a href="/sobre">Sobre a DIRETI</a>
          <a href="/busca?search=">Treinamentos</a>
          <a
            href="/painel"
            className={buttonVariants() + "bg-pmmBlue font-semibold text-sm"}
          >
            Criar treinamento
          </a>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="sm:hidden">
            <CiMenuBurger />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Menu</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <a href="/sobre">Sobre a DIRETI</a>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <a href="/busca?search=">Treinamentos</a>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <a
                href="/painel"
                className={
                  buttonVariants() + "bg-pmmBlue font-semibold text-sm"
                }
              >
                Criar treinamento
              </a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Header;
