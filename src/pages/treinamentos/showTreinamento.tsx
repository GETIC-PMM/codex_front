import {
  useGetTreinamento,
  useGetTreinamentosByCategoria,
} from "@/utils/queries";
import MDEditor from "@uiw/react-md-editor";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import TreinamentoRelacionado from "@/components/partials/treinamentoRelacionado";

const ShowTreinamento = () => {
  const { id } = useParams();
  const { data } = useGetTreinamento(id);
  const { data: treinamentosRelacionados } = useGetTreinamentosByCategoria(
    data?.treinamento.categoria.id
  );
  console.log({ data: data });
  return (
    <div>
      <div className="flex flex-col gap-2">
        <div className="w-8 h-1 bg-green-600 rounded-full"></div>
        <span className="uppercase text-pmmBlue text-xs font-bold">
          Treinamentos
        </span>

        <h1 className="text-4xl text-pmmBlue font-semibold">
          {data?.treinamento.titulo}
        </h1>
        <div className="text-xs text-zinc-600">
          {data?.treinamento.nome_do_autor} •{" "}
          {dayjs(data?.treinamento.createdAt).format("DD/MM/YYYY")} •{" "}
          {data?.treinamento.categoria.titulo} •{" "}
          {data?.treinamento.tags
            .map((tag: { titulo: string }) => tag.titulo)
            .join(", ")}
        </div>
      </div>
      <div className="flex mt-10 gap-10 max-w-[1200px]">
        <MDEditor.Markdown
          source={data?.treinamento.corpo}
          style={{
            flex: 3,
            whiteSpace: "pre-wrap",
            backgroundColor: "transparent",
            color: "black",
            maxWidth: "70%",
          }}
        />
        <div className="flex-[1]">
          <h1 className="font-bold text-lg text-pmmBlue">Relacionados:</h1>
          <div className="flex flex-col gap-10 mt-8">
            {treinamentosRelacionados?.treinamentos.map((treinamento) => {
              if (data?.treinamento.id !== treinamento.id)
                return (
                  <TreinamentoRelacionado
                    capa={treinamento.capa.url}
                    autor={treinamento.nome_do_autor}
                    data={treinamento.createdAt}
                    titulo={treinamento.titulo}
                    resumo={treinamento.resumo}
                    id={treinamento.id}
                    key={treinamento.id}
                  />
                );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowTreinamento;
