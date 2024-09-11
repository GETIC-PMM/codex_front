import { BASE_URL } from "@/utils/consts";
import dayjs from "dayjs";
import { Badge } from "../ui/badge";
import { useSearchParams } from "react-router-dom";
import { parseSearchParams } from "@/utils/functions";
import { Tag } from "@/utils/types";

const TreinamentoRelacionado = ({
  capa,
  nome_do_autor,
  data_publicacao,
  titulo,
  resumo,
  id,
  categoria,
  tags,
}: {
  capa: string;
  nome_do_autor: string;
  data_publicacao: string;
  titulo: string;
  resumo: string;
  id: string;
  tags: Tag[];
  categoria: { id: string; titulo: string };
}) => {
  const [search, setSearch] = useSearchParams();

  return (
    <div>
      <img
        src={`${BASE_URL}${capa}`}
        className="rounded-md object-cover w-full h-52 aspect-video"
        alt="Capa do treinamento"
      />
      <div className="flex flex-col gap-2 text-pmmBlue">
        <div className="flex flex-col w-full">
          <div className="flex justify-between gap-2 mt-2">
            <button
              onClick={() =>
                setSearch(() => ({
                  ...parseSearchParams(search),
                  page: "1",
                  categoria_id: categoria.id,
                }))
              }
              className="font-bold hover:underline cursor-pointer text-green-700 text-xs"
            >
              {categoria.titulo}
            </button>

            <div className="flex gap-2 text-xs">
              {tags.map((tag) => {
                return (
                  <Badge
                    onClick={() =>
                      setSearch(() => ({
                        ...parseSearchParams(search),
                        page: "1",
                        tag_id: tag.id,
                      }))
                    }
                    variant={"outline"}
                    className="hover:bg-blue-700/15 text-pmmBlue"
                  >
                    {tag.titulo}
                  </Badge>
                );
              })}
            </div>
          </div>

          <div className="flex justify gap-4 ">
            <h1 className="font-bold text-2xl text-pmmBlue">{titulo}</h1>
          </div>

          <div className="flex justify gap-4 items-center text-xs text-pmmGray">
            {/* <img
              className="rounded-full object-cover w-8 h-8 aspect-video"
              src={Ruby}
            /> */}
            <p>{nome_do_autor}</p>
            <p>{dayjs(data_publicacao).format("DD/MM/YYYY")}</p>
          </div>
        </div>
        <span className="text-sm text-zinc-600">{resumo}</span>
        <a href={`/treinamento/${id}`} className="text-xs hover:underline">
          Visualizar artigo &gt;
        </a>
      </div>
    </div>
  );
};

export default TreinamentoRelacionado;
