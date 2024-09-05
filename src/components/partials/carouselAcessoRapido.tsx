import { CarouselItem } from "@/components/ui/carousel";
import { BASE_URL } from "@/utils/consts";

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
  return (
    <CarouselItem className="basis-1/3 text-pmmBlue">
      <img
        src={`${BASE_URL}${capa}`}
        className="rounded-md object-cover w-full h-52 aspect-video"
        alt="Ruby"
      />
      <div className="flex justify-between text-xs font-semibold mt-3">
        <p className="text-green-700">{autor}</p>
        <p className="text-pmmGray">{data}</p>
      </div>
      <div className="flex flex-col gap-2 mt-4">
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
