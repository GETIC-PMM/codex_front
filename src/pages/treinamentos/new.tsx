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
import { useGetCategorias, useGetTags } from "@/utils/queries";
import { GetCategoriasTYPE, GetTreinamentosTYPE } from "@/utils/types";
import PickList, { LabelValue } from "@/components/partials/pickList";
import { useContext, useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { KeycloakContext } from "@/services/useAuth";
import { useMutation } from "react-query";
import axios from "axios";
import { API_URL_ADMIN } from "@/utils/consts";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  titulo: z.string(),
  resumo: z.string(),
  categoria_id: z.string(),
  tag_ids: z.array(z.string()),
  destaque_home: z.boolean(),
  autor_id: z.string(),
  data_publicacao: z.string(),
  capa: z.string(),
  corpo: z.string(),
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
      capa: "data:image/png;base64,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",
    },
  });
  const [optionsTags, setOptionsTags] = useState<LabelValue[]>([]);
  const [selectedTags, setSelectedTags] = useState<LabelValue[]>([]);
  const { keycloak } = useContext(KeycloakContext);
  const userId = keycloak?.idTokenParsed?.sub;
  const token = keycloak?.token;
  const navigate = useNavigate();

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

  const onSubmit = () => {
    create.mutate(form.getValues());
  };

  useEffect(() => {
    form.setValue("autor_id", userId as string);
    form.setValue("data_publicacao", new Date().toISOString());
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
  }, [categorias.data?.categorias]);

  console.log({ erros: form.formState.errors });

  return (
    <div>
      {/* <h1>Criar treinamento</h1> */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 mt-10"
        >
          <FormField
            control={form.control}
            name="titulo"
            render={({ field }) => (
              <FormItem className="flex flex-col justify-between rounded-lg border p-4">
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

                  <Button type="button">Criar nova</Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col justify-between rounded-lg border p-4 w-full gap-4">
            <div className="w-full flex justify-between">
              <FormLabel>Tags</FormLabel>
              <Button type="button">Criar nova</Button>
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
