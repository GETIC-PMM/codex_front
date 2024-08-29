import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CodingHero from "@/assets/coding.svg";
import CarouselHighlight from "@/components/partials/carouselHighlight";
import CarouselAcessoRapido from "@/components/partials/carouselAcessoRapido";

const Homepage = () => {
  return (
    <div>
      <Carousel className="my-10">
        <CarouselContent>
          <CarouselHighlight
            image={CodingHero}
            tags={["Front-end", "React"]}
            title="Como inicializar um projeto em react"
            description="Lorem lipsum dolor ist amet amet lostem lispum. Lorem lipsum dolor ist amet amet lostem lispum. Lorem lipsum dolor ist amet amet lostem lispum."
            link=""
          />
          <CarouselHighlight
            image={CodingHero}
            tags={["Front-end", "React"]}
            title="Como inicializar um projeto em react"
            description="Lorem lipsum dolor ist amet amet lostem lispum. Lorem lipsum dolor ist amet amet lostem lispum. Lorem lipsum dolor ist amet amet lostem lispum."
            link=""
          />
          <CarouselHighlight
            image={CodingHero}
            tags={["Front-end", "React"]}
            title="Como inicializar um projeto em react"
            description="Lorem lipsum dolor ist amet amet lostem lispum. Lorem lipsum dolor ist amet amet lostem lispum. Lorem lipsum dolor ist amet amet lostem lispum."
            link=""
          />
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="flex flex-col gap-10">
        <CarouselAcessoRapido />
        <CarouselAcessoRapido />
        <CarouselAcessoRapido />
        <CarouselAcessoRapido />
      </div>
    </div>
  );
};

export default Homepage;
