import { BASE_URL } from "@/utils/consts";
import dayjs from "dayjs";

const TreinamentoRelacionado = ({
  capa,
  autor,
  data,
  titulo,
  resumo,
  id,
}: {
  capa: string;
  autor: string;
  data: string;
  titulo: string;
  resumo: string;
  id: string;
}) => {
  return (
    <div>
      <img
        src={`${BASE_URL}${capa}`}
        className="rounded-md object-cover w-full h-52 aspect-video"
        alt="Capa do treinamento"
      />
      <div className="flex flex-col gap-2 text-pmmBlue">
        <div className="flex justify-between text-xs font-bold">
          <span className="text-green-700">{autor}</span>
          <span className="text-zinc-700">
            {dayjs(data).format("DD/MM/YYYY")}
          </span>
        </div>
        <span className="font-bold text-2xl ">{titulo}</span>
        <span className="text-sm">{resumo}</span>
        <a href={`/treinamento/${id}`} className="text-xs hover:underline">
          Visualizar artigo &gt;
        </a>
      </div>
    </div>
  );
};

export default TreinamentoRelacionado;
