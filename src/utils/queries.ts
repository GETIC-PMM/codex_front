import { useQuery } from "react-query";
import { API_URL } from "./consts";
import axios from "axios";
import {
  Categoria,
  CategoriaWithTreinamentos,
  Meta,
  Response,
  ResponseData,
  Tag,
  Treinamento,
} from "./types";

export const useGetTreinamentos = ({
  dependent = true,
  ...props
}: Meta & { categoria_id?: string; tag_id?: string; dependent?: boolean }) =>
  useQuery({
    queryKey: [
      "treinamentos",
      dependent && props,
      "search" in props && props.search,
    ],
    queryFn: async () => {
      const { data } = await axios.get<Response<"treinamentos", Treinamento[]>>(
        API_URL + "/treinamentos",
        {
          params: props,
        }
      );
      return data;
    },
  });

export const useGetTreinamentosDestaque = () =>
  useQuery({
    queryKey: ["treinamentos_destaque"],
    queryFn: async () => {
      const { data } = await axios.get<Response<"treinamentos", Treinamento[]>>(
        API_URL + `/treinamentos/destaque_home`
      );
      return data;
    },
    refetchOnWindowFocus: false,
  });

export const useGetTreinamentosByCategoria = (
  categoriaId: string | undefined
) =>
  useQuery({
    queryKey: ["treinamentos_categoria", categoriaId],
    queryFn: async () => {
      const { data } = await axios.get<Response<"treinamentos", Treinamento[]>>(
        API_URL + `/treinamentos`,
        {
          params: {
            categoria_id: categoriaId,
          },
        }
      );
      return data;
    },
    refetchOnWindowFocus: false,
    enabled: !!categoriaId,
  });

export const useGetTreinamentosAcessoRapido = () =>
  useQuery({
    queryKey: ["treinamentos_acesso_rapido"],
    queryFn: async () => {
      const { data } = await axios.get<
        Response<"categorias", CategoriaWithTreinamentos[]>
      >(API_URL + `/categorias/destaque_home`);
      return data;
    },
    refetchOnWindowFocus: false,
  });

export const useGetTreinamento = (id: string | undefined) =>
  useQuery({
    queryKey: ["treinamentos"],
    queryFn: async () => {
      const { data } = await axios.get<
        ResponseData<"treinamento", Treinamento>
      >(API_URL + `/treinamentos/${id}`);
      return data;
    },
    refetchOnWindowFocus: false,
    enabled: !!id,
  });

export const useGetCategorias = (props: Meta) =>
  useQuery({
    queryKey: ["categorias", props],
    queryFn: async () => {
      const { data } = await axios.get<Response<"categorias", Categoria[]>>(
        API_URL + `/categorias`,
        {
          params: props,
        }
      );
      return data;
    },
    refetchOnWindowFocus: false,
  });

export const useGetTreinamentoById = (id: string | undefined) =>
  useQuery({
    queryKey: ["treinamento", id],
    queryFn: async () => {
      const { data } = await axios.get(API_URL + `/treinamentos/${id}`);
      return data;
    },
    refetchOnWindowFocus: false,
    enabled: !!id,
  });

export const useGetTags = (props: Meta) =>
  useQuery({
    queryKey: ["tags", props],
    queryFn: async () => {
      const { data } = await axios.get<Response<"tags", Tag[]>>(
        API_URL + "/tags",
        {
          params: props,
        }
      );
      return data;
    },
    refetchOnWindowFocus: false,
  });
