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
import {
  BiArrowToLeft,
  BiArrowToRight,
  BiLeftArrowAlt,
  BiRightArrowAlt,
} from "react-icons/bi";
import { cn } from "@/lib/utils";
import { parseSearchParams } from "@/utils/functions";

const Busca = () => {
  const [search, setSearchParams] = useSearchParams();
  const [selectedTag, setSelectedTag] = useState(search.get("tag_id") ?? "");
  const [selectedCategoria, setSelectedCategoria] = useState(
    search.get("categoria_id") ?? ""
  );
  const [page, setPage] = useState(
    search.get("page") ? Number(search.get("page")) : 1
  );

  const categorias = useGetCategorias({ per_page: "all" });
  const tags = useGetTags({ per_page: "all" });

  const treinamentoQuery = useGetTreinamentos({
    search: search.get("search") ?? "",
    tag_id: search.get("tag_id") ?? "",
    categoria_id: search.get("categoria_id") ?? "",
    page: page ?? 1,
  });

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
    setPage(Number(search.get("page")) ?? 1);
  }, [search.get("page")]);

  useEffect(() => {
    if (categoria) {
      setSelectedCategoria(categoria);
    }
    if (tag) {
      setSelectedTag(tag);
    }
    treinamentoQuery.refetch();
  }, []);

  const busca = search.get("search");
  const categoria = search.get("categoria");
  const tag = search.get("tag");

  const _nextPage =
    treinamentoQuery.data?.meta.pagination.links.next?.split("?")[1];
  const _nextPageParams = new URLSearchParams(_nextPage);
  const nextPage = _nextPageParams.get("page") ?? undefined;

  const _lastPage =
    treinamentoQuery.data?.meta.pagination.links.last.split("?")[1];
  const _lastPageParams = new URLSearchParams(_lastPage);
  const lastPage = _lastPageParams.get("page") ?? undefined;

  const totalRows =
    page === treinamentoQuery.data?.meta.pagination.total_pages
      ? treinamentoQuery.data?.meta.pagination.total_objects
      : page * treinamentoQuery.data?.meta.pagination.per_page!;

  const firstRowIndex =
    (page - 1) * treinamentoQuery.data?.meta.pagination.per_page! + 1;

  return (
    <div>
      <div className="mt-4 mb-8">
        <div className="w-8 h-1 bg-green-600 rounded-full" mb-8></div>
        <span className="uppercase text-pmmBlue font-bold text-xs ">
          TREINAMENTO
        </span>
        <div className="flex flex-col sm:flex-row flex-2 justify-between  gap-2">
          <h1 className="text-pmmBlue text-4xl font-bold">
            {busca ? `Resultados para: ${busca}` : "Resultados"}
          </h1>
          <div className="flex flex-col sm:flex-row justify-between gap-2">
            <Select
              value={selectedCategoria}
              onValueChange={setSelectedCategoria}
            >
              <SelectTrigger className="w-full sm:w-[300px]">
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
              <SelectTrigger className="w-full sm:w-[300px]">
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
            {/* <div className="flex flex-1 justify-between sm:hidden">
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
            </div> */}
            <div className="flex flex-1 items-center justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Mostrando{" "}
                  <span className="font-medium">
                    {`${firstRowIndex}-${totalRows}`}{" "}
                  </span>{" "}
                  de {treinamentoQuery.data?.meta.pagination.total_objects}{" "}
                  resultados
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSearchParams((s) => ({
                      ...parseSearchParams(s),
                      page: "1",
                    }));
                    setPage(1);
                  }}
                  disabled={page === 1}
                  className={cn(
                    "rounded-full h-6 w-6 flex items-center justify-center disabled:cursor-default text-white bg-pmmBlue disabled:opacity-50 disabled:text-black disabled:bg-transparent"
                  )}
                >
                  <BiArrowToLeft />
                </button>
                <button
                  onClick={() => {
                    setSearchParams((s) => ({
                      ...parseSearchParams(s),
                      page: String(page - 1),
                    }));
                    setPage(page - 1);
                  }}
                  disabled={page === 1}
                  className={cn(
                    "rounded-full h-6 w-6 flex items-center justify-center disabled:cursor-default text-white bg-pmmBlue disabled:opacity-50 disabled:text-black disabled:bg-transparent"
                  )}
                >
                  <BiLeftArrowAlt />
                </button>
                <button
                  onClick={() => {
                    setSearchParams((s) => ({
                      ...parseSearchParams(s),
                      page: nextPage ?? "",
                    }));
                    setPage(Number(nextPage));
                  }}
                  disabled={!nextPage}
                  className={cn(
                    "rounded-full h-6 w-6 flex items-center justify-center disabled:cursor-default text-white bg-pmmBlue disabled:opacity-50 disabled:text-black disabled:bg-transparent"
                  )}
                >
                  <BiRightArrowAlt />
                </button>
                <button
                  onClick={() => {
                    setSearchParams((s) => ({
                      ...parseSearchParams(s),
                      page: lastPage ?? "",
                    }));
                    setPage(Number(lastPage));
                  }}
                  disabled={page === Number(lastPage)}
                  className={cn(
                    "rounded-full h-6 w-6 flex items-center justify-center disabled:cursor-default text-white bg-pmmBlue disabled:opacity-50 disabled:text-black disabled:bg-transparent"
                  )}
                >
                  <BiArrowToRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Busca;
