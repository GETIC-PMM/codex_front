import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ModalActions } from "@/utils/types";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { toast } from "sonner";

type DeleteModalProps = {
  open: ModalActions;
  setOpen: (open: ModalActions) => void;
  onSubmit: () => void;
  isSuccess?: boolean;
  isError?: boolean;
  isLoading?: boolean;
  error?: AxiosError<any> | null;
};

export function DeleteModal({
  open,
  setOpen,
  onSubmit,
  isError,
  isSuccess,
  isLoading,
  error,
}: DeleteModalProps) {
  useEffect(() => {
    if (isLoading) {
      toast.loading("Carregando...");
    } else {
      toast.dismiss();
      if (isError) {
        if (error?.response?.status === 422) {
          toast.error(error.response.data.error);
        } else {
          toast.error(
            "Ocorreu um erro ao deletar os dados. Tente novamente ou entre em contato com a equipe de manutentação."
          );
        }
      }
      if (isSuccess) {
        toast.success("Dados excluídos com sucesso");
      }
    }
  }, [isSuccess, isError]);

  return (
    <AlertDialog
      open={open === "delete" ? true : false}
      onOpenChange={(o) => setOpen(o ? open : "")}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmação de Exclusão</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza de que deseja excluir este item? Esta ação é
            irreversível e todos os dados associados serão permanentemente
            removidos
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-pmmBlue text-primary-foreground hover:text-primary-foreground hover:bg-pmmBlue/90 h-10 px-4 py-2">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  text-destructive-foreground bg-[#FF5858] hover:bg-red-700 rounded-md px-3 py-3"
            onClick={() => onSubmit()}
          >
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteModal;
