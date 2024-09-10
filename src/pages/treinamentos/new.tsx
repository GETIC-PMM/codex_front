import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useGetCategorias,
  useGetTags,
  useGetTreinamentoById,
} from "@/utils/queries";
import {
  GetCategoriasTYPE,
  GetTagsTYPE,
  GetTreinamentosTYPE,
  ModalActions,
} from "@/utils/types";
import PickList, { LabelValue } from "@/components/partials/pickList";
import { useContext, useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { KeycloakContext } from "@/services/useAuth";
import { useMutation } from "react-query";
import axios from "axios";
import { API_URL_ADMIN } from "@/utils/consts";
import { useNavigate, useParams } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import DefaultModal from "@/components/partials/defaultModal";
import DocumentInput from "@/components/ui/documentInput";

const formSchema = z.object({
  titulo: z.string(),
  resumo: z.string(),
  categoria_id: z.string(),
  tag_ids: z.array(z.string()),
  destaque_home: z.boolean(),
  autor_id: z.string(),
  data_publicacao: z.string(),
  capa: z.string(),
  thumbnail: z.string(),
  corpo: z.string(),
  nome_do_autor: z.string(),
});

const formSchemaIdTitulo = z.object({
  id: z.string().optional(),
  titulo: z.string(),
});

const NovoTreinamento = () => {
  const categorias = useGetCategorias({
    per_page: "all",
  });
  const tags = useGetTags({
    per_page: "all",
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destaque_home: false,
      capa: "",
      thumbnail: "",
    },
  });
  const formCategoria = useForm<z.infer<typeof formSchemaIdTitulo>>({
    resolver: zodResolver(formSchemaIdTitulo),
  });
  const formTag = useForm<z.infer<typeof formSchemaIdTitulo>>({
    resolver: zodResolver(formSchemaIdTitulo),
  });
  const [optionsTags, setOptionsTags] = useState<LabelValue[]>([]);
  const [selectedTags, setSelectedTags] = useState<LabelValue[]>([]);
  const [modalCategoria, setModalCategoria] = useState<ModalActions>("");
  const [modalTag, setModalTag] = useState<ModalActions>("");
  const { keycloak } = useContext(KeycloakContext);
  const userId = keycloak?.idTokenParsed?.sub;
  const token = keycloak?.token;
  const userName = keycloak?.idTokenParsed?.name;
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: categoriaExistente } = useGetTreinamentoById(id);

  const create = useMutation(
    async (data: Omit<GetTreinamentosTYPE, "id">) => {
      await axios.post(`${API_URL_ADMIN}/treinamentos`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    {
      onSuccess: () => {
        // setModal("");
        // categorias.refetch();
        navigate("/painel/treinamentos");
      },
    }
  );

  const edit = useMutation(
    async (data: Omit<GetTreinamentosTYPE, "id">) => {
      await axios.put(`${API_URL_ADMIN}/treinamentos/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    {
      onSuccess: () => {
        // setModal("");
        // categorias.refetch();
        navigate("/painel/treinamentos");
      },
    }
  );

  const createCategoria = useMutation(
    async (data: Omit<GetCategoriasTYPE, "id">) => {
      await axios.post(`${API_URL_ADMIN}/categorias`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    {
      onSuccess: () => {
        toast.success("Categoria criada com sucesso");
        setModalCategoria("");
        categorias.refetch();
      },
      onError: () => {
        toast.error("Erro ao criar categoria");
      },
    }
  );

  const createTag = useMutation(
    async (data: Omit<GetTagsTYPE, "id">) => {
      await axios.post(`${API_URL_ADMIN}/tags`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    {
      onSuccess: () => {
        toast.success("Tag criada com sucesso");
        setModalTag("");
        tags.refetch();
      },
      onError: () => {
        toast.error("Erro ao criar tag");
      },
    }
  );

  const onSubmit = () => {
    if (id) {
      edit.mutate(form.getValues());
      return;
    }

    create.mutate(form.getValues());
  };

  useEffect(() => {
    form.setValue("autor_id", userId as string);
    form.setValue("data_publicacao", new Date().toISOString());
    form.setValue("nome_do_autor", userName as string);
  }, [userId]);

  useEffect(() => {
    if (selectedTags.length > 0) {
      form.setValue(
        "tag_ids",
        selectedTags.map((tag) => tag.value)
      );
    }
  }, [selectedTags]);

  useEffect(() => {
    if (tags.data?.tags) {
      setOptionsTags(
        tags.data?.tags.map((tag: any) => ({
          label: tag.titulo,
          value: tag.id,
        }))
      );
    }
  }, [tags.data?.tags]);

  useEffect(() => {
    if (categoriaExistente?.treinamento.categoria) {
      form.setValue(
        "categoria_id",
        categoriaExistente.treinamento.categoria.id
      );
      form.setValue("autor_id", categoriaExistente.treinamento.autor_id);
      form.setValue("titulo", categoriaExistente.treinamento.titulo);
      form.setValue("resumo", categoriaExistente.treinamento.resumo);
      form.setValue("corpo", categoriaExistente.treinamento.corpo);
      form.setValue(
        "destaque_home",
        categoriaExistente.treinamento.destaque_home
      );
      setSelectedTags(
        categoriaExistente.treinamento.tags.map((tag: any) => ({
          label: tag.titulo,
          value: tag.id,
        }))
      );
      // set options tags without selected tags
      setOptionsTags(
        tags.data?.tags
          .filter(
            (tag: any) =>
              !categoriaExistente.treinamento.tags.some(
                (tagSelected: any) => tagSelected.id === tag.id
              )
          )
          .map((tag: any) => ({
            label: tag.titulo,
            value: tag.id,
          }))
      );
    }
  }, [id, categoriaExistente]);

  return (
    <div>
      {/* MODAL NOVA CATEGORIA */}
      <DefaultModal
        form={formCategoria}
        onSubmit={() => createCategoria.mutate(formCategoria.getValues())}
        open={modalCategoria}
        setOpen={setModalCategoria}
        title="Nova categoria"
      >
        <FormField
          control={formCategoria.control}
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

      {/* MODAL NOVA TAG */}
      <DefaultModal
        form={formTag}
        onSubmit={() => createTag.mutate(formTag.getValues())}
        open={modalTag}
        setOpen={setModalTag}
        title="Nova tag"
      >
        <FormField
          control={formTag.control}
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

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 mt-10"
        >
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="titulo"
              render={({ field }) => (
                <FormItem className="w-full flex flex-[5] flex-col justify-between rounded-lg border p-4">
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="destaque_home"
              render={({ field }) => (
                <FormItem className="flex flex-[1] flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Destaque?</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="resumo"
            render={({ field }) => (
              <FormItem className="flex flex-col justify-between rounded-lg border p-4">
                <FormLabel>Resumo</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoria_id"
            render={({ field }) => (
              <FormItem className="flex flex-col justify-between rounded-lg border p-4 w-full">
                <FormLabel>Categoria</FormLabel>
                <div className="flex gap-4">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categorias.data?.categorias.map(
                        (categoria: GetCategoriasTYPE) => (
                          <SelectItem key={categoria.id} value={categoria.id}>
                            {categoria.titulo}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>

                  <Button
                    onClick={() => setModalCategoria("create")}
                    type="button"
                  >
                    Criar nova
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="capa"
            render={({ field }) => (
              <FormItem className="w-full flex flex-[5] flex-col justify-between rounded-lg border p-4">
                <FormLabel>Capa</FormLabel>
                <FormControl>
                  <DocumentInput
                    labelHtmlFor={field.name}
                    file={field.value}
                    onFileChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="thumbnail"
            render={({ field }) => (
              <FormItem className="w-full flex flex-[5] flex-col justify-between rounded-lg border p-4">
                <FormLabel>Thumbnail</FormLabel>
                <FormControl>
                  <DocumentInput
                    labelHtmlFor={field.name}
                    file={field.value}
                    onFileChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col justify-between rounded-lg border p-4 w-full gap-4">
            <div className="w-full flex justify-between">
              <FormLabel>Tags</FormLabel>
              <Button onClick={() => setModalTag("create")} type="button">
                Criar nova
              </Button>
            </div>
            <PickList
              options={optionsTags}
              picked={selectedTags}
              setPicked={setSelectedTags}
              setOptions={setOptionsTags}
            />
          </div>

          <FormField
            control={form.control}
            name="corpo"
            render={({ field }) => (
              <FormItem className="flex flex-col justify-between rounded-lg border p-4 w-full">
                <div className="w-full flex justify-between">
                  <FormLabel>Corpo</FormLabel>
                  <a
                    target="_blank"
                    href="https://www.markdownguide.org/cheat-sheet/"
                    className="text-pmmBlue hover:underline"
                  >
                    Markdown Cheat Sheet
                  </a>
                </div>
                <MDEditor
                  value={field.value}
                  onChange={field.onChange}
                  className="min-h-[500px] "
                  data-color-mode="light"
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Salvar</Button>
        </form>
      </Form>
    </div>
  );
};

export default NovoTreinamento;
