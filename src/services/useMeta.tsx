import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDebounce } from "use-debounce";

type MetaContext = {
  perPage: number;
  page: number;
  search: string;
  searchBy: string;
  debouncedSearch: string;
  setPerPage: (perPage: number) => void;
  setPage: (page: number) => void;
  setSearch: (search: string) => void;
  setSearchBy: (searchBy: string) => void;
};

export const MetaContext = React.createContext<MetaContext>({
  perPage: 10,
  page: 1,
  search: "",
  searchBy: "",
  debouncedSearch: "",
  setPerPage: () => {},
  setPage: () => {},
  setSearch: () => {},
  setSearchBy: () => {},
});

const datatablePages = [
  "/painel/tags",
  "/painel/categorias",
  "/painel/treinamentos",
];

const MetaProvider = ({ children }: { children: React.ReactNode }) => {
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);

  const { pathname } = useLocation();

  useEffect(() => {
    if (datatablePages.includes(pathname)) resetValues();
  }, [pathname]);

  const resetValues = () => {
    setPerPage(10);
    setPage(1);
    setSearch("");
    setSearchBy("");
  };

  return (
    <MetaContext.Provider
      value={{
        perPage,
        page,
        search,
        searchBy,
        debouncedSearch,
        setPerPage,
        setPage,
        setSearch,
        setSearchBy,
      }}
    >
      {children}
    </MetaContext.Provider>
  );
};

export const useMeta = () => React.useContext(MetaContext);

export default MetaProvider;
