import { customStyles } from "@/utils/types";
import React from "react";
import DataTable, { Alignment, TableProps } from "react-data-table-component";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import {
  BiArrowToLeft,
  BiArrowToRight,
  BiLeftArrowAlt,
  BiRightArrowAlt,
} from "react-icons/bi";
import { MdArrowDownward } from "react-icons/md";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { Printer, Table } from "lucide-react";
import { Input } from "@/components/ui/input";

const sortIcon = <MdArrowDownward />;
const selectProps = {
  indeterminate: (isIndeterminate: boolean) => isIndeterminate,
};

//custom loading data component
const LoaderComponent = () => {
  return (
    <div className="p-4" role="status">
      <svg
        aria-hidden="true"
        className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-pmmBlue"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="https://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

function DataTableBase<T extends object>(props: TableProps<T>) {
  const [filterData, setFilterData] = React.useState<T[]>([]);
  const [filterText, setFilterText] = React.useState("");
  const [searchBy, setSearchBy] = React.useState("");

  console.log({ searchBy });
  console.log(
    props.columns[1].selector?.toString().substring(13).split(" ")[0]
  );

  React.useEffect(() => {
    setFilterData(props.data);
  }, [props.data]);

  console.log(props.columns[0]);

  return (
    <div className="rounded bg-white overflow-hidden shadow-lg p-4 px-8">
      <DataTable
        className="rounded-md shadow-md bg-zinc-200/70"
        progressPending={props.progressPending}
        progressComponent={<LoaderComponent />}
        title={props.title}
        //translate the the pagination text
        paginationComponentOptions={{
          rowsPerPageText: "Linhas por página",
          rangeSeparatorText: "de",
          noRowsPerPage: false,
          selectAllRowsItem: false,
          selectAllRowsItemText: "Todos",
        }}
        // custom pagination icons style
        paginationIconLastPage={<BiArrowToRight />}
        paginationIconFirstPage={<BiArrowToLeft />}
        paginationIconNext={<BiRightArrowAlt />}
        paginationIconPrevious={<BiLeftArrowAlt />}
        noDataComponent={
          <div className="row flex justify-center items-center p-3">
            <AiOutlineExclamationCircle />
            &nbsp; Nenhum dado encontrado
          </div>
        }
        striped
        highlightOnHover
        responsive
        pagination
        selectableRowsComponentProps={selectProps}
        sortIcon={sortIcon}
        dense
        subHeaderComponent={
          <div className="w-full flex flex-col gap-8 pb-4">
            {/* Input de pesquisa baseado nos atributos que chegam pelo objeto props.columns*/}
            <div className="flex gap-2">
              <Select
                onValueChange={(e) => {
                  setSearchBy(e);
                }}
                value={searchBy}
              >
                <SelectTrigger className="flex-[1]">
                  <SelectValue placeholder="Selecione um parametro de busca" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {props.columns.map((column) => {
                      // not render last child of the array
                      if (!(column === props.columns[props.columns.length - 1]))
                        return (
                          <SelectItem
                            key={column.selector?.toString().substring(13)}
                            value={
                              column.selector
                                ?.toString()
                                .substring(13)
                                .split(" ")[0] as string
                            }
                          >
                            {column.name?.props.children}
                          </SelectItem>
                        );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {/* Input to search for something based on the seachBy state */}
              <Input
                className="flex-[3]"
                type="text"
                placeholder="Digite para pesquisar..."
                value={filterText}
                onChange={(e) => {
                  const filteredData = props.data.filter((item) => {
                    return Object.keys(item).some((key) => {
                      if (searchBy.includes(".")) {
                        const key = searchBy.split(".")[0] as keyof typeof item;

                        return String(
                          item[key][
                            searchBy.split(
                              "."
                            )[1] as keyof (typeof item)[typeof key]
                          ]
                        )
                          .toLowerCase()
                          .includes(e.target.value.toLowerCase());
                      } else {
                        return String(item[searchBy as keyof typeof item])
                          .toLowerCase()
                          .includes(e.target.value.toLowerCase());
                      }
                    });
                  });
                  setFilterData(filteredData);
                  setFilterText(e.target.value);
                }}
              />
            </div>

            {/* <Accordion type="single" collapsible>
                            <AccordionItem
                                value="item-1"
                                className="bg-[#CBDCF0] px-4 text-pmmblue rounded-lg"
                            >
                                <AccordionTrigger className="py-2">
                                    <div>Filtros</div>
                                    <div className="text-xs">
                                        Clique aqui para expandir
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    Em Construção...
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion> */}
            {/* <input
                            type="text"
                            className="border border-gray-300 w-1/3 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Digite para pesquisar..."
                            value={filterText}
                            onChange={(e) => {
                                const filteredData = props.data.filter(
                                    (item) => {
                                        return Object.keys(item).some((key) => {
                                            return String(
                                                item[key as keyof typeof item]
                                            )
                                                .toLowerCase()
                                                .includes(
                                                    e.target.value.toLowerCase()
                                                )
                                        })
                                    }
                                )
                                setFilterData(filteredData)
                                setFilterText(e.target.value)
                            }}
                        /> */}
          </div>
        }
        subHeaderAlign={Alignment.LEFT}
        {...props}
        data={filterData}
        customStyles={customStyles}
      />

      {/* BUTTONS */}
      {props.hideButtonsOnBottom ? (
        <></>
      ) : (
        <div className="flex gap-2 mt-4">
          <Button className="min-w-[150px] font-bold flex gap-2 active:bg-green-600">
            Imprimir <Printer size={14} />
          </Button>
          <Button className="min-w-[150px] font-bold flex gap-2 active:bg-green-600">
            Baixar tabela
            <Table size={14} />
          </Button>
        </div>
      )}
    </div>
  );
}

export default DataTableBase;
