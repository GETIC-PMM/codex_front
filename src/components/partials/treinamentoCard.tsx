import { Tag } from "@/utils/types";
import dayjs from "dayjs";
import { BASE_URL } from "@/utils/consts";
import { useNavigate, useSearchParams } from "react-router-dom";
import { parseSearchParams } from "@/utils/functions";

const TreinamentoCard = ({
  tags,
  capa,
  titulo,
  nome_do_autor,
  data_publicacao,
  resumo,
  id,
  categoria,
}: {
  tags: Tag[];
  capa: { url: string };
  titulo: string;
  nome_do_autor: string;
  data_publicacao: string;
  resumo: string;
  id: string;
  categoria: { id: string; titulo: string };
}) => {
  const navigate = useNavigate();
  const [search, setSearch] = useSearchParams();
  return (
    <div className="flex w-full gap-10">
      <img
        src={`${BASE_URL}${capa.url}`}
        className="rounded-md object-cover cursor-pointer max-w-96 h-full aspect-video flex-[1]"
        alt="Ruby"
        onClick={() => {
          navigate(`/treinamento/${id}`);
        }}
      />
      <div className="flex-[2]">
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

            <div className="flex gap-4 text-xs">
              {tags.map((tag) => {
                return (
                  <button
                    onClick={() =>
                      setSearch(() => ({
                        ...parseSearchParams(search),
                        page: "1",
                        tag_id: tag.id,
                      }))
                    }
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-10 rounded-full hover:underline"
                  >
                    {tag.titulo}
                  </button>
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

        <div className="mt-5">
          <span className="text-sm text-pmmBlue ">{resumo}</span>
          <div className="flex justify-end gap-4 mt-4">
            <a
              href={`/treinamento/${id}`}
              className="text-xs hover:underline w-max text-pmmBlue "
            >
              Visualizar artigo &gt;
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TreinamentoCard;
