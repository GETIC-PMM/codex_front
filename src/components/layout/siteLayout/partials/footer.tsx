import DiretiLogoWhite from "@/assets/diretiLogoWhite.svg";
import { Button, buttonVariants } from "@/components/ui/button";
import { maxWidth } from "@/utils/consts";
import { CiMail } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { PiPhoneCallLight } from "react-icons/pi";

const Footer = () => {
  // always on bottom
  return (
    <footer className="w-full">
      <div className="w-full pt-16 pb-8 mt-10 px-4 sm:px-0">
        <div
          className={`w-full max-w-[1200px] gap-6 my-20 text-zinc-600 mx-auto flex items-center justify-center flex-col text-sm`}
        >
          <h1 className="text-4xl text-pmmBlue text-center">
            Compartilhe seu conhecimento
          </h1>
          <span className="text-center">
            Clique no botão abaixo para acessar o painel administrativo e criar
            um novo treinamento
          </span>
          <a href="/painel/treinamentos" className={buttonVariants()}>
            Criar treinamento
          </a>
        </div>
      </div>
      <div className="w-full bg-pmmBlue text-white pt-16 pb-8 mt-10 px-4 sm:px-0">
        <div
          className={`w-full max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between  gap-36 text-sm`}
        >
          <div className="flex-[2] flex flex-col gap-7">
            <img src={DiretiLogoWhite} width={250} alt="Direti Logo" />
            <p className="max-w-[600px]">
              A Diretoria Executiva de Tecnologia da Informação (DIRETI), parte
              da Prefeitura Municipal de Mossoró/RN, é responsável pelo
              desenvolvimento de sistemas, sites e aplicativos, além da
              manutenção de hardware do município.
            </p>
            <a
              target="_blank"
              href="https://api.whatsapp.com/send?phone=5584991263533"
              className={
                "bg-green-600 w-max py-3 rounded px-10 self-center sm:self-auto hover:bg-green-500"
              }
            >
              Entrar em contato
            </a>
          </div>
          <div className="flex-[1] flex flex-col gap-10">
            <p className="text-lg font-semibold">Onde estamos?</p>
            <div className="flex flex-col gap-8">
              <p className="flex gap-3">
                <IoLocationOutline className="text-lg" />
                Avenida Francisco Dutra, 3100, Dom Jaime Câmara
              </p>
              <a
                target="_blank"
                href="https://api.whatsapp.com/send?phone=5584991263533"
                className="flex gap-3 hover:underline w-max"
              >
                <PiPhoneCallLight className="text-lg" />
                (84) 99126-3533
              </a>
              <a
                href="mailto:direti.devs@gmail.com"
                className="flex gap-3 hover:underline"
              >
                <CiMail className="text-lg" />
                direti.devs@gmail.com
              </a>
            </div>
          </div>
        </div>
        <div className="text-center text-xs font-bold mt-10">
          © DIRETI - Diretoria Executiva de Tecnologia da Informação •
          Prefeitura Municipal de Mossoró/RN - 2024
        </div>
      </div>
    </footer>
  );
};

export default Footer;
