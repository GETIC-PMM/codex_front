import { CarouselItem } from "../ui/carousel";

const CarouselHighlight = ({
  tags,
  title,
  description,
  link,
  image,
}: {
  tags: string[];
  title: string;
  description: string;
  link: string;
  image: string;
}) => {
  return (
    <CarouselItem className="relative">
      <img src={image} alt="Hero" className="w-full" />
      <div className="absolute right-10 bottom-10 text-white flex flex-col items-end gap-4 max-w-[400px]">
        <div className="flex gap-2 text-black text-xs">
          {tags.map((tag) => (
            <div className="rounded-full py-1 px-8 bg-white hover:bg-zinc-300 cursor-pointer">
              {tag}
            </div>
          ))}
        </div>

        <div className="font-bold text-lg">{title}</div>

        <div className="text-sm text-end">{description}</div>

        <a href={link} className="text-xs">
          Visualizar artigo &gt;
        </a>
      </div>
    </CarouselItem>
  );
};

export default CarouselHighlight;
