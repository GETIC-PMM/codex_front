import EditIcon from "@/components/icons/EditIcon";
import FourRectanglesIcon from "@/components/icons/FourRectanglesIcon";
import TrashIcon from "@/components/icons/TrashIcon";
import DataTableBase from "@/components/partials/datatable";
import DeleteModal from "@/components/partials/deleteModal";
import { Button } from "@/components/ui/button";
import { KeycloakContext } from "@/services/useAuth";
import { useMeta } from "@/services/useMeta";
import { API_URL_ADMIN } from "@/utils/consts";
import { useGetTreinamentos } from "@/utils/queries";
import { GetTreinamentosTYPE, ModalActions } from "@/utils/types";
import axios from "axios";
import { useContext, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

const Treinamentos = () => {
  const navigate = useNavigate();
  const { keycloak } = useContext(KeycloakContext);
  const token = keycloak?.token;
  const { perPage, page, searchBy, debouncedSearch } = useMeta();
  const [modal, setModal] = useState<ModalActions>("");
  const [idToDelete, setIdToDelete] = useState<string>("");

  const treinamentos = useGetTreinamentos({
    per_page: perPage,
    page,
    search: debouncedSearch,
    searchBy,
  });

  const columns = [
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
              setIdToDelete(row.id);
              setModal("delete");
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

  const deleteData = useMutation(
    async (id: string) => {
      const { data } = await axios.delete(
        `${API_URL_ADMIN}/treinamentos/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    },
    {
      onSuccess: () => {
        setModal("");
        treinamentos.refetch();
      },
    }
  );

  return (
    <div>
      <div>
        {treinamentos.isError && (
          <div>
            Ocorreu um erro ao carregar <strong>treinamentos</strong>
          </div>
        )}
        <DeleteModal
          open={modal}
          onSubmit={() => deleteData.mutate(idToDelete ?? "")}
          setOpen={setModal}
          isSuccess={deleteData.isSuccess}
          isError={deleteData.isError}
          isLoading={deleteData.isLoading}
        />
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
