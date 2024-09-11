import React from "react";
import { AiFillHome } from "react-icons/ai";
import { SiGoogleclassroom } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { BiCategory } from "react-icons/bi";
import { FaHashtag } from "react-icons/fa";
import { ImExit } from "react-icons/im";

const Navbar = ({
  setIsNavbarExpanded,
  isNavbarExpanded,
}: {
  setIsNavbarExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  isNavbarExpanded: boolean;
}) => {
  const navigate = useNavigate();

  return (
    <div
      className={`z-20 transition-all top-16 fixed left-0 bg-pmmBlue text-white py-1 text-sm h-full w-0 md:w-12 pb-16 ${
        isNavbarExpanded
          ? "md:w-56 w-56 overflow-clip"
          : "md:w-12 w-0 md:left-0 overflow-clip"
      }`}
      onMouseEnter={() => setIsNavbarExpanded(true)}
      onMouseLeave={() => setIsNavbarExpanded(false)}
    >
      <div className="w-full h-full flex flex-col">
        <button
          onClick={() => {
            navigate("/painel");
          }}
          className={`flex items-center py-2 hover:border-l-4 w-full h-10 border-blue-950 border-l-2 hover:bg-blue-900`}
        >
          <div
            className={`p-4 items-center  ${
              isNavbarExpanded ? "md:flex" : "md:flex hidden"
            }`}
          >
            <AiFillHome className="fill-white w-4 h-4" />
          </div>
          {isNavbarExpanded && <div>Home</div>}
        </button>

        <button
          onClick={() => {
            navigate("/painel/treinamentos");
          }}
          className={`flex items-center py-2 hover:border-l-4 w-full h-10 border-blue-950 border-l-2 hover:bg-blue-900`}
        >
          <div
            className={`p-4 items-center  ${
              isNavbarExpanded ? "md:flex" : "md:flex hidden"
            }`}
          >
            <SiGoogleclassroom className="fill-white w-4 h-4" />
          </div>
          {isNavbarExpanded && <div>Treinamentos</div>}
        </button>

        <button
          onClick={() => {
            navigate("/painel/categorias");
          }}
          className={`flex items-center py-2 hover:border-l-4 w-full h-10 border-blue-950 border-l-2 hover:bg-blue-900`}
        >
          <div
            className={`p-4 items-center  ${
              isNavbarExpanded ? "md:flex" : "md:flex hidden"
            }`}
          >
            <BiCategory className="fill-white w-4 h-4" />
          </div>
          {isNavbarExpanded && <div>Categoria</div>}
        </button>

        <button
          onClick={() => {
            navigate("/painel/tags");
          }}
          className={`flex items-center py-2 hover:border-l-4 w-full h-10 border-blue-950 border-l-2 hover:bg-blue-900`}
        >
          <div
            className={`p-4 items-center  ${
              isNavbarExpanded ? "md:flex" : "md:flex hidden"
            }`}
          >
            <FaHashtag className="fill-white w-4 h-4" />
          </div>
          {isNavbarExpanded && <div>Tags</div>}
        </button>

        <div className="flex-1"></div>

        <button
          onClick={() => {
            navigate("/");
          }}
          className={`flex items-center bg-blue-950 py-2 hover:border-l-4 w-full h-10 border-blue-950 border-l-2 hover:bg-blue-900`}
        >
          <div
            className={`p-4 items-center  ${
              isNavbarExpanded ? "md:flex" : "md:flex hidden"
            }`}
          >
            <ImExit className="fill-white w-4 h-4" />
          </div>
          {isNavbarExpanded && <div>Voltar aos treinamentos</div>}
        </button>
      </div>
      <div className="h-14"></div>
    </div>
  );
};

export default Navbar;
