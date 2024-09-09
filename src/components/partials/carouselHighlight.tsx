import { BASE_URL } from "@/utils/consts";
import { CarouselItem } from "../ui/carousel";
import { GetTagsTYPE } from "@/utils/types";

const CarouselHighlight = ({
  tags,
  title,
  description,
  link,
  capa,
}: {
  tags: GetTagsTYPE[];
  title: string;
  description: string;
  link: string;
  capa: string;
}) => {
  return (
    <CarouselItem className="relative">
      <img
        src={`${BASE_URL}${capa}`}
        alt="Hero"
        className="w-full aspect-video object-cover object-center rounded-md"
      />
      <div className="absolute right-10 bottom-10 text-white flex flex-col items-end gap-4 max-w-[400px]">
        <div className="flex gap-2 text-black text-xs">
          {tags.map((tag) => (
            <div className="rounded-full py-1 px-8 bg-white hover:bg-zinc-300 cursor-pointer">
              {tag.titulo}
            </div>
          ))}
        </div>

        <div className="font-bold text-lg">{title}</div>

        <div className="text-sm text-end">{description}</div>

        <a href={link} className="text-xs hover:underline">
          Visualizar artigo &gt;
        </a>
      </div>
    </CarouselItem>
  );
};

export default CarouselHighlight;
