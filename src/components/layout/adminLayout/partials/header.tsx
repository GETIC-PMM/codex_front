import { AiOutlineMenu } from "react-icons/ai";
import LogoMossoroDigitalDark from "@/assets/LogoMossoroDigitalDark.jpeg";
import UserPicIcon from "@/assets/UserPicIcon.jpeg";
import { Button } from "@/components/ui/button";
import { BsGrid3X3GapFill } from "react-icons/bs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import LogoMossoroDigital from "@/assets/logo-mossoro-digital-2.png";
import DiretiLogo from "@/assets/diretiLogo.svg";

const Header = ({
  setIsNavbarExpanded,
}: {
  setIsNavbarExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // const navigate = useNavigate()

  // const revokeToken = useMutation({
  //     mutationKey: 'logout',
  //     mutationFn: async () => {
  //         const response = await axios.post(
  //             'http://localhost:3000/usuarios/tokens/revoke',
  //             {},
  //             {
  //                 headers: {
  //                     Authorization: `Bearer ${token}`,
  //                 },
  //             }
  //         )
  //         return response
  //     },
  //     onSuccess: (data) => {},
  //     onError: (error) => {},
  // })

  // const handleLogout = async () => {
  //     saveUser(null)
  //     revokeToken.mutate()
  //     localStorage.removeItem('token')
  //     keycloak.logout()
  //     // navigate('/')
  // }

  return (
    <div className="fixed w-full h-16 top-0 z-40 shadow-md">
      <div className="bg-white flex h-full justify-between px-4 items-center text-black">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setIsNavbarExpanded((s) => !s);
            }}
          >
            <AiOutlineMenu className="fill-black" />
          </button>
          <img
            className="ml-4"
            alt="Logo Mossoró Digital"
            src={DiretiLogo}
            width={200}
          />
        </div>
        <div className="flex gap-3">
          <Dialog>
            <DialogTrigger>
              <BsGrid3X3GapFill />
            </DialogTrigger>
            <DialogContent className="flex p-0 overflow-hidden border-none h-[60%] w-[80%]">
              <DialogHeader className="bg-pmm-blue text-white p-10 flex-[1]">
                <h1 className="text-2xl font-bold">Alterar sistema</h1>
                <span className="text-sm">
                  Escolha um dos sistemas listados ao lado para aceessar suas
                  funcionalidades
                </span>
              </DialogHeader>
              <div className="p-10 flex-[2] flex flex-col items-start gap-3 relative">
                <h1 className="text-pmm-blue text-xl">Prefeitura de Mossoró</h1>
                <Button className="p-0 text-start" variant={"link"}>
                  <a href="" className="text-pmm-blue/60">
                    Sistema de RH
                  </a>
                </Button>
                <Button className="p-0" variant={"link"}>
                  <a href="" className="text-pmm-blue/60">
                    Sistema de ponto eletrônico
                  </a>
                </Button>
                <span>Em breve mais opções...</span>

                <img
                  src={LogoMossoroDigital}
                  alt=""
                  className="absolute bottom-10 right-10 h-20"
                />
              </div>
            </DialogContent>
          </Dialog>

          <div>
            <img
              alt="Placeholder imagem do usuário"
              src={UserPicIcon}
              width={40}
              height={40}
            />
          </div>
          <Button className="ml-2" onClick={() => {}}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
