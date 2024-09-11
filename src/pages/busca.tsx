import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import TreinamentoCard from "../components/partials/treinamentoCard";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useGetCategorias,
  useGetTags,
  useGetTreinamentos,
} from "@/utils/queries";
import { Button } from "@/components/ui/button";
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";
import { cn } from "@/lib/utils";

const Busca = () => {
  const [search, setSearchParams] = useSearchParams();
  const [selectedTag, setSelectedTag] = useState(search.get("tag_id") ?? "");
  const [selectedCategoria, setSelectedCategoria] = useState(
    search.get("categoria_id") ?? ""
  );
  const [page, setPage] = useState(1);

  const categorias = useGetCategorias({ per_page: "all" });
  const tags = useGetTags({ per_page: "all" });

  const busca = search.get("search");
  const categoria = search.get("categoria");
  const tag = search.get("tag");

  const treinamentoQuery = useGetTreinamentos({
    search: search.get("search") ?? "",
    tag_id: search.get("tag_id") ?? "",
    categoria_id: search.get("categoria_id") ?? "",
    page: page,
  });

  const _nextPage =
    treinamentoQuery.data?.meta.pagination.links.next?.split("?")[1];
  const _nextPageParams = new URLSearchParams(_nextPage);
  const nextPage = _nextPageParams.get("page") ?? undefined;

  const submitFiltrar = () => {
    setSearchParams({
      search: search.get("search") ?? "",
      categoria_id: selectedCategoria,
      tag_id: selectedTag,
    });
    treinamentoQuery.refetch();
  };

  const submitLimpar = () => {
    setSelectedCategoria("");
    setSelectedTag("");
    setSearchParams({
      search: search.get("search") ?? "",
      categoria_id: "",
      tag_id: "",
    });
  };

  useEffect(() => {
    treinamentoQuery.refetch();
  }, [search]);

  useEffect(() => {
    if (categoria) {
      console.log("categoria", categoria);
      setSelectedCategoria(categoria);
    }
    if (tag) {
      setSelectedTag(tag);
    }
    treinamentoQuery.refetch();
  }, []);

  return (
    <div>
      <div className="mt-4 mb-8">
        <div className="w-8 h-1 bg-green-600 rounded-full" mb-8></div>
        <span className="uppercase text-pmmBlue font-bold text-xs ">
          TREINAMENTO
        </span>
        <div className="flex flex-2 justify-between  gap-2">
          <h1 className="text-pmmBlue text-4xl font-bold">
            {busca ? `Resultados para: ${busca}` : "Resultados"}
          </h1>
          <div className="flex justify-between gap-2">
            <Select
              value={selectedCategoria}
              onValueChange={setSelectedCategoria}
            >
              <SelectTrigger className="w-[300px]">
                <SelectValue placeholder="Filtrar por categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categorias.data?.categorias.map((categoria) => (
                    <SelectItem key={categoria.id} value={categoria.id}>
                      {categoria.titulo}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select value={selectedTag} onValueChange={setSelectedTag}>
              <SelectTrigger className="w-[300px]">
                <SelectValue placeholder="Filtrar por tag" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {tags.data?.tags.map((tag) => (
                    <SelectItem key={tag.id} value={tag.id}>
                      {tag.titulo}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Button onClick={submitFiltrar}>Filtrar</Button>
            <Button variant={"destructive"} onClick={submitLimpar}>
              Limpar
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-10 w-full">
        {treinamentoQuery.data?.treinamentos.map((treinamento) => {
          return (
            <TreinamentoCard
              key={treinamento.id}
              tags={treinamento.tags}
              capa={treinamento.capa}
              titulo={treinamento.titulo}
              nome_do_autor={treinamento.nome_do_autor}
              data_publicacao={treinamento.data_publicacao}
              resumo={treinamento.resumo}
              id={treinamento.id}
              categoria={treinamento.categoria}
            />
          );
        })}

        <div className="flex flex-col gap-10">
          <div className="flex items-center justify-between border-t border-gray-200 bg-white py-3">
            <div className="flex flex-1 justify-between sm:hidden">
              <a
                href="#"
                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white  py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
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
                  Mostrando{" "}
                  <span className="font-medium">
                    {treinamentoQuery.data?.treinamentos.length}
                  </span>{" "}
                  de {treinamentoQuery.data?.meta.pagination.total_objects}{" "}
                  resultados
                </p>
              </div>
              <div className="flex gap-2">
                <div
                  className={cn(
                    "rounded-full h-6 w-6 flex items-center justify-center",
                    {
                      "bg-pmmBlue text-white cursor-pointer":
                        treinamentoQuery.data?.meta.pagination.links.first !==
                        treinamentoQuery.data?.meta.pagination.links.last,
                    }
                  )}
                >
                  <BiArrowToLeft />
                </div>
                <div
                  className={cn(
                    "rounded-full h-6 w-6 flex items-center justify-center",
                    {
                      "bg-pmmBlue text-white cursor-pointer":
                        treinamentoQuery.data?.meta.pagination.links.next,
                    }
                  )}
                >
                  <BiArrowToRight />
                </div>
                <div
                  onClick={() => {
                    setSearchParams({
                      search: search.get("search") ?? "",
                      categoria_id: selectedCategoria,
                      tag_id: selectedTag,
                      page: nextPage,
                    });
                    treinamentoQuery.refetch();
                  }}
                  className={cn(
                    "rounded-full h-6 w-6 flex items-center justify-center",
                    {
                      "bg-pmmBlue text-white cursor-pointer":
                        treinamentoQuery.data?.meta.pagination.links.next,
                    }
                  )}
                >
                  <BiArrowToRight />
                </div>
                <div className="rounded-full h-6 w-6 flex items-center justify-center">
                  <BiArrowToRight />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Busca;
