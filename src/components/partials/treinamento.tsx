import Ruby from "@/assets/ruby.svg";
import Header from "../layout/siteLayout/partials/header";
import { GetTagsTYPE } from "@/utils/types";
import dayjs from "dayjs";
import { BASE_URL } from "@/utils/consts";

const Treinamento = ({
  tags,
  capa,
  titulo,
  nome_do_autor,
  data_publicacao,
  resumo,
  id

}:{
  tags: GetTagsTYPE[]
  capa: {url: string}
  titulo: string
  nome_do_autor: string
  data_publicacao: string
  resumo: string
  id: string
}) => {
  return (
    
  <div className="grid grid-rows-2 grid-flow-col gap-4">

  <div className="row-span-3 ...">

  <img
              src={`${BASE_URL}${capa.url}`}
              className="rounded-md object-cover w-full aspect-video"
              alt="Ruby"
            />

  </div>
  <div className="col-span-2 ..."> 
    <div className="flex justify-between gap-2 mt-2">
    <h1 className="font-bold text-green-700 text-xs">{
      tags.map((tag) => tag.titulo).join(", ")
      }</h1>

    <div className="flex gap-4">
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded-full "> Button </button>                           
    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-10 rounded-full"> Button </button>
                  
    </div>

  </div>

  <div className="flex justify gap-4 mt-4">
      <h1 className="font-bold text-pmmBlue">T{titulo}</h1>
    
  </div>
  
  <div className="flex justify gap-4 mt-4"> 
      

      <img className="rounded-full object-cover w-10 h-10 aspect-video" 
          src={Ruby}
      />
      <p className="text-pmmGray">{nome_do_autor}</p>
      <p className="text-pmmGray">{dayjs(data_publicacao).format("DD/MM/YYYY")}</p>                        
           
  </div>   
   
  </div>

  <div className="row-span-2 col-span-2 ...">             
           
                <span className="text-sm text-pmmBlue ">
                  {resumo}
                </span>
  <div className="flex justify-end gap-4 mt-4">
                <a href={`/treinamento/${id}`} className="text-xs hover:underline w-max text-pmmBlue ">
                  Visualizar artigo &gt;
                </a></div>
    </div>
  </div>
 
  );
}
export default Treinamento;