import EditIcon from "@/components/icons/EditIcon";
import FourRectanglesIcon from "@/components/icons/FourRectanglesIcon";
import TrashIcon from "@/components/icons/TrashIcon";
import DataTableBase from "@/components/partials/datatable";
import DefaultModal from "@/components/partials/defaultModal";
import { Button } from "@/components/ui/button";
import { API_URL_ADMIN } from "@/utils/consts";
import { useGetCategorias } from "@/utils/queries";
import { Categoria, ModalActions } from "@/utils/types";
import { useMutation } from "react-query";
import axios from "axios";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import DeleteModal from "@/components/partials/deleteModal";
import { useMeta } from "@/services/useMeta";

const formSchema = z.object({
  id: z.string().optional(),
  titulo: z.string(),
});

const Categorias = () => {
  const [modal, setModal] = useState<ModalActions>("");
  const token = localStorage.getItem("token");

  const { perPage, page, debouncedSearch } = useMeta();

  const categorias = useGetCategorias({
    per_page: perPage,
    page,
    search: debouncedSearch,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const columns = [
    {
      name: <>Titulo</>,
      selector: (row: Categoria) => row.titulo ?? "-",
      sortable: true,
    },

    {
      cell: (row: Categoria) => (
        <div className="flex flex-row justify-center items-center p-2 gap-2">
          <Button
            variant="alert"
            size="sm"
            onClick={() => {
              form.setValue("id", row.id);
              form.setValue("titulo", row.titulo);
              setModal("edit");
            }}
          >
            <EditIcon />
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => {
              form.setValue("id", row.id);
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

  const title = (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <FourRectanglesIcon />
        <b className="text-pmmBlue">Categorias</b>
      </div>
      <Button
        size="sm"
        onClick={() => {
          form.reset();
          setModal("create");
        }}
      >
        + Adicionar
      </Button>
    </div>
  );

  const create = useMutation(
    async (data: Omit<Categoria, "id">) => {
      await axios.post(`${API_URL_ADMIN}/categorias`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    {
      onSuccess: () => {
        setModal("");
        categorias.refetch();
      },
    }
  );

  const edit = useMutation(
    async (data: Categoria) => {
      await axios.put(`${API_URL_ADMIN}/categorias/${data.id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    {
      onSuccess: () => {
        setModal("");
        categorias.refetch();
      },
    }
  );

  const deleteData = useMutation(
    async (id: string) => {
      const { data } = await axios.delete(`${API_URL_ADMIN}/categorias/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    {
      onSuccess: () => {
        setModal("");
        categorias.refetch();
      },
    }
  );

  const onSubmit = () => {
    if (modal === "create") create.mutate(form.getValues());
    else edit.mutate({ ...form.getValues(), id: form.getValues().id ?? "" });
  };

  return (
    <div>
      <DeleteModal
        open={modal}
        onSubmit={() => deleteData.mutate(form.getValues().id ?? "")}
        setOpen={setModal}
        isSuccess={deleteData.isSuccess}
        isError={deleteData.isError}
        isLoading={deleteData.isLoading}
      />

      <DefaultModal
        onSubmit={onSubmit}
        form={form}
        open={modal}
        setOpen={setModal}
        title={`${modal === "create" ? "Adicionar nova" : "Editar"} categoria`}
        isCreateSuccess={create.isSuccess}
        isEditSuccess={edit.isSuccess}
        isError={create.isError || edit.isError}
        isLoading={create.isLoading || edit.isLoading}
      >
        <FormField
          control={form.control}
          name="titulo"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-between rounded-lg border p-4 mt-6">
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </DefaultModal>
      {categorias.isError && (
        <div>
          Ocorreu um erro ao carregar <strong>categorias</strong>
        </div>
      )}
      <div className="px-4">
        <DataTableBase<Categoria>
          subHeader
          title={title}
          columns={columns}
          data={categorias.isSuccess ? categorias.data.categorias : []}
          meta={categorias.isSuccess ? { meta: categorias.data.meta } : null}
          progressPending={categorias.isFetching}
        />
      </div>
    </div>
  );
};

export default Categorias;
