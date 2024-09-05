import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CarouselHighlight from "@/components/partials/carouselHighlight";
import CarouselAcessoRapido from "@/components/partials/carouselAcessoRapido";
import { useContext } from "react";
import {
  useGetTreinamentos,
  useGetTreinamentosDestaque,
} from "@/utils/queries";
import { KeycloakContext } from "@/services/useAuth";
import { GetTreinamentosTYPE } from "@/utils/types";

const Homepage = () => {
  const { keycloak } = useContext(KeycloakContext);
  const token = keycloak?.token;
  const treinamentos = useGetTreinamentos({
    per_page: "all",
  });

  const destaques = useGetTreinamentosDestaque();

  console.log({ token });

  return (
    <div>
      <Carousel className="my-10">
        <CarouselContent>
          {destaques.data?.treinamentos.map((destaque: GetTreinamentosTYPE) => (
            <CarouselHighlight
              key={destaque.id}
              tags={destaque.tags}
              title={destaque.titulo}
              description={destaque.resumo}
              link={`/treinamento/${destaque.id}`}
              capa={destaque.capa.url}
            />
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <>
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
            {treinamentos.data?.treinamentos.slice(0, 5).map((treinamento) => (
              <CarouselAcessoRapido
                key={treinamento.id}
                capa={treinamento.capa.url}
                autor={treinamento.autor}
                data={treinamento.data}
                titulo={treinamento.titulo}
                resumo={treinamento.resumo}
                id={treinamento.id}
              />
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </>
    </div>
  );
};

export default Homepage;
