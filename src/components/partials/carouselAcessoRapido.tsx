import { CarouselItem } from "@/components/ui/carousel";
import { BASE_URL } from "@/utils/consts";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const CarouselAcessoRapido = ({
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
  const navigate = useNavigate();
  return (
    <CarouselItem className="basis-1/3 text-pmmBlue">
      <img
        src={`${BASE_URL}${capa}`}
        className="rounded-md cursor-pointer object-cover w-full h-52 aspect-video"
        alt="Ruby"
        onClick={() => {
          navigate(`/treinamento/${id}`);
        }}
      />
      <div className="flex justify-between text-xs font-semibold mt-2">
        <p className="text-green-700">{autor}</p>
        <p className="text-pmmGray">{dayjs(data).format("DD/MM/YYYY")}</p>
      </div>
      <div className="flex flex-col gap-1 ">
        <h1 className="font-bold">{titulo}</h1>
        <span className="text-sm">{resumo}</span>
        <a
          href={`/treinamento/${id}`}
          className="text-xs hover:underline w-max"
        >
          Visualizar artigo &gt;
        </a>
      </div>
    </CarouselItem>
  );
};

export default CarouselAcessoRapido;
