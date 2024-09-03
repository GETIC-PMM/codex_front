import useWindowDimensions from "@/utils/functions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { ModalActions } from "@/utils/types";
import { useEffect } from "react";
import { toast as t, toast } from "sonner";

type ModalProps = {
  open: ModalActions;
  setOpen: (open: ModalActions) => void;
  title: string;
  descricao?: string;
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  onSubmit: () => void;
  buttonOnBottom?: boolean;
  isCreateSuccess?: boolean;
  isError?: boolean;
  isEditSuccess?: boolean;
  isLoading?: boolean;
  toast?: typeof t;
};

const DefaultModal = ({
  open,
  setOpen,
  title,
  descricao,
  children,
  form,
  onSubmit,
  buttonOnBottom,
  isCreateSuccess,
  isError,
  isLoading,
  isEditSuccess,
}: ModalProps) => {
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (isLoading) {
      toast.loading("Carregando...");
    } else {
      toast.dismiss();
      if (isError) {
        toast.error(
          "Ocorreu um erro ao salvar os dados. Tente novamente ou entre em contato com a equipe de manutentação."
        );
      } else if (isCreateSuccess) {
        toast.success("Dados salvos com sucesso");
      } else if (isEditSuccess) {
        toast.success("Dados editados com sucesso");
      }
    }
  }, [isCreateSuccess, isError, isEditSuccess, isLoading]);

  return (
    <Dialog
      open={open === "create" || open === "edit"}
      onOpenChange={(o) => setOpen(o ? open : "")}
    >
      <DialogContent className="max-w-[70%] max-h-[80%] p-5 overflow-y-scroll">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <div className="flex flex-row  gap-4 justify-between items-center">
                <DialogTitle className="text-pmm-blue">{title}</DialogTitle>
                {descricao && (
                  <DialogDescription>{descricao}</DialogDescription>
                )}
                {width > 640 && !buttonOnBottom && (
                  <div className="flex gap-3 items-center">
                    <DialogClose asChild>
                      <Button className="w-32" variant={"destructive"}>
                        Cancelar
                      </Button>
                    </DialogClose>
                    <Button className="w-32" type="submit">
                      Salvar
                    </Button>
                  </div>
                )}
              </div>
            </DialogHeader>
            {children}
            {(width <= 640 || buttonOnBottom) && (
              <div className="pt-6 flex gap-3 justify-center flex-col w-full items-center">
                <DialogClose asChild>
                  <Button className="w-full order-2" variant={"destructive"}>
                    Cancelar
                  </Button>
                </DialogClose>
                <Button className="w-full order-1" type="submit">
                  Salvar
                </Button>
              </div>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DefaultModal;
