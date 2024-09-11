import { BASE_URL } from "@/utils/consts";
import { CarouselItem } from "../ui/carousel";
import { Tag } from "@/utils/types";
import { useNavigate } from "react-router-dom";
import { Badge } from "../ui/badge";

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
    <CarouselItem className="basis-[90%] sm:basis-[100%] relative">
      <a href={link} className="text-xs hover:underline">
        <img
          src={`${BASE_URL}${capa}`}
          alt="Hero"
          className="w-full aspect-video object-cover object-center rounded-md"
        />
        <div className="absolute top-4 right-2 sm:right-10 sm:bottom-10 sm:top-auto text-white flex flex-col items-end sm:gap-4 gap-2 max-w-[400px]">
          <div className="flex gap-2 text-black text-xs">
            {tags.map((tag) => (
              <Badge
                key={tag.id}
                onClick={() => navigate(`busca?tag_id=${tag.id}`)}
                className="cursor-pointer text-white hover:bg-pmmBlue/30"
              >
                {tag.titulo}
              </Badge>
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
