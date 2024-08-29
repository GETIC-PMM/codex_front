import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CodingHero from "@/assets/coding.svg";
import Ruby from "@/assets/ruby.svg";

const CarouselAcessoRapido = () => {
  return (
    <div>
      <div className="w-8 h-1 bg-green-600 rounded-full"></div>
      <div className="mt-4">
        <span className="uppercase text-pmmBlue font-bold text-xs ">
          Acesso rápido
        </span>
        <h1 className="text-pmmBlue text-4xl font-bold">
          Treinamentos recentes
        </h1>
      </div>
      <Carousel className="mt-11">
        <CarouselContent>
          <CarouselItem className="basis-1/3 text-pmmBlue">
            <img
              src={CodingHero}
              className="rounded-md object-cover w-full h-52 aspect-video"
              alt="Ruby"
            />
            <div className="flex justify-between text-xs font-semibold mt-3">
              <p className="text-green-700">Autor 01</p>
              <p className="text-pmmGray">27 Agosto 2024</p>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <h1 className="font-bold">Lorem lipsum dolor sit amet</h1>
              <span className="text-sm">
                Lorem lipsum dolor sit amet. Lorem lipsum dolor sit amet. Lorem
                lipsum dolor sit amet.{" "}
              </span>
              <a href="" className="text-xs hover:underline w-max">
                Visualizar artigo &gt;
              </a>
            </div>
          </CarouselItem>
          <CarouselItem className="basis-1/3 text-pmmBlue w-full">
            <img
              src={Ruby}
              className="rounded-md object-cover w-full h-52 aspect-video"
              alt="Ruby"
            />
            <div className="flex justify-between text-xs font-semibold mt-3">
              <p className="text-green-700">Autor 01</p>
              <p className="text-pmmGray">27 Agosto 2024</p>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <h1 className="font-bold">Lorem lipsum dolor sit amet</h1>
              <span className="text-sm">
                Lorem lipsum dolor sit amet. Lorem lipsum dolor sit amet. Lorem
                lipsum dolor sit amet.{" "}
              </span>
              <a href="" className="text-xs hover:underline w-max">
                Visualizar artigo &gt;
              </a>
            </div>
          </CarouselItem>
          <CarouselItem className="basis-1/3 text-pmmBlue">
            <img
              src={Ruby}
              className="rounded-md object-cover w-full h-52 aspect-video"
              alt="Ruby"
            />
            <div className="flex justify-between text-xs font-semibold mt-3">
              <p className="text-green-700">Autor 01</p>
              <p className="text-pmmGray">27 Agosto 2024</p>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <h1 className="font-bold">Lorem lipsum dolor sit amet</h1>
              <span className="text-sm">
                Lorem lipsum dolor sit amet. Lorem lipsum dolor sit amet. Lorem
                lipsum dolor sit amet.{" "}
              </span>
              <a href="" className="text-xs hover:underline w-max">
                Visualizar artigo &gt;
              </a>
            </div>
          </CarouselItem>
          <CarouselItem className="basis-1/3 text-pmmBlue w-full">
            <img
              src={Ruby}
              className="rounded-md object-cover w-full h-52 aspect-video"
              alt="Ruby"
            />
            <div className="flex justify-between text-xs font-semibold mt-3">
              <p className="text-green-700">Autor 01</p>
              <p className="text-pmmGray">27 Agosto 2024</p>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <h1 className="font-bold">Lorem lipsum dolor sit amet</h1>
              <span className="text-sm">
                Lorem lipsum dolor sit amet. Lorem lipsum dolor sit amet. Lorem
                lipsum dolor sit amet.{" "}
              </span>
              <a href="" className="text-xs hover:underline w-max">
                Visualizar artigo &gt;
              </a>
            </div>
          </CarouselItem>
          <CarouselItem className="basis-1/3 text-pmmBlue w-full">
            <img
              src={Ruby}
              className="rounded-md object-cover w-full h-52 aspect-video"
              alt="Ruby"
            />
            <div className="flex justify-between text-xs font-semibold mt-3">
              <p className="text-green-700">Autor 01</p>
              <p className="text-pmmGray">27 Agosto 2024</p>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <h1 className="font-bold">Lorem lipsum dolor sit amet</h1>
              <span className="text-sm">
                Lorem lipsum dolor sit amet. Lorem lipsum dolor sit amet. Lorem
                lipsum dolor sit amet.{" "}
              </span>
              <a href="" className="text-xs hover:underline w-max">
                Visualizar artigo &gt;
              </a>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CarouselAcessoRapido;
