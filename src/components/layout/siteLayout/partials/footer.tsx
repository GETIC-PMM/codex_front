import DiretiLogoWhite from "@/assets/diretiLogoWhite.svg";
import { Button } from "@/components/ui/button";
import { maxWidth } from "@/utils/consts";
import { CiMail } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { PiPhoneCallLight } from "react-icons/pi";

const Footer = () => {
  // always on bottom
  return (
    <footer className="w-full bg-pmmBlue text-white pt-16 pb-8 mt-10">
      <div
        className={`w-full max-w-[1200px] mx-auto flex items-center justify-between  gap-36 text-sm`}
      >
        <div className="flex-[2] flex flex-col gap-7">
          <img src={DiretiLogoWhite} width={250} alt="Direti Logo" />
          <p className="max-w-[600px]">
            A Diretoria Executiva de Tecnologia da Informação (DIRETI), parte da
            Prefeitura Municipal de Mossoró/RN, é responsável pelo
            desenvolvimento de sistemas, sites e aplicativos, além da manutenção
            de hardware do município.
          </p>
          <Button className="bg-green-600 w-min px-10 hover:bg-green-500">
            Entrar em contato
          </Button>
        </div>
        <div className="flex-[1] flex flex-col gap-10">
          <p className="text-lg font-semibold">Onde estamos?</p>
          <div className="flex flex-col gap-8">
            <p className="flex gap-3">
              <IoLocationOutline className="text-lg" />
              Avenida Francisco Dutra, 3100, Dom Jaime Câmara
            </p>
            <p className="flex gap-3">
              <PiPhoneCallLight className="text-lg" />
              (84) 99126-3533
            </p>
            <p className="flex gap-3">
              <CiMail className="text-lg" />
              direti.devs@gmail.com
            </p>
          </div>
        </div>
      </div>
      <div className="text-center text-xs font-bold mt-10">
        © DIRETI - Diretoria Executiva de Tecnologia da Informação • Prefeitura
        Municipal de Mossoró/RN - 2024
      </div>
    </footer>
  );
};

export default Footer;
