import LogoMossoroDigital from "../assets/diretiLogo.svg";

const AdminHome = () => {
  return (
    <div>
      <div className="flex flex-col text-center items-center justify-center gap-1 h-[calc(100vh-150px)]">
        <img src={LogoMossoroDigital} width={3  00} alt="" />
        <span className="text-3xl mt-5">
          Seja bem-vindo(a) ao <strong>Sistema de Treinamentos</strong>
        </span>
        <span className="text-zinc-500">Prefeitura Municipal de Mossoró</span>
      </div>
    </div>
  );
};

export default AdminHome;
