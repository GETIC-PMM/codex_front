import Ruby from "@/assets/ruby.svg";
import Header from "../layout/siteLayout/partials/header";

const aula = () => {
  return (
    
  <div className="grid grid-rows-2 grid-flow-col gap-4">

  <div className="row-span-3 ...">

  <img
              src={Ruby}
              className="rounded-md object-cover w-full aspect-video"
              alt="Ruby"
            />

  </div>
  <div className="col-span-2 ..."> 
    <div className="flex justify-between gap-2 mt-2">
    <h1 className="font-bold text-green-700 text-xs">Back-end</h1>

    <div className="flex gap-4">
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded-full "> Button </button>                           
    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-10 rounded-full"> Button </button>
                  
    </div>

  </div>

  <div className="flex justify gap-4 mt-4">
      <h1 className="font-bold text-pmmBlue">Titulo do video</h1>
    
  </div>
  
  <div className="flex justify gap-4 mt-4"> 
      

      <img className="rounded-full object-cover w-10 h-10 aspect-video" 
          src={Ruby}
      />
      <p className="text-pmmGray">Autor 01 </p>
      <p className="text-pmmGray">• 27 Agosto 2024</p>                        
           
  </div>   
   
  </div>

  <div className="row-span-2 col-span-2 ...">             
           
                <span className="text-sm text-pmmBlue ">
                  Lorem lipsum dolor sit amet. Lorem lipsum dolor sit amet.
                  Lorem lipsum dolor sit amet.{" "}
                </span>
  <div className="flex justify-end gap-4 mt-4">
                <a href="" className="text-xs hover:underline w-max text-pmmBlue ">
                  Visualizar artigo &gt;
                </a></div>
    </div>
  </div>
 
  );
}
export default aula;