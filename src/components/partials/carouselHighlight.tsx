import { BASE_URL } from "@/utils/consts";
import { CarouselItem } from "../ui/carousel";
import { Tag } from "@/utils/types";
import { useNavigate } from "react-router-dom";

const CarouselHighlight = ({
  tags,
  title,
  description,
  link,
  capa,
}: {
  tags: Tag[];
  title: string;
  description: string;
  link: string;
  capa: string;
}) => {
  const navigate = useNavigate();
  return (
    <CarouselItem className="relative">
      <a href={link} className="text-xs hover:underline">
        <img
          src={`${BASE_URL}${capa}`}
          alt="Hero"
          className="w-full aspect-video object-cover object-center rounded-md"
        />
        <div className="absolute right-10 bottom-10 text-white flex flex-col items-end gap-4 max-w-[400px]">
          <div className="flex gap-2 text-black text-xs">
            {tags.map((tag) => (
              <button
                onClick={() => navigate(`busca?tag_id=${tag.id}`)}
                className="rounded-full py-1 px-8 bg-white hover:bg-zinc-300 cursor-pointer"
              >
                {tag.titulo}
              </button>
            ))}
          </div>
          <div className="font-bold text-lg">{title}</div>
          <div className="text-sm text-end">{description}</div>
          Visualizar artigo &gt;
        </div>
      </a>
    </CarouselItem>
  );
};

export default CarouselHighlight;
