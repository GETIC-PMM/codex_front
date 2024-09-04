import React from "react";
import Aula from "../components/partials/treinamento";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import {useGetTreinamentos, useGetCategorias, useGetTags } from "../utils/queries";
import {
     Select,
    SelectGroup,
    SelectValue,
    SelectTrigger,
    SelectContent,
    SelectLabel,
    SelectItem,
    SelectSeparator,
    SelectScrollUpButton,
    SelectScrollDownButton,
} from "../components/ui/select";

import axios from "axios";
import { useQuery } from "react-query";
import { API_URL } from "@/utils/consts";
import { GetTagsTYPE, GetTreinamentosTYPE, GetCategoriasTYPE } from '../utils/types';
import Treinamento from "../components/partials/treinamento";




const items = [
  
  { id: 1, title: 'Back End Developer'},
  { id: 2, title: 'Front End Developer' },
  { id: 3, title: 'User Interface Designer'},
]
const Busca = () => {
  
  const tags = useGetTags({ Headers })
  const treinamentos = useGetTreinamentos({ Headers });
  const categorias = useGetCategorias({ Headers });



  const getData = useQuery({
      queryKey: ['treinamentos, tags, categorias'],
      queryFn: async () => {
          const { data } = await axios.get<GetTreinamentosTYPE[]>(
              `${API_URL}/treinamentos`,
              {
                  headers: {
                      Authorization: `Bearer ${localStorage.getItem('token')}`,
                  },
              }
          )
          return data
      },
  })
 
  return (
    <div>
      <div className="mt-4">
        <div className="w-8 h-1 bg-green-600 rounded-full"></div>

     

        <span className="uppercase text-pmmBlue font-bold text-xs ">TREINAMENTO</span>
        <div className="flex flex-2 justify-between  gap-2">
          <h1 className="text-pmmBlue text-4xl font-bold">Resultados para {}</h1>
          <div className="flex w-41 justify-between gap-2">

          </div>
        </div>
      </div>
          <Treinamento />
      <div className="relative mt-11"></div>
      

      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <a
            href="#"
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Anterior
          </a>
          <a
            href="#"
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Próximo
          </a>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Mostrando <span className="font-medium">1</span> de <span className="font-medium">10</span> de{' '}
              <span className="font-medium">97</span> resultados
            </p>
          </div>
          <div>
            <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-sm">
              <a
                href="#"
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
              </a>
              {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
              <a
                href="#"
                aria-current="page"
                className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                1
              </a>
              <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                2
              </a>
              <a
                href="#"
                className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
              >
                3
              </a>
              <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                ...
              </span>
              <a
                href="#"
                className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
              >
                8
              </a>
              <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                9
              </a>
              <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                10
              </a>
              <a
                href="#"
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Próximo</span>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Busca;
