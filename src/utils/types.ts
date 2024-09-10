import { TableStyles } from "react-data-table-component";

export type ModalActions = "" | "create" | "edit" | "delete";

export type TreinamentoBase = {
  titulo: string;
  resumo: string;
  autor_id: string;
  nome_do_autor: string;
  data_publicacao: string;
  corpo: string;
};

export type TreinamentoPost = {
  tag_ids?: string[];
  categoria_id?: string;
  capa: string;
} & TreinamentoBase;

export type Treinamento = {
  id: string;
  tags: Tag[];
  categoria: Categoria;
  capa: ImageUrl;
  thumbnail: ImageUrl;
  created_at: string;
  updated_at: string;
} & TreinamentoBase;

type ImageUrl = { url: string };

export type Categoria = {
  id: string;
  titulo: string;
};

export type CategoriaWithTreinamentos = Categoria & {
  treinamentos: Treinamento[];
};

export type Tag = {
  id: string;
  titulo: string;
};

export type Meta =
  | {
      per_page: number;
      page: number;
      search: string;
    }
  | { per_page: "all" }
  | { search: string };

export type ResponseMeta = {
  meta: {
    pagination: {
      per_page: number;
      total_pages: number;
      total_objects: number;
      links: {
        next?: string;
        previous?: string;
        first: string;
        last: string;
      };
    };
  };
};

export type ResponseData<K extends string, T> = {
  [key in K]: T;
};

export type Response<K extends string, T> = ResponseData<K, T> & ResponseMeta;

export const customStyles: TableStyles = {
  headCells: {
    style: {
      fontWeight: "bold",
      paddingLeft: "8px",
      paddingRight: "8px",
      backgroundColor: "#023E84",
      color: "#fff",
      textAlign: "center",
      width: "200px",
    },
  },
  header: {
    style: {
      padding: "0",
    },
  },
  subHeader: {
    style: {
      paddingLeft: "0",
      paddingRight: "0",
    },
  },
  // mudar cor dos botões da paginação
  pagination: {
    pageButtonsStyle: {
      color: "#fff",
      backgroundColor: "#023E84",
      flex: "1 1 auto",
      margin: "0 2px",
      padding: "6px 12px",
      align: "center",
      "&:disabled": {
        cursor: "unset",
        backgroundColor: "#fff",
      },
      "&:focus": {
        backgroundColor: "#023E84",
      },
    },
  },
};
