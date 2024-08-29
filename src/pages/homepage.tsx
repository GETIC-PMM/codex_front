import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CodingHero from "@/assets/coding.svg";

const Homepage = () => {
  return (
    <div>
      <Carousel className="my-10">
        <CarouselContent>
          <CarouselItem className="relative">
            <img src={CodingHero} alt="Hero" className="w-full" />
            <div className="absolute right-10 bottom-10 text-white flex flex-col items-end gap-4 max-w-[400px]">
              <div className="flex gap-8 text-black text-xs">
                <div className="rounded-full py-1 px-8 bg-white ">
                  Front-end
                </div>
                <div className="rounded-full py-1 px-8 bg-white ">React</div>
              </div>

              <div className="font-bold text-lg">
                Como inicializar um projeto em react
              </div>

              <div className="text-sm text-end">
                Lorem lipsum dolor ist amet amet lostem lispum. Lorem lipsum
                dolor ist amet amet lostem lispum. Lorem lipsum dolor ist amet
                amet lostem lispum.{" "}
              </div>

              <a href="" className="text-xs">
                Visualizar artigo &gt;
              </a>
            </div>
          </CarouselItem>

          <CarouselItem className="relative">
            <img src={CodingHero} alt="Hero" className="w-full" />
            <div className="absolute right-10 bottom-10 text-white flex flex-col items-end gap-4 max-w-[400px]">
              <div className="flex gap-8 text-black text-xs">
                <div className="rounded-full py-1 px-8 bg-white ">
                  Front-end
                </div>
                <div className="rounded-full py-1 px-8 bg-white ">React</div>
              </div>

              <div className="font-bold text-lg">
                Como inicializar um projeto em react
              </div>

              <div className="text-sm text-end">
                Lorem lipsum dolor ist amet amet lostem lispum. Lorem lipsum
                dolor ist amet amet lostem lispum. Lorem lipsum dolor ist amet
                amet lostem lispum.{" "}
              </div>

              <a href="" className="text-xs">
                Visualizar artigo &gt;
              </a>
            </div>
          </CarouselItem>

          <CarouselItem className="relative">
            <img src={CodingHero} alt="Hero" className="w-full" />
            <div className="absolute right-10 bottom-10 text-white flex flex-col items-end gap-4 max-w-[400px]">
              <div className="flex gap-8 text-black text-xs">
                <div className="rounded-full py-1 px-8 bg-white ">
                  Front-end
                </div>
                <div className="rounded-full py-1 px-8 bg-white ">React</div>
              </div>

              <div className="font-bold text-lg">
                Como inicializar um projeto em react
              </div>

              <div className="text-sm text-end">
                Lorem lipsum dolor ist amet amet lostem lispum. Lorem lipsum
                dolor ist amet amet lostem lispum. Lorem lipsum dolor ist amet
                amet lostem lispum.{" "}
              </div>

              <a href="" className="text-xs">
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

export default Homepage;
