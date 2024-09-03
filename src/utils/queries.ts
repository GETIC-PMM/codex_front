import { useQuery } from "react-query";
import { API_URL } from "./consts";
import axios from "axios";

export const useGetTreinamentos = () =>
  useQuery({
    queryKey: ["treinamentos"],
    queryFn: async () => {
      const { data } = await axios.get(API_URL + "/treinamentos");
      return data;
    },
    refetchOnWindowFocus: false,
  });

export const useGetCategorias = () =>
  useQuery({
    queryKey: ["categorias"],
    queryFn: async () => {
      const { data } = await axios.get(API_URL + "/categorias");
      return data;
    },
    refetchOnWindowFocus: false,
  });

export const useGetTags = () =>
  useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const { data } = await axios.get(API_URL + "/tags");
      return data;
    },
    refetchOnWindowFocus: false,
  });
