import EditIcon from "@/components/icons/EditIcon";
import FourRectanglesIcon from "@/components/icons/FourRectanglesIcon";
import TrashIcon from "@/components/icons/TrashIcon";
import DataTableBase from "@/components/partials/datatable";
import { Button } from "@/components/ui/button";
import { useMeta } from "@/services/useMeta";
import { useGetTreinamentos } from "@/utils/queries";
import { GetTreinamentosTYPE } from "@/utils/types";
import { useNavigate } from "react-router-dom";

const Treinamentos = () => {
  const navigate = useNavigate();

  const { perPage, page, searchBy, debouncedSearch } = useMeta();

  const treinamentos = useGetTreinamentos({
    per_page: perPage,
    page,
    search: debouncedSearch,
    searchBy,
  });

  const columns = [
    // {
    //     name: <b>Valor Auxiliar</b>,
    //     selector: (row: any) => row.valor_auxiliar.descricao,
    //     sortable: true,
    // },
    {
      name: <>Titulo</>,
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
        {treinamentos.isError && (
          <div>
            Ocorreu um erro ao carregar <strong>treinamentos</strong>
          </div>
        )}
        <div className="px-4">
          <DataTableBase<GetTreinamentosTYPE>
            subHeader
            title={titleValorAuxiliar}
            columns={columns}
            data={treinamentos.isSuccess ? treinamentos.data.treinamentos : []}
            meta={treinamentos.isSuccess ? treinamentos.data.meta : null}
            progressPending={treinamentos.isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Treinamentos;
