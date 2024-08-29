
const Busca = () => {
  return (
    <div> 
      <div>
        <div className="w-8 h-1 bg-green-600 rounded-full"></div>
        <div className="mt-4">          
          <h3 className="text-pmmBlue  font-bold">
            Resultado da busca
          </h3>
        </div>
              <div className="flex gap-4 text-xs font-semibold mt-3">
              <img     
                className="rounded-md object-cover w-50 h-52 aspect-video"          
                />        
                <div className="flex flex-col gap-2 mt-4">    
                <h1 className="font-bold">Lorem lipsum dolor sit amet</h1>
                <p className="text-green-700">Autor 01</p>
                <img src="" alt="" />
                <p className="text-pmmGray">27 Agosto 2024</p> 
                           
 
            
                <span className="text-sm">
                  Lorem lipsum dolor sit amet. Lorem lipsum dolor sit amet.
                  Lorem lipsum dolor sit amet.{" "}
                </span>
                <a href="" className="text-xs hover:underline w-max">
                  Visualizar artigo &gt;
                </a>
                </div>
              </div>
 
      </div>
    </div>
  );
};

export default Busca;
