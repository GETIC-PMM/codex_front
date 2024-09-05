import { useQuery } from "react-query";
import { API_URL, API_URL_ADMIN } from "./consts";
import axios from "axios";
import { Meta } from "./types";

export const useGetTreinamentos = (props: Meta) =>
  useQuery({
    queryKey: ["treinamentos"],
    queryFn: async () => {
      const { data } = await axios.get(API_URL + "/treinamentos", {
        params: props,
      });
      return data;
    },
    refetchOnWindowFocus: false,
  });

export const useGetTreinamentosDestaque = () =>
  useQuery({
    queryKey: ["treinamentos_destaque"],
    queryFn: async () => {
      const { data } = await axios.get(API_URL + `/treinamentos/destaque_home`);
      return data;
    },
    refetchOnWindowFocus: false,
  });

export const useGetTreinamento = (id: string | undefined) =>
  useQuery({
    queryKey: ["treinamentos"],
    queryFn: async () => {
      const { data } = await axios.get(API_URL + `/treinamentos/${id}`);
      return data;
    },
    refetchOnWindowFocus: false,
    enabled: !!id,
  });

export const useGetCategorias = (props: Meta) =>
  useQuery({
    queryKey: ["categorias", props],
    queryFn: async () => {
      const { data } = await axios.get(API_URL + `/categorias`, {
        params: props,
      });
      return data;
    },
    refetchOnWindowFocus: false,
  });

export const useGetTags = (props: Meta) =>
  useQuery({
    queryKey: ["tags", props],
    queryFn: async () => {
      const { data } = await axios.get(API_URL + "/tags", {
        params: props,
      });
      return data;
    },
    refetchOnWindowFocus: false,
  });
