import { useQuery } from "react-query";
import { API_URL } from "./consts";
import axios from "axios";
import { Meta } from "./types";

export const useGetTreinamentos = () =>
  useQuery({
    queryKey: ["treinamentos"],
    queryFn: async () => {
      const { data } = await axios.get(API_URL + "/treinamentos");
      return data;
    },
    refetchOnWindowFocus: false,
  });

export const useGetCategorias = ({ perPage, page, search, searchBy }: Meta) =>
  useQuery({
    queryKey: ["categorias", perPage, page, search, searchBy],
    queryFn: async () => {
      const { data } = await axios.get(API_URL + `/categorias`, {
        params: { perPage, page, search, searchBy },
      });
      return data;
    },
    refetchOnWindowFocus: false,
  });

export const useGetTags = ({ perPage, page, search, searchBy }: Meta) =>
  useQuery({
    queryKey: ["tags", perPage, page, search],
    queryFn: async () => {
      const { data } = await axios.get(API_URL + "/tags", {
        params: { perPage, page, search, searchBy },
      });
      return data;
    },
    refetchOnWindowFocus: false,
  });
