import EditIcon from "@/components/icons/EditIcon";
import FourRectanglesIcon from "@/components/icons/FourRectanglesIcon";
import TrashIcon from "@/components/icons/TrashIcon";
import DataTableBase from "@/components/partials/datatable";
import { Button } from "@/components/ui/button";
import { useGetTreinamentos } from "@/utils/queries";
import { GetTreinamentosTYPE } from "@/utils/types";
import { useNavigate } from "react-router-dom";

const Treinamentos = () => {
  const treinamentos = useGetTreinamentos();
  const navigate = useNavigate();

  const columns = [
    // {
    //     name: <b>Valor Auxiliar</b>,
    //     selector: (row: any) => row.valor_auxiliar.descricao,
    //     sortable: true,
    // },
    {
      name: <b>AAAA</b>,
      selector: (row: GetTreinamentosTYPE) => row.titulo ?? "-",
      sortable: true,
    },

    {
      cell: (row: GetTreinamentosTYPE) => (
        <div className="flex flex-row justify-center items-center p-2 gap-2">
          <Button variant="alert" size="sm" onClick={() => {}}>
            <EditIcon />
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => {
              if (row) {
                console.log(row);
              }
            }}
          >
            <TrashIcon />
          </Button>
        </div>
      ),
      right: true,
    },
  ];

  const titleValorAuxiliar = (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <FourRectanglesIcon />
        <b className="text-pmmBlue">Treinamentos</b>
      </div>
      <Button
        size="sm"
        onClick={() => {
          navigate("/painel/treinamentos/novo");
        }}
      >
        + Adicionar
      </Button>
    </div>
  );

  return (
    <div>
      <div>
        {treinamentos.isLoading && <div>Carregando...</div>}
        {treinamentos.isError && (
          <div>
            Ocorreu um erro ao carregar <strong>treinamentos</strong>
          </div>
        )}
        {treinamentos.isSuccess && (
          <div className="px-4">
            {treinamentos.isFetching ? (
              <div className="w-full flex mt-6 items-center justify-center overflow-hidden">
                Carregando...
              </div>
            ) : (
              <DataTableBase<GetTreinamentosTYPE>
                subHeader
                title={titleValorAuxiliar}
                columns={columns}
                data={treinamentos.data.treinamentos ?? []}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Treinamentos;
