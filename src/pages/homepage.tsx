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
          {destaques.data?.treinamentos.slice(0, 5).map((destaque) => (
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
        <CarouselPrevious className="hidden sm:block" />
        <CarouselNext className="hidden sm:block" />
      </Carousel>

      <div className="w-8 h-1 bg-green-600 rounded-full"></div>
      <div className="mt-4">
        <span className="uppercase text-pmmBlue/50 font-bold text-xs ">
          Acesso rápido
        </span>
        <div className="w-full flex justify-between">
          <h1 className="text-pmmBlue sm:text-4xl font-bold">
            Treinamentos recentes
          </h1>
          <a
            href="/busca"
            className="text-sm text-pmmBlue self-end hover:underline"
          >
            Visualizar todos &gt;
          </a>
        </div>
      </div>
      <Carousel className="mt-4">
        <CarouselContent>
          {treinamentos.data?.treinamentos.slice(0, 5).map((treinamento) => (
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
        <CarouselPrevious className="hidden sm:block" />
        <CarouselNext className="hidden sm:block" />
      </Carousel>

      {acessoRapido.data?.categorias.map((categoria) => (
        <>
          <div className="w-8 h-1 bg-green-600 rounded-full mt-24"></div>
          <div className="mt-4">
            <span className="uppercase text-pmmBlue/50 font-bold text-xs">
              Acesso rápido - por categoria
            </span>
            <div className="w-full flex justify-between">
              <h1 className="text-pmmBlue sm:text-4xl font-bold">
                {categoria.titulo}
              </h1>
              <a
                href={`/busca?categoria_id=${categoria.id}`}
                className="text-sm text-pmmBlue self-end hover:underline"
              >
                Visualizar todos &gt;
              </a>
            </div>
          </div>
          <Carousel className="mt-4">
            <CarouselContent>
              {categoria.treinamentos.slice(0, 5).map((treinamento) => (
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
            <CarouselPrevious className="hidden sm:block" />
            <CarouselNext className="hidden sm:block" />
          </Carousel>
        </>
      ))}
    </div>
  );
};

export default Homepage;
