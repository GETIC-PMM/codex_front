import EditIcon from "@/components/icons/EditIcon";
import FourRectanglesIcon from "@/components/icons/FourRectanglesIcon";
import TrashIcon from "@/components/icons/TrashIcon";
import DataTableBase from "@/components/partials/datatable";
import DefaultModal from "@/components/partials/defaultModal";
import DeleteModal from "@/components/partials/deleteModal";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMeta } from "@/services/useMeta";
import { API_URL_ADMIN } from "@/utils/consts";
import { useGetTags } from "@/utils/queries";
import { Tag, ModalActions } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { z } from "zod";

const formSchema = z.object({
  id: z.string().optional(),
  titulo: z.string(),
});

const Tags = () => {
  const [modal, setModal] = useState<ModalActions>("");
  const token = localStorage.getItem("token");

  const { perPage, page, searchBy, debouncedSearch } = useMeta();

  const tags = useGetTags({
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
      selector: (row: Tag) => row.titulo ?? "-",
      sortable: true,
    },

    {
      cell: (row: Tag) => (
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
        <b className="text-pmmBlue">Tags</b>
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
    async (data: Omit<Tag, "id">) => {
      await axios.post(`${API_URL_ADMIN}/tags`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    {
      onSuccess: () => {
        setModal("");
        tags.refetch();
      },
    }
  );

  const edit = useMutation(
    async (data: Tag) => {
      await axios.put(`${API_URL_ADMIN}/tags/${data.id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    {
      onSuccess: () => {
        setModal("");
        tags.refetch();
      },
    }
  );

  const deleteData = useMutation(
    async (id: string) => {
      const { data } = await axios.delete(`${API_URL_ADMIN}/tags/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    {
      onSuccess: () => {
        setModal("");
        tags.refetch();
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
        title={`${modal === "create" ? "Adicionar nova" : "Editar"} tags`}
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
      </DefaultModal>{" "}
      {tags.isError && (
        <div>
          Ocorreu um erro ao carregar <strong>tags</strong>
        </div>
      )}
      <div className="px-4">
        <DataTableBase<Tag>
          subHeader
          title={title}
          columns={columns}
          data={tags.isSuccess ? tags.data.tags : []}
          meta={tags.isSuccess ? { meta: tags.data.meta } : null}
          progressPending={tags.isLoading}
        />
      </div>
    </div>
  );
};

export default Tags;
