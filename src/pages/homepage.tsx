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
  useGetTreinamentosAcessoRapido,
  useGetTreinamentosDestaque,
} from "@/utils/queries";
import { KeycloakContext } from "@/services/useAuth";
import { TreinamentosType } from "@/utils/types";

const Homepage = () => {
  const { keycloak } = useContext(KeycloakContext);
  const token = keycloak?.token;
  const treinamentos = useGetTreinamentos({
    per_page: "all",
  });

  const destaques = useGetTreinamentosDestaque();
  const acessoRapido = useGetTreinamentosAcessoRapido();

  console.log({ token });

  return (
    <div>
      <Carousel className="my-10">
        <CarouselContent>
          {destaques.data?.treinamentos.map((destaque: TreinamentosType) => (
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
          {treinamentos.data?.treinamentos
            .slice(0, 5)
            .map((treinamento: TreinamentosType) => (
              <CarouselAcessoRapido
                key={treinamento.id}
                capa={treinamento.capa.url}
                autor={treinamento.nome_do_autor}
                data={treinamento.data_publicacao}
                titulo={treinamento.titulo}
                resumo={treinamento.resumo}
                id={treinamento.id}
              />
            ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {acessoRapido.data?.categorias.map((categoria) => (
        <>
          <div className="w-8 h-1 bg-green-600 rounded-full mt-24"></div>
          <div className="mt-4">
            <span className="uppercase text-pmmBlue font-bold text-xs ">
              Acesso rápido - por categoria
            </span>
            <h1 className="text-pmmBlue text-4xl font-bold">
              {categoria.titulo}
            </h1>
          </div>
          <Carousel className="mt-11">
            <CarouselContent>
              {categoria.treinamentos
                .slice(0, 5)
                .map((treinamento: TreinamentosType) => (
                  <CarouselAcessoRapido
                    key={treinamento.id}
                    capa={treinamento.capa.url}
                    autor={treinamento.nome_do_autor}
                    data={treinamento.data_publicacao}
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
      ))}
    </div>
  );
};

export default Homepage;
