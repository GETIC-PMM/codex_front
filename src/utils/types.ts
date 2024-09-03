import { TableStyles } from "react-data-table-component";

export type ModalActions = "" | "create" | "edit" | "delete";

export type GetTreinamentosTYPE = {
  id: string;
  titulo: string;
  resumo: string;
  tag_ids?: string[];
  caregoria_id?: string;
  autor_id: string;
  data_publicacao: string;
  capa: string;
  corpo: string;
};

export type GetCategoriasTYPE = {
  id: string;
  titulo: string;
};

export type GetTagsTYPE = {
  id: string;
  titulo: string;
};

export const customStyles: TableStyles = {
  headCells: {
    style: {
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
